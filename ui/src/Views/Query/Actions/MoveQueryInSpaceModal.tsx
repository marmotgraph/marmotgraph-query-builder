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
import Modal from 'react-bootstrap/Modal';
import { createUseStyles } from 'react-jss';
import ActionError from '../../../Components/ActionError';
import SpinnerPanel from '../../../Components/SpinnerPanel';
import useSaveQuery from '../../../Hooks/useSaveQuery';
import useStores from '../../../Hooks/useStores';
import Matomo from '../../../Services/Matomo';
import SpaceForm from '../QueryBuilder/SpaceForm';
import type { Space } from '../../../types';

const useStyles = createUseStyles({
  moveSpaceModal: {
    // Add any specific styles for the save modal if needed
  },
  space: {
    marginTop: '20px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'var(--border-color-ui-contrast2)',
    opacity: 0.8,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center', // Vertical center
    justifyContent: 'center', // Horizontal center
    padding: '20px' // Padding for small screens
  },
  modalContent: {
    backgroundColor: 'var(--bg-color-ui-contrast2)!important',
    // border: '1px solid var(--border-color-ui-contrast1)',
    borderRadius: '8px',
    padding: '32px',
    minWidth: '400px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh', // Prevent overflow on small screens
    overflow: 'auto',

    // Ensure it works in both light and dark mode
    color: 'var(--ft-color-loud)'
  },
  content: {
    textAlign: 'left', // Override the center alignment from your base Modal
    minWidth: '400px',
    maxWidth: '500px'
  },
  title: {
    paddingTop: '50px',
    paddingLeft: '50px',
    marginBottom: '20px',
    textAlign: 'left',
    color: 'var(--ft-color-loud)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '0 50px 50px',
    textAlign: 'left',
    '& label': {
      fontWeight: 'bold',
      marginBottom: '5px',
      display: 'block'
    },
    '& input, & textarea': {
      width: '100%',
      padding: '8px',
      border: '1px solid var(--border-color-ui-contrast1)',
      borderRadius: '4px',
      background: 'var(--bg-color-ui-contrast1)',
      color: 'var(--ft-color-loud)'
    },
    '& textarea': {
      minHeight: '80px',
      resize: 'vertical'
    }
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
    '& button': {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  },
  saveButton: {
    background: 'var(--cta-primary-bg)',
    color: 'var(--cta-primary-text)',
    '&:hover': {
      background: 'var(--cta-primary-hover-bg)'
    }
  },
  cancelButton: {
    background: 'var(--bg-color-ui-contrast1)',
    color: 'var(--ft-color-loud)',
    border: '1px solid var(--border-color-ui-contrast1)',
    '&:hover': {
      background: 'var(--bg-color-ui-contrast1)'
    }
  }
});

const MoveQueryInSpaceModal = observer(() => {
  const classes = useStyles();

  const { queryBuilderStore } = useStores();
  const { saveQuery, isSaving, error, setError } = useSaveQuery();

  const handleClose = () => {
    queryBuilderStore.setSpace(queryBuilderStore.fromSpace as Space);
    queryBuilderStore.setShowMoveSpaceModal(false);
    setError(undefined);
  };

  const handleSave = async () => {
    queryBuilderStore.setMoveSpace(true);
    saveQuery().then((result) => {
      if (result) {
        Matomo.trackEvent('Query', 'MoveTo', queryBuilderStore.queryId);
        queryBuilderStore.setShowMoveSpaceModal(false);
      }
    }).finally(() => {
      queryBuilderStore.setMoveSpace(false);
    });
  };

  const handleCancelError = () => {
    setError(undefined);
    queryBuilderStore.setSpace(queryBuilderStore.fromSpace as Space);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      {queryBuilderStore.showMoveQueryInSpaceModal && (
        <div className={classes.modalOverlay} />
      )}
      <Modal
        id="moveSpaceModal"
        className=""
        show={queryBuilderStore.showMoveQueryInSpaceModal}
      >
        <div
          className={classes.modalContent}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <h2 className={classes.title}>Move Query To</h2>
          <form className={classes.form}>
            <div>
              <SpaceForm className={classes.space} />
            </div>
            <div className={classes.buttonGroup}>
              <button
                type="button"
                onClick={handleClose}
                className={classes.cancelButton}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSave}
                className={classes.saveButton}
                disabled={isSaving}
              >
                {isSaving ? 'Moving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <SpinnerPanel
        show={isSaving}
        text={`Saving query ${queryBuilderStore.queryId}`}
      />
      <ActionError
        error={error}
        onCancel={handleCancelError}
        onRetry={saveQuery}
      />
    </>
  );
});

export default MoveQueryInSpaceModal;
