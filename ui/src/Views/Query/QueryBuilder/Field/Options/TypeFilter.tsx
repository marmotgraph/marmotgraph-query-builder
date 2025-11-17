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

import {observer} from 'mobx-react-lite';
import React from 'react';
import { createUseStyles } from 'react-jss';

import Checkbox from '../../../../../Components/Checkbox';
import InfoTooltip from '../../../../../Components/InfoTooltip';

import useStores from '../../../../../Hooks/useStores';
import { Type as PropertyType } from '../../../../PropertyTypes';
import type { Query } from '../../../../../Types/Query';

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    paddingTop: '20px',
    paddingBottom: '10px',
    '& > div:first-child > div': {
      marginBottom: 0
    }
  },
  panel: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 10px 0 10px',
    border: '1px solid var(--bg-color-ui-contrast4)',
    marginTop: '6px'
  },
  typeItem: {
    flex: '1 1 calc(33.333% - 1px)',
    boxSizing: 'border-box',
    minWidth: '200px',
  },
  typeFilter: {
    flexWrap: 'wrap',
    display: 'flex',
    float: 'left',
    marginRight: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    height: '100%',
    alignItems: 'center',
    '-webkitTouchCallout': 'none',
    userSelect: 'none',
    transition: 'color .3s ease-in-out, border-color .3s ease-in-out',
    '&.selected, &:hover': {
      color: 'var(--ft-color-loud)',
      borderColor: 'var(--ft-color-loud)'
    },
    '&.isUnknown' : {
      borderColor: 'var(--bg-color-warn-normal)', // Using normal warn color for better contrast
      outline: '1px solid var(--bg-color-warn-normal)', // Adding outline for better visibility
      outlineOffset: '-1px'
    },
    '&.isUnknown.selected, &.isUnknown:hover': {
      borderColor: 'var(--bg-color-warn-loud)', // Using loud warn color for emphasis
      outline: '1px solid var(--bg-color-warn-loud)', // Adding outline for better visibility
      outlineOffset: '-1px',
      color: '#0F1219' // Dark text for better contrast
    },
    '& > span' : {
      paddingLeft: '10px',
      // float: 'left',
    }
  },
  toggle: {
    display: 'inline-block',
    //     paddingLeft: '6px'
  },
  '@media (max-width: 900px)': {
    typeItem: {
      flex: '1 1 calc(50% - 8px)',   // two columns
    },
  },

  '@media (max-width: 600px)': {
    typeItem: {
      flex: '1 1 100%',             // one column
    },
  },
});

interface TypeFilterItemProps {
  type: Query.TypeFilter;
  onChange: (id?: string, selected?: boolean) => void;
}

const TypeFilterItem = ({ type, onChange }: TypeFilterItemProps) => {
  const classes = useStyles();
  const handleOnClick = () => onChange(type.id, !type.selected);

  return(
    <div className={`${classes.typeFilter} ${type.isUnknown?'isUnknown':''} ${type.selected?'selected':''}`} onClick={handleOnClick} >
      <div>
        <Checkbox
          checked={type.selected}
          onChange={handleOnClick} />
      </div>
      <PropertyType type={type.id} />
    </div>
  );
};

const TypeFilter = observer(() => {

  const classes = useStyles();

  const { queryBuilderStore } = useStores();

  const handleToggleTypeFilter = () => queryBuilderStore.currentField && queryBuilderStore.currentField.toggleTypeFilter();

  const toggleTypeFilter = (type?: string, selected?: boolean) => queryBuilderStore.currentField && queryBuilderStore.currentField.filterType(type, selected);

  if (!queryBuilderStore.currentField || !queryBuilderStore.currentField.types.length || queryBuilderStore.currentField === queryBuilderStore.rootField) {
    return null;
  }

  const allTypes = queryBuilderStore.currentField?.types ?? [];
  const areAllSelected = allTypes.every(t => t.selected);

  const handleSelectAll = () => {
    const newState = !areAllSelected;
    allTypes.forEach(t => {
      if (t.selected !== newState) {
        toggleTypeFilter(t.id, newState);
      }
    });
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', marginBottom: '5px'}}>
        <Checkbox
          label="Restrict to type(s)"
          checked={queryBuilderStore.currentField.typeFilterEnabled}
          onChange={handleToggleTypeFilter}
        />
        <InfoTooltip text="You can define the property according to which the results should be sorted.
          This e.g. makes sense if you want to get a list of persons and want them to be ordered by family name.
          Please note that you can only select a single property on the first level of your query to do the sorting." />
      </div>
      {queryBuilderStore.currentField.typeFilterEnabled && (
        <><div className={classes.panel}>
          <div style={{ marginBottom: '8px',display: 'block',
            width: '100%'}}>
            <button
              type="button"
              onClick={handleSelectAll}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ft-color-primary)',   // match your theme colour
                cursor: 'pointer',
                fontSize: 'inherit',
                textDecoration: 'underline',
                padding: 0,
                margin: 0,
              }}
              aria-pressed={areAllSelected}
              title={areAllSelected ? 'Deselect all types' : 'Select all types'}
            >
              {areAllSelected ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          {queryBuilderStore.currentField.types.map((type, idx) => (
            <TypeFilterItem
              key={type.id ?? idx}
              type={type}
              onChange={toggleTypeFilter}
            />
          ))}
        </div>
        </>
      )}
    </div>
  );
});
TypeFilter.displayName = 'TypeFilter';

export default TypeFilter;
