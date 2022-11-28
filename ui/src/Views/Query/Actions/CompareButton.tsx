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

import React from "react";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGlasses} from "@fortawesome/free-solid-svg-icons/faGlasses";

import API from "../../../Services/API";
import { useStores } from "../../../Hooks/UseStores";

interface CompareButtonProps {
  disabled: boolean;
}

const CompareButton = observer(({ disabled }: CompareButtonProps) => {

  const { queryBuilderStore } = useStores();

  const onClick = () => {
    API.trackEvent("Query", "Compare", queryBuilderStore.queryId);
    queryBuilderStore.toggleCompareChanges();
  };

  if (!queryBuilderStore.hasChanged) {
    return null;
  }

  return (
      <Button disabled={disabled} onClick={onClick}>
        <FontAwesomeIcon icon={faGlasses} />&nbsp;Compare
      </Button>
  );
});
CompareButton.displayName = "CompareButton";

export default CompareButton;
