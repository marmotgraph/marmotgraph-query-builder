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

const useStyles = createUseStyles({
  breadcrumb: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    color: 'white',
    padding: '1rem',

  },
  breadcrumb_item: {
    display: 'flex',
    alignItems: 'center',
  }
});



const Breadcrumbs = ({ items }) => {
  const classes = useStyles();

  return (
    <nav aria-label="breadcrumb">
        <ol className={classes.breadcrumb}>
          {items.map((item, index) => (
            <li key={index} className={`classes.breadcrumb_item ${index === items.length - 1 ? 'active' : ''}`}>
              {index < items.length - 1 ? <Link to={item.path}>{item.label}</Link> : item.label}
            </li>
          ))}
        </ol>
    </nav>
  );
};

export default Breadcrumbs;