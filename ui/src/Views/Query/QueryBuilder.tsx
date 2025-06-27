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

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import useStores from '../../Hooks/useStores';


import Options from './QueryBuilder/Field/Options';
import Properties from './QueryBuilder/Field/Properties';
import QueryForm from './QueryBuilder/QueryForm';
import Representation from './QueryBuilder/Representation';

const useStyles = createUseStyles({
  settingsButton: {
    backgroundColor: 'transparent',
    color: 'var(--ft-color-normal)',
    border: 'none',
    borderRadius: '6px', // or '50%' for a perfectly round button
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor: 'var(--bg-color-ui-contrast2)',
      color: 'var(--ft-color-loud)',
    },

    '&:active': {
      backgroundColor: 'var(--bg-color-ui-contrast3)',
    },

    '& i': {
      fontSize: '16px', // Adjust icon size as needed
    },

    // border: '1px solid #BCBEC0',
    // borderRadius: '6px',
    // width: '30px',
    // height: '32px',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // background: 'transparent', // Optional: Remove background if needed
    // cursor: 'pointer',
    // marginLeft: 'auto',
    // marginTop: '5px',
    // marginRight: '5px',
  },
  container: {
    // background: '#F6F6F6',
    background:'var(--bg-color-ui-contrast1)',
    position: 'relative',
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '4fr 7fr',
    height: '100%'
  },
  containerTitle: {
    position: 'relative',
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '9fr 1fr',
    padding: '20px 15px 15px 20px'
  },
  body:{
    background:'var(--bg-color-ui-contrast1)',
    // background: '#FFFFFF',
    borderRight: 'var(--border-separator)',
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    height: '100%',
    '&:not(.hasChanged)': {
      '& $form': {
        display: 'none'
      },
      '& $representation': {
        gridRowStart: 'span 3'
      },
      '& $actions': {
        display: 'none'
      }
    }
  },
  options: {
    position:'relative',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    //     background: 'linear-gradient(135deg, rgba(5,20,40,0.6) 0%, rgba(5,25,40,0.9) 100%)',
    //     border: '1px solid var(--border-color-ui-contrast1)',
    color: 'var(--ft-color-loud)',
    padding: '10px'
  },
  form: {},
  representation:{},
  actions: {
    position: 'relative',
    //     border: '1px solid var(--border-color-ui-contrast1)',
    color: 'var(--ft-color-loud)',
    padding: '10px 10px 0 0',
    '& > div': {
      textAlign: 'right',
      '& > button': {
        marginLeft: '10px',
        marginBottom: '10px'
      }
    }
  }
});

const QueryBuilder = observer(() => {
  const classes = useStyles();

  const { queryBuilderStore } = useStores();

  // State to manage visibility of QueryForm
  const [showQueryForm, setShowQueryForm] = useState(false);

  if (!queryBuilderStore.rootField) {
    return null;
  }

  const handleSettingsClick = () => {
    setShowQueryForm((prev) => !prev); // Toggle visibility of QueryForm
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.body} ${queryBuilderStore.isQuerySaved || !queryBuilderStore.isQueryEmpty?'hasChanged':''}`}>
        <div className={classes.containerTitle}>
          <div>
            <h6>Query</h6>
            <h5>{queryBuilderStore.label}</h5>
          </div>
          <button className={classes.settingsButton} onClick={handleSettingsClick}>
            <FontAwesomeIcon icon={faGear} />
          </button>
          {/*<QueryForm className={classes.form} />*/}
          {/* Settings button */}
        </div>
        <Representation className={classes.representation} />
      </div>

      {showQueryForm ? (
        <QueryForm className={classes.form} />
      ) : (

        <div className={classes.options}>

          <Options />
          <Properties />
        </div>
      )}
    </div>

  );
});
QueryBuilder.displayName = 'QueryBuilder';

export default QueryBuilder;