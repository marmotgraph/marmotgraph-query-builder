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
import constants.EditorConstants
import models._
import models.errors.APIEditorError
import models.instance.{NexusInstance, NexusInstanceReference}
import models.user.{EditorUser, NexusUser}
import play.api.Logger
import play.api.cache.{AsyncCacheApi, NamedCache}
import play.api.http.Status._
import play.api.libs.json.{JsObject, Json}
import play.api.libs.ws.WSClient
import services.instance.InstanceApiService
import services.query.QueryService

import scala.concurrent.{ExecutionContext, Future}

class EditorUserService @Inject()(
  config: ConfigurationService,
  wSClient: WSClient,
  nexusService: NexusService,
  @NamedCache("editor-userinfo-cache") cache: AsyncCacheApi,
  nexusExtensionService: NexusExtensionService,
  oIDCAuthService: OIDCAuthService,
)(implicit executionContext: ExecutionContext) {
  val logger = Logger(this.getClass)

  object instanceApiService extends InstanceApiService
  object cacheService extends CacheService
  object queryService extends QueryService

  def getUser(nexusUser: NexusUser, token: String): Future[Either[APIEditorError, Option[EditorUser]]] = {
    cacheService.get[EditorUser](cache, nexusUser.id.toString).flatMap {
      case None =>
        queryService
          .getInstancesWithStoredQuery(
            wSClient,
            config.kgQueryEndpoint,
            EditorConstants.editorUserPath,
            "kguser",
            token,
            None,
            None,
            "",
            vocab = Some(EditorConstants.editorVocab),
            Map("userId" -> nexusUser.id)
          )
          .map[Either[APIEditorError, Option[EditorUser]]] { res =>
            res.status match {
              case OK =>
                val users = (res.json \ "results")
                  .as[List[JsObject]]
                if (users.size > 1) {
                  val msg = s"Multiple user with the same ID detected: ${users.map(js => js \ "nexusId").mkString(" ")}"
                  logger.error(msg)
                  Left(APIEditorError(INTERNAL_SERVER_ERROR, msg)) // users.head
                } else if (users.size == 1) {
                  val id = (users.head \ "nexusId").as[String]
                  val editorUser = EditorUser(NexusInstanceReference.fromUrl(id), nexusUser)
                  cache.set(editorUser.nexusUser.id, editorUser, config.cacheExpiration)
                  Right(Some(editorUser))
                } else {
                  Right(None)
                }
              case _ =>
                logger.error(s"Could not fetch the user with ID ${nexusUser.id} ${res.body}")
                Left(APIEditorError(res.status, res.body))
            }
          }
      case Some(user) => Future(Right(Some(user)))
    }
  }

  def getOrCreateUser(nexusUser: NexusUser, token: String)(
    afterCreation: (EditorUser, String) => Future[Either[APIEditorError, EditorUser]]
  ): Future[Either[APIEditorError, EditorUser]] =
    getUser(nexusUser, token).flatMap {
      case Right(Some(editorUser)) => Future(Right(editorUser))
      case Right(None) =>
        createUser(nexusUser, token).flatMap {
          case Right(editorUser) => afterCreation(editorUser, token)
          case Left(e)           => Future(Left(e))
        }
      case Left(err) => Future(Left(err))
    }

  def createUser(nexusUser: NexusUser, token: String): Future[Either[APIEditorError, EditorUser]] = {
    instanceApiService
      .post(
        wSClient,
        config.kgQueryEndpoint,
        NexusInstance(None, EditorConstants.editorUserPath, EditorUserService.userToNexusStruct(nexusUser.id)),
        None,
        token
      )
      .map {
        case Right(ref) => Right(EditorUser(ref, nexusUser))
        case Left(res) =>
          logger.error(s"Could not create the user with ID ${nexusUser.id} - ${res.body}")
          Left(APIEditorError(res.status, res.body))
      }
  }

  def deleteUser(editorUser: EditorUser, token: String): Future[Either[APIEditorError, Unit]] = {
    instanceApiService
      .delete(wSClient, config.kgQueryEndpoint, editorUser.nexusId, token)
      .map {
        case Right(_) => Right(())
        case Left(res) =>
          logger.error(s"Could not delete the user with ID ${editorUser.nexusId.toString} - ${res.body}")
          Left(APIEditorError(res.status, res.body))
      }
  }
}

object EditorUserService {

  def userToNexusStruct(userId: String): JsObject = {
    Json.obj(
      EditorConstants.EDITORNAMESPACE + EditorConstants.USERID -> userId
    )
  }

}
