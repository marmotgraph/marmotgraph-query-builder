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

import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uniqueId from 'lodash/uniqueId';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {createUseStyles} from 'react-jss';
import Field from '../Field';
import type { FieldProps } from '../Field';

interface ChildrenProps extends FieldProps {
  className: string;
}

const useStyles = createUseStyles({
  treeToggleContainer: {
    position: 'absolute',
    left: '1px',
    // top: '-18px',
    zIndex: '2',
    background: 'var(--background-color, white)',
  },

  treeToggleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    marginTop: '10px',
    // borderRadius: '50%',
    border: 'transparent',
    backgroundColor:' white',
    color: '#555',
    cursor: 'pointer',
    padding: '0',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      borderColor: '#aaa',
    }
  },
});

const Children = observer(({ field, className }: ChildrenProps) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation(); // Prevent triggering parent's onClick
    setIsExpanded(!isExpanded);
  };

  const hasChildren = field.structure && field.structure.length > 0;

  if (!hasChildren) {
    return null;
  }

  return (
    <div className={className}>
      <div className={classes.treeToggleContainer}>
        <button
          className={classes.treeToggleButton}
          onClick={toggleExpand}
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronRight}
            size="sm"
          />
        </button>
      </div>

      {isExpanded && field.structure.map(structureField => (
        <Field field={structureField} key={uniqueId('field_')} />
      ))}
    </div>
  );
});

Children.displayName = 'Children';

export default Children;
