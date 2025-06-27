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
import {Scrollbars} from 'react-custom-scrollbars-2';
import { createUseStyles } from 'react-jss';
import Query from './Query';
import type { Query as QueryProps } from '../../../../Types/Query';

const useStyles = createUseStyles({
  container: {
    /* Shared_queries_box */
    // background: '#FFFFFF',
    color: 'var(--ft-color-loud)',
    background: 'var(--bg-color-ui-contrast1)',
    // boxShadow: '0px 4px 4px #E6E7E8',
    boxShadow: 'var(--box-shadow-ui-medium)',
    borderRadius: '12px',
    padding: '20px',
    // marginTop: '20px',
    marginBottom: '20px',
    // --col1Width: '1fr',
    // --col2Width: '1fr',
    // --col3Width: '2fr',
  },
  gridLayout: {
    width: '100%'
  },
  title: {
    display: 'flex',
    marginBottom: '10px',
    paddingBottom: '10px',
    paddingTop: '20px',
    borderBottom: 'var(--border-separator)',
    '& h4': {
      flex: 1,
      display: 'inline-block',
      margin: 0,
      padding: 0,
      fontSize: '1.2rem'
    }
  },
  myQueryHeader: {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr 2fr',
    borderBottom: 'var(--border-separator)',
    padding: '8px 0',
    h5: {
      margin: '0',
      fontWeight: '600',
    }
  },

  queryList :{
    width: '100%',
    height: 'calc(100vh - 300px)'
  },

  /* Ensure the Query component also uses the same grid layout */
  /* You would need to apply this class to your Query component */
  queryItem :{
    display: 'grid',
    gridTemplateColumns: '3fr 2fr 2fr',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },
  emptyList: {
    color: 'var(--ft-color-loud)',
    background: 'var(--bg-color-ui-contrast1)',
    borderRadius: '12px',
    padding: '100px',
    marginTop:'50px'
  }
});

interface ListProps {
  title: string;
  list: QueryProps.Query[];
}

const List = observer(({  list }: ListProps) => {
  const classes = useStyles();
  if (!list || !list.length) {
    return null;
  }

  return (
    <div>
      {list && list.length > 0 ? (
        <div className={classes.container}>
          <div className={classes.gridLayout}>
            <div className={classes.myQueryHeader}>
              <h5>Type</h5>
              <h5>Space</h5>
              <h5>Query title</h5>
            </div>

            <div className={classes.queryList}>
              <Scrollbars autoHide>
                {list.map(query => (
                  <Query
                    key={query.id}
                    query={query}
                  />
                ))}
              </Scrollbars>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.emptyList}>
          <h4>You have no saved queries.</h4>
          <p>
             Your query list is currently empty. You can browse shared queries or create a new one.
          </p>
        </div>
      )}
    </div>
  );
});
List.displayName = 'List';

export default List;
