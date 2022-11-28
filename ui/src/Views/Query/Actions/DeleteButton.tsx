/*
 * Copyright 2018 - 2021 Swiss Federal Institute of Technology Lausanne (EPFL)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This open source software code was developed in part or in whole in the
 * Human Brain Project, funded from the European Union's Horizon 2020
 * Framework Programme for Research and Innovation under
 * Specific Grant Agreements No. 720270, No. 785907, and No. 945539
 * (Human Brain Project SGA1, SGA2 and SGA3).
 *
 */

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { useNavigate } from "react-router-dom";

import API from "../../../Services/API";
import { useStores } from "../../../Hooks/UseStores";

import Dialog from "../../../Components/Dialog";


const DeleteButton = observer(() => {

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const { queryBuilderStore } = useStores();

  const handleConfirmDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    API.trackEvent("Query", "Delete", queryBuilderStore.queryId);
    setShowDeleteDialog(false);
    queryBuilderStore.deleteQuery(queryBuilderStore.sourceQuery, navigate);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    queryBuilderStore.cancelDeleteQuery(queryBuilderStore.sourceQuery);
  };

  if (!queryBuilderStore.sourceQuery || !queryBuilderStore.canDeleteQuery) {
    return null;
  }

  return (
      <>
        <Button variant="danger" onClick={handleConfirmDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />&nbsp;Delete {showDeleteDialog}
        </Button>
        {showDeleteDialog && (
          <Dialog message="Are you sure you want to delete this query?" onCancel={handleCancelDelete} onConfirm={handleDelete} />
        )}
      </>
  );
});
DeleteButton.displayName = "DeleteButton";

export default DeleteButton;
