import {observer} from 'mobx-react-lite';
import React, { useState } from 'react';
import {createUseStyles} from 'react-jss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useStores from '../../../Hooks/useStores';

import Actions from './Field/Actions';
import ChildrenFlag from './Field/ChildrenFlag';
import RequiredFlag from './Field/RequiredFlag';

import Type from './Field/Type';
import type FieldClass from '../../../Stores/Field';
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";

// Modified Children implementation that doesn't add additional chevrons
const ModifiedChildren = ({field, className}: {field: FieldClass, className: string}) => {
  if (!field.structure || !field.structure.length) {
    return null;
  }

  return (
    <div className={className}>
      {field.structure.map((childField, idx) => (

        <Field key={`child-${idx}`} field={childField} />
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    '&::before': {
      display: 'block',
      content: '\'\'',
      position: 'absolute',
      left: '20px', // Align with the chevron
      top: '20px', // Start from the middle of the content rather than the very top
      width: '0',
      height: 'calc(100% - 20px)', // Subtract from the height so it doesn't extend too far
      borderLeft: 'var(--border-separator)'
    },
    '&.is-child-node::before': {
      borderLeft: 'none'
    }
  },

  fieldContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 35px 10px 10px',
    margin: '1px',
    position: 'relative',
    background: 'var(--bg-color-ui-contrast2)',
    // background: 'white',
    zIndex: 2,
    cursor: 'pointer',
    '&:hover': {
      background: 'var(--bg-color-ui-contrast2)',
      // background: '#F0F0F0',
      '& $actions': {
        opacity: 1
      }
    },
    '&.selected': {
      background: 'var(--bg-color-ui-contrast2)',
      // background: '#F0F0F0',
      '& $actions': {
        opacity: 1
      }
    },
    '&.is-unknown': {
      color: 'var(--bg-color-warn-quiet)',
      '&&.selected': {
        background: 'var(--bg-color-warn-quiet)',
        color: 'var(--bg-color-ui-contrast2)',
      },
      '&:hover, &.selected:hover': {
        background: 'var(--bg-color-warn-normal)',
        color: 'var(--bg-color-ui-contrast2)',
      }
    },
    '&.is-invalid, &.is-unknown.is-invalid': {
      background: '#FFE0E1',
      '&&.selected': {
        background: '#FFE0E1'
      },
      '&:hover, &.selected:hover': {
        background: '#ff9497'
      }
    },
    '& small': {
      color: 'var(--ft-color-quiet)',
      fontStyle: 'italic'
    }
  },

  children: {
    paddingLeft: '20px' // Increased padding to align with the chevron
  },

  actions: {
    opacity: 0.25
  },

  fieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },

  chevronContainer: {
    marginRight: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '20px',
    cursor: 'pointer',
  },

  fieldContent: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },

  warningIconWrapper: {
    position: 'relative',
    color: 'var(--warn-normal-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    padding: '4px',
    cursor: 'pointer',
    borderRadius: '50%',

    '&:hover': {
      backgroundColor: 'rgba(255, 193, 7, 0.1)', // Subtle background on hover
    },

    '& i': {
      fontSize: '16px',
    }
  },

  tooltip: {
    position: 'absolute',
    left: 'calc(100% + 8px)',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'var(--bg-color-ui-contrast4)',
    color: 'var(--ft-color-loud)',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    boxShadow: 'var(--box-shadow-ui-medium)',
    zIndex: 10,
    maxWidth: '250px', // Prevents extremely long tooltips

    '&::after': {
      content: '""',
      position: 'absolute',
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      border: '6px solid transparent',
      borderRightColor: 'var(--bg-color-ui-contrast3)',
    }
  }
});

const getTitle = (field: FieldClass) => {
  if (field.isInvalid) {
    return 'this is not a recognized property for this type';
  }

  if (field.aliasError) {
    return 'alias should not be empty';
  }

  if (field.isInvalidLeaf) {
    return 'Links field must have at least one child field';
  }

  return undefined;
};

export interface FieldProps {
    field: FieldClass;
}

const Field = observer(({field}: FieldProps) => {
  const classes = useStyles();
  const {queryBuilderStore} = useStores();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSelectField = () => {
    queryBuilderStore.selectField(field);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const isFlattened = field.isFlattened;
  const hasFlattenedParent = field.parent && field.parent.isFlattened;
  const isInvalid = field.isInvalid || field.aliasError || field.isInvalidLeaf;
  const isSelected = field === queryBuilderStore.currentField;
  const hasChildren = field.structure && field.structure.length > 0;

  const title = getTitle(field);

  const containerClassName = [
    classes.container,
    isFlattened ? 'flattened' : '',
    !field.structure.length ? 'is-child-node' : '',
    hasFlattenedParent ? 'has-flattened-parent' : ''
  ].filter(Boolean).join(' ');

  const contentClassName = [
    classes.content,
    field.isUnknown ? 'is-unknown' : '',
    isInvalid ? 'is-invalid' : '',
    isSelected ? 'selected' : ''
  ].filter(Boolean).join(' ');

  // Render the chevron only if the field has children
  const renderChevron = () => {
    if (hasChildren) {
      return (
        <div className={classes.chevronContainer} onClick={toggleExpand}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              d={isExpanded ? 'M4 6l4 4 4-4' : 'M6 4l4 4-4 4'}
            />
          </svg>
        </div>
      );
    }
    return <div className={classes.chevronContainer}/>;
  };

  const [showTooltip, setShowTooltip] = useState(false);

  // Determine if this item has a warning (replace with your actual logic)
  const hasWarning = field.isUnknown || isInvalid;
  const warningMessage = 'This Message here....';

  return (
    <div className={containerClassName}>
      <div className={classes.fieldContainer}>
        <div
          className={contentClassName}
          title={title}
          onClick={handleSelectField}
        >
          <div className={classes.fieldWrapper}>
            {renderChevron()}
            { hasWarning && (
                <div
                    className={classes.warningIconWrapper}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onFocus={() => setShowTooltip(true)}
                    onBlur={() => setShowTooltip(false)}
                    aria-label={`Warning: ${warningMessage}`}
                >
                  <FontAwesomeIcon icon={faExclamationTriangle} />

                  {showTooltip && (
                      <div className={classes.tooltip}>
                        {warningMessage}
                      </div>
                  )}
                </div>
            )}
            <div className={classes.fieldContent}>
              <ChildrenFlag field={field}/>
              <RequiredFlag field={field}/>
              <Type field={field}/>
            </div>
            <Actions field={field} className={classes.actions}/>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className={classes.children}>
            <ModifiedChildren field={field} className="" />
          </div>
        )}
      </div>
    </div>
  );
});
Field.displayName = 'Field';

export default Field;
