/*
 * Copyright 2024 ETH Zurich
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

 import { observer } from 'mobx-react-lite';
 import React from 'react';
 import { createUseStyles } from 'react-jss';
 import { useNavigate } from 'react-router-dom';
 import useStores from "../Hooks/useStores";
 import Icon from '../../Components/Icon';
 import Queries from './Selection/Queries';
 import type { Type } from '../../types';
 import { v4 as uuidv4 } from 'uuid';

const useStyles = createUseStyles({
  btnPrimary: {
    boxSizing: 'border-box',
    width: '150px',
    height: '34px',
    background: '#2E2E2E',
    border: '1px solid #E6E7E8',
    borderRadius: '6px',
    color: '#F5F5F5',
  },
  btnSecondary: {
      boxSizing: 'border-box',
      width: '150px',
      height: '34px',
      border: '1px solid #2E2E2E',
      borderRadius: '6px',
//       color: '#F5F5F5',
      marginRight: '10px',
    }
 });



const MyQueriesHeader = ({ title, onButton1Click, onButton2Click }) => {
 const classes = useStyles();
 const navigate = useNavigate();

   const { queryBuilderStore, queriesStore, typeStore, appStore } = useStores();

   const handleNewQueryClick = () => {
     const uuid = uuidv4();
     navigate(`/queries/${uuid}`);
   };

   const handleShowSavedClick = () => {
     navigate('/queries/');
//      queriesStore.toggleShowSavedQueries(
//        !queriesStore.showSavedQueries
//      )
     };

   const type = queryBuilderStore.typeId && typeStore.types.get(queryBuilderStore.typeId);

  return (
    <header className="container d-flex justify-content-between align-items-center p-3 bg-light">
      {/* Page Title */}
      <h1 className="m-0">{title}</h1>

      {/* Buttons */}
      <div>
        <button
          className={classes.btnSecondary}
          onClick={handleShowSavedClick}>
          Select shared query
        </button>
        <button
          className={classes.btnPrimary}
          onClick={handleNewQueryClick}>
          <span>Create a new query</span>
        </button>
      </div>
    </header>
  );
};

export default MyQueriesHeader;