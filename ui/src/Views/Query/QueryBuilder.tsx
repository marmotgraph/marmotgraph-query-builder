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
import { Scrollbars } from 'react-custom-scrollbars-2';

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
    }
  },
  container: {
    background:'var(--bg-color-ui-contrast1)',
    position: 'relative',
    flex: 1,
    display: 'grid',
    gridTemplateRows: 'auto 1fr', // Changed: header row + content row
    height: '100%'
  },
  containerTitle: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr auto', // Changed: flexible left column + auto-sized right column
    padding: '20px 10px 10px 20px',
    background:'var(--bg-color-ui-contrast1)', // Added: ensure consistent background
    borderBottom: 'var(--border-separator)' // Added: optional separator
  },
  contentArea: {
    display: 'grid',
    gridTemplateColumns: '4fr 7fr', // Changed: two equal columns
    height: '100%'
  },
  body:{
    background:'var(--bg-color-ui-contrast1)',
    borderRight: 'var(--border-separator)',
    position: 'relative',
    display: 'flex', // Changed: simplified to flex
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  options: {
    position:'relative',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    color: 'var(--ft-color-loud)',
    padding: '10px'
  },
  form: {},
  representation:{
    width: '100%',
    height: '100%'
  },
  actions: {
    position: 'relative',
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
      <div className={`${classes.container} ${queryBuilderStore.isQuerySaved || !queryBuilderStore.isQueryEmpty?'hasChanged':''}`}>
        {/* Title section - full width */}
        <div className={classes.containerTitle}>
          <div>
            <h6>Query</h6>
            <h5>{queryBuilderStore.label}</h5>
          </div>
          <button className={classes.settingsButton} onClick={handleSettingsClick}>
            <FontAwesomeIcon icon={faGear} />
          </button>
        </div>

        {/* Content area - two columns */}

        <div className={classes.contentArea}>
          {/* Left column - Representation */}
          <div className={classes.body}>
            <Representation className={classes.representation} />
          </div>

          <Scrollbars autoHide>
          {/* Right column - QueryForm or Options */}
          {showQueryForm ? (
              <QueryForm className={classes.form} />
          ) : (

              <div className={classes.options}>
                <Options />
                <Properties />
              </div>

          )}</Scrollbars>
        </div>

      </div>
  );
});

QueryBuilder.displayName = 'QueryBuilder';

export default QueryBuilder;