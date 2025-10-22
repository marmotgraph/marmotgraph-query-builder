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

import { useState } from 'react';
import { matchPath, useNavigate } from 'react-router-dom';
import { getProperties } from '../Helpers/QueryHelpers';
import useAPI from './useAPI';
import useStores from './useStores';
import type { APIError } from '../Services/API';
import type { Query } from '../Types/Query';

function useSaveQuery() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { queryBuilderStore, queriesStore, spacesStore } = useStores();
  const API = useAPI();

  const saveQuery = async () => {
    if (!queryBuilderStore.isQueryEmpty) {
      setIsSaving(true);
      setError(undefined);
      if (!queryBuilderStore.space && spacesStore.privateSpace) {
        queryBuilderStore.setSpace(spacesStore.privateSpace);
      }
      const queryId = (queryBuilderStore.saveAsMode ? queryBuilderStore?.queryId : queryBuilderStore.sourceQuery?.id) as string;
      const querySpecification = queryBuilderStore.querySpecification;
      const spaceName = queryBuilderStore.space?.name ? queryBuilderStore.space.name : 'myspace';
      const saveAsMode = queryBuilderStore.saveAsMode;

      try {
        if (queryBuilderStore.moveQueryInSpace) {
          await API.moveQuery(queryId, spaceName);
        } else {
          await API.saveQuery(queryId, querySpecification, spaceName);
        }

        let sourceQuery: Query.Query;

        if (saveAsMode) {
          sourceQuery = {
            id: queryId,
            context: querySpecification['@context'],
            structure: querySpecification.structure,
            properties: getProperties(querySpecification),
            meta: querySpecification.meta,
            label: queryBuilderStore.label,
            description: queryBuilderStore.description,
            space: spaceName
          } as Query.Query;
          queriesStore.addQuery(sourceQuery);
          queryBuilderStore.setSourceQuery(sourceQuery);
        } else {

          if (!queryBuilderStore.sourceQuery) {
            const sourceQuery = queriesStore.findQuery(queryId);
            queryBuilderStore.setSourceQuery(sourceQuery);
          }
          queryBuilderStore.updateSourceQuery(querySpecification);
        }

        queryBuilderStore.setQuerySaved();
        setIsSaving(false);

        if (saveAsMode) {
          const match = matchPath(
            { path: '/queries/:id/:mode' },
            location.pathname
          );
          const mode = match?.params?.mode;
          const path = mode
            ? `/queries/${queryId}/${mode}`
            : `/queries/${queryId}`;
          navigate(path);

        } else {
          return true;
        }
      } catch (e) {
        const error = e as APIError;
        const message = error?.message;
        setError(`Error while saving query "${queryId}" (${message})`);
        setIsSaving(false);

        return false;
      }
    }
  };
  return { saveQuery, isSaving, setIsSaving, error, setError };
}

export default useSaveQuery;
