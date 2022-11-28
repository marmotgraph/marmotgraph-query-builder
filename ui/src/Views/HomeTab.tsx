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
import { matchPath, PathMatch, useLocation, useNavigate } from "react-router-dom";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";

import { useStores } from "../Hooks/UseStores";

import Tab from "../Components/Tab";
import Dialog from "../Components/Dialog";

const HomeTab = observer(() => {

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { queryBuilderStore } = useStores();

  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (queryBuilderStore.hasChanged) {
      setShowConfirmationModal(true);
    } else {
      goHome();
    }
  };

  const goHome = () => {
    setShowConfirmationModal(false);
    queryBuilderStore.clearQueries();
    queryBuilderStore.clearQuery();
    navigate("/");
  };

  const handleCancel = () => setShowConfirmationModal(false);
  const match: PathMatch<string>|null = matchPath({ path: "/" }, location.pathname)
  return (
    <>
    <Tab icon={faHome} current={match} onClick={handleHomeClick} label={"Home"} hideLabel disabled={queryBuilderStore.isSaving} />
      {showConfirmationModal && (
        <Dialog message="Your query has unsaved changes. If you continue you'll loose your changes. Do you want to continue?" onCancel={handleCancel} onConfirm={goHome} />
      )}
    </>
  );
});
HomeTab.displayName = "HomeTab";

export default HomeTab;