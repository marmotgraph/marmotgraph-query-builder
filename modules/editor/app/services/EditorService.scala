
/*
*   Copyright (c) 2018, EPFL/Human Brain Project PCO
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*/

package services

import com.google.inject.Inject
import constants.EditorConstants.{DELETE, UPDATE}
import helpers._
import models.errors.{APIEditorError, APIEditorMultiError}
import models.instance.{EditorInstance, NexusInstance, NexusInstanceReference}
import models.user.User
import models.{FormRegistry, NexusPath}
import play.api.Logger
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}
import play.api.http.Status.INTERNAL_SERVER_ERROR
import play.api.libs.ws.{WSClient, WSResponse}
import services.instance.InstanceApiService

import scala.concurrent.{ExecutionContext, Future}

class EditorService @Inject()(
                               wSClient: WSClient,
                               config: ConfigurationService,
                             )(implicit executionContext: ExecutionContext) {

  val logger = Logger(this.getClass)

  object instanceApiService extends InstanceApiService

  def insertInstance(
                      newInstance: NexusInstance,
                      token: String
                    ): Future[Either[APIEditorError, NexusInstanceReference]] = {
    val modifiedContent = FormService.removeClientKeysCorrectLinks(newInstance.content.as[JsValue], config.nexusEndpoint)
    instanceApiService.post(wSClient, config.kgQueryEndpoint, newInstance.copy(content = modifiedContent), token).map{
      case Right(ref) => Right(ref)
      case Left(res) => Left(APIEditorError(res.status, res.body))
    }
  }

  /**
    * Updating an instance
    *
    * @param diffInstance           The diff of the current instance and its modification
    * @param nexusInstanceReference The reference of the instance to update
    * @param token                  the user token
    * @param userId                 the id of the user sending the update
    * @return The updated instance
    */
  def updateInstance(
                      diffInstance: EditorInstance,
                      nexusInstanceReference: NexusInstanceReference,
                      token: String,
                      userId: String
                    ): Future[Either[APIEditorError, Unit]] = {
    instanceApiService.put(wSClient, config.kgQueryEndpoint, nexusInstanceReference, diffInstance, token, userId).map{
      case Left(res) => Left(APIEditorError(res.status, res.body))
      case Right(()) => Right(())
    }
  }

  /**
    * Return a instance by its nexus ID
    * Starting by checking if this instance is coming from a reconciled space.
    * Otherwise we try to return the instance from the original organization
    *
    * @param nexusInstanceReference The reference to the instace to retrieve
    * @param token                  The user access token
    * @return An error response or an the instance
    */
  def retrieveInstance(nexusInstanceReference: NexusInstanceReference, token: String): Future[Either[APIEditorError, NexusInstance]] = {
    instanceApiService.get(wSClient, config.kgQueryEndpoint, nexusInstanceReference, token).map{
      case Left(res) => Left(APIEditorError(res.status, res.body))
      case Right(instance) => Right(instance)
    }
  }

  def generateDiffAndUpdateInstance(
                                     instanceRef:NexusInstanceReference,
                                     updateFromUser: JsValue,
                                     token:String,
                                     user: User,
                                     formRegistry: FormRegistry
                                   ): Future[Either[APIEditorMultiError, Unit]] = {
    retrieveInstance(instanceRef, token).flatMap {
      case Left(error) =>
        Future(Left(APIEditorMultiError(error.status, List(error))))
      case Right(currentInstanceDisplayed) =>
        val cleanedOriginalInstance = InstanceHelper.removeInternalFields(currentInstanceDisplayed)
        val instanceUpdateFromUser = FormService.buildInstanceFromForm(cleanedOriginalInstance, updateFromUser, config.nexusEndpoint)
        val removedEmptyFields = InstanceHelper.buildDiffEntity(cleanedOriginalInstance, instanceUpdateFromUser)
        val updateToBeStored = InstanceHelper.removeEmptyFieldsNotInOriginal(cleanedOriginalInstance, removedEmptyFields)
        val (instanceWithoutReverseLinks, reverseEntities) = FormService.getReverseLinks(updateToBeStored, formRegistry, currentInstanceDisplayed, config.nexusEndpoint)
        val reverseResponses: List[Future[Either[APIEditorError, Unit]]] =
          reverseEntities.map {
            case (DELETE, e, targetField) =>
              removeLinkFromInstance(NexusInstanceReference(e.nexusInstance.nexusPath, e.nexusInstance.id().get), instanceRef,targetField, token, user.id )
            case (UPDATE, e, _) => val ref = NexusInstanceReference.fromUrl(e.nexusInstance.id().get)
              updateInstance(e, ref, token, user.id)
            case (_, _, _) => Future(Left(APIEditorError(INTERNAL_SERVER_ERROR, "Could not process update.")))
          }

        logger.debug(s"Reverse entities ${reverseEntities.map(s => s"${s._1} - ${s._2.nexusInstance.id()} - ${s._3}" ).mkString("\n")}")

        Future.sequence(reverseResponses).flatMap{
          results =>
            if(results.forall(_.isRight)){
              if(instanceWithoutReverseLinks.nexusInstance.content.keys.isEmpty){
                Future(Right(()))
              }else{
                updateInstance(instanceWithoutReverseLinks, instanceRef, token, user.id).map{
                  case Left(e) => Left(APIEditorMultiError(e.status, List(e)))
                  case Right(()) => Right(())
                }
              }
            }else{
              val errors = results.filter(_.isLeft).map(_.swap.toOption.get)
              logger.error(s"Errors while updating instance - ${errors.map(_.toJson.toString).mkString("\n")}")
              Future(Left(APIEditorMultiError(INTERNAL_SERVER_ERROR, errors)))
            }
        }

    }
  }

  private def removeLinkFromInstance(
                                      refInstanceToUpdate:NexusInstanceReference,
                                      instanceIdToRemove:NexusInstanceReference,
                                      targetField:String,
                                      token:String,
                                      userID:String
                                    ) = {
    retrieveInstance(refInstanceToUpdate, token).flatMap{
      case Left(error) => Future(Left(error))
      case Right(instance) =>
        val content = instance.content.value(targetField)
        val correctedContent: Option[JsObject] =  if(content.asOpt[JsArray].isDefined){
          val c = content.as[JsArray].value.filter(js => (js \ "@id").as[String].contains(instanceIdToRemove.toString))
          if(c.isEmpty) None else Some(Json.obj(targetField -> c))
        }else {
          (content \ "@id").asOpt[String].flatMap( s => if(s.contains(instanceIdToRemove.toString)) Some(Json.obj(targetField -> Json.obj())) else None)
        }
        correctedContent match{
          case Some(c) =>
            updateInstance(EditorInstance(instance.copy(content = c)), refInstanceToUpdate, token, userID)
          case None => Future(Right(()))
        }
    }
  }
}
