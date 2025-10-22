import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { createUseStyles } from 'react-jss';
import ActionError from '../../../Components/ActionError';
import SpinnerPanel from '../../../Components/SpinnerPanel';
import useSaveQuery from '../../../Hooks/useSaveQuery';
import useStores from '../../../Hooks/useStores';
import Matomo from '../../../Services/Matomo';
import SpaceForm from '../QueryBuilder/SpaceForm';

const useStyles = createUseStyles({
  saveModal: {
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

const SaveQueryModal = observer(() => {
  const classes = useStyles();
  const { queryBuilderStore } = useStores();
  const { saveQuery } = useSaveQuery();
  const [title, setTitle] = useState(queryBuilderStore.saveLabel || '');
  const [description, setDescription] = useState(queryBuilderStore.description || '');
  const [isSaving] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleClose = () => {
    queryBuilderStore.setShowSaveModal(false);
    setError(undefined);
  };

  const handleSave = () => {

    queryBuilderStore.setSaveAsMode(true);
    queryBuilderStore.label = title.trim();
    queryBuilderStore.description = description.trim();
    saveQuery().then(() => {
      Matomo.trackEvent('Query', 'SaveAs', queryBuilderStore.queryId);
      queryBuilderStore.setShowSaveModal(false);
    });
  };

  const handleCancelError = () => setError(undefined);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      {queryBuilderStore.showSaveModal && (
        <div className={classes.modalOverlay} />
      )}
      <Modal id="saveModal" className="" show={queryBuilderStore.showSaveModal}>
        <div
          className={classes.modalContent}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <h2 className={classes.title}>Save Query As</h2>
          <form className={classes.form}>
            <div>
              <label htmlFor="query-title">Title *</label>
              <input
                id="query-title"
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
                disabled={isSaving}
              />
            </div>
            <div>
              <SpaceForm className={classes.space} />
            </div>
            <div>
              <label htmlFor="query-description">Description</label>
              <textarea
                id="query-description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Optional description for your query"
                disabled={isSaving}
              />
            </div>
            <div className={classes.buttonGroup}>
              <button
                type="submit"
                onClick={handleSave}
                className={classes.saveButton}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className={classes.cancelButton}
                disabled={isSaving}
              >
                Cancel
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

export default SaveQueryModal;
