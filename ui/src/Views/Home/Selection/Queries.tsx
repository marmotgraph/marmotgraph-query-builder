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

import { faRedoAlt } from '@fortawesome/free-solid-svg-icons/faRedoAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ErrorPanel from '../../../Components/ErrorPanel';
import Filter from '../../../Components/Filter';
import Spinner from '../../../Components/Spinner';
import useListQueriesQuery from '../../../Hooks/useListQueriesQuery';
import useStores from '../../../Hooks/useStores';
import List from './Queries/List';

const useStyles = createUseStyles({
  panel: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    color: 'var(--ft-color-normal)',
    //     border: '1px solid var(--border-color-ui-contrast2)',
    overflow: 'hidden',
    marginLeft: '20px'
  },
  filter: {
    paddingRight: '15px',
    border: 0,
    width: 'auto'
  },
  body: {
    padding: '0 0 10px 15px'
  },
  content: {
    paddingRight: '15px'
  },
    linkButton: {
        display: 'inline-block',
        textDecoration: 'none',
        boxSizing: 'border-box',
        width: 'auto',
        height: '34px',
        lineHeight: '32px',
        textAlign: 'center',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    primary: {
        backgroundColor: 'var(--cta-primary-bg)',
        color: 'var(--cta-primary-text)',
        borderRadius: 'var(--cta-primary-border-radius)',
        boxShadow: 'var(--cta-primary-box-shadow)',
        border: 'none',
        fontWeight: 500,
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: 'var(--cta-primary-hover-bg)',
        },

        '&:active': {
            backgroundColor: 'var(--cta-primary-active-bg)',
        },
    },

    container: {
        color: 'var(--ft-color-loud)',
        background: 'var(--bg-color-ui-contrast1)',
        boxShadow: 'var(--box-shadow-ui-medium)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
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
        gridTemplateColumns: '2fr 2fr 2fr',
        borderBottom: 'var(--border-separator)',
        padding: '8px 0 8px 12px',
        h5: {
            margin: '0',
            fontWeight: '600',
        }
    },

});

interface QueriesProps {
  className?: string;
}

const Queries = observer(({ className }: QueriesProps) => {

  const classes = useStyles();

  const { typeStore, queriesStore, queryBuilderStore } = useStores();

  const skip = queryBuilderStore.typeId === queriesStore.type;
  const navigate = useNavigate();

  const createAndRedirect = () => {
    const type = queryBuilderStore.typeId
      ? typeStore.types.get(queryBuilderStore.typeId)
      : undefined;

    if (!type) {
      console.warn('No type selected – cannot create query');
      return;
    }

    localStorage.setItem('type', type.id);
    queryBuilderStore.setType(type);

    const uuid = uuidv4();

    navigate(`/queries/${uuid}`, { replace: true });
  };

  const {
    data: queries,
    error,
    isUninitialized,
    isFetching,
    isError,
    refetch,
  } = useListQueriesQuery(queryBuilderStore.typeId as string, skip);

  useEffect(() => {
    if (queries) {
      queriesStore.setQueries(queryBuilderStore.typeId, queries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  const handleChange = (value: string) => queriesStore.setFilter(value);

  if (!queryBuilderStore.hasType) {
    return null;
  }

  if (isError) {
    return (
      <ErrorPanel>
        {error}
        <br />
        <br />
        <Button variant={'primary'} onClick={refetch}>
          <FontAwesomeIcon icon={faRedoAlt} /> &nbsp; Refresh
        </Button>
      </ErrorPanel>
    );
  }

  if ((isUninitialized && !skip) || isFetching) {
    return (
      <Spinner>
        Fetching queries for {queryBuilderStore?.type?.label}...
      </Spinner>
    );
  }

  if (!queryBuilderStore.typeId || queryBuilderStore.typeId !== queriesStore.type) {
    return null;
  }

  if (!queriesStore.hasQueries) {
    return (
      <div><ErrorPanel>
        {queryBuilderStore.type ? `No saved queries available yet for ${queryBuilderStore.type.label}`: 'No saved queries available'}
        {queryBuilderStore.type && <small> - {queryBuilderStore.type.id}</small>}
        <br />
        <br />
        <Button
          className={`${classes.linkButton} ${classes.primary}`}
          onClick={createAndRedirect}   // ← direct navigation
        >
          <span>Create a new query for this type</span>
        </Button>

      </ErrorPanel>
      </div>
    );
  }

  return (
    <div className={`${classes.panel} ${className ? className : ''}`}>
      <Filter
        className={classes.filter}
        value={queriesStore.filter}
        placeholder="Filter queries"
        onChange={handleChange}
      />
      <div className={classes.body}>
        <Scrollbars autoHide>
          <div className={classes.content}>
              <div className={classes.container}>
                  <div className={classes.gridLayout}>
                      <div className={classes.myQueryHeader}>
                          <h5>Type</h5>
                          <h5>Space</h5>
                          <h5>Query title</h5>
                      </div>
            {queriesStore.groupedFilteredQueries.map(group => (

              <List
                key={group.name}
                title={group.label}
                list={group.queries}
              />

            ))}
          </div> </div></div>
        </Scrollbars>
      </div>
    </div>
  );
});
Queries.displayName = 'Queries';

export default Queries;
