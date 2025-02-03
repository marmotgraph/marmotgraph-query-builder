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

import { observer } from 'mobx-react-lite';
import React from 'react';
import { createUseStyles } from 'react-jss';
import Query from './Query';
import type { Query as QueryProps } from '../../../../Types/Query';


const useStyles = createUseStyles({
  container: {
    color: 'var(--ft-color-loud)',
    /* Shared_queries_box */
    background: '#FFFFFF',
    boxShadow: '0px 4px 4px #E6E7E8',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
  },
  title: {
    display: 'flex',
    marginBottom: '10px',
    paddingBottom: '10px',
    paddingTop: '20px',
    borderBottom: '1px solid var(--border-color-ui-contrast5)',
    '& h4': {
      flex: 1,
      display: 'inline-block',
      margin: 0,
      padding: 0,
      fontSize: '1.2rem'
    }
  }
});

interface ListProps {
  title: string;
  list: QueryProps.Query[];
}

const List = observer(({ title, list }: ListProps) => {
  const classes = useStyles();
  if (!list || !list.length) {
    return null;
  }

  return (
    <div className={classes.container}>
      {/* <div className={classes.title}>
        <h4>{title} --</h4>
      </div> */}

      {list.map(query => (
        <Query
          key={query.id}
          query={query}
        />
      ))}
    </div>
  );
});
List.displayName = 'List';

export default List;
