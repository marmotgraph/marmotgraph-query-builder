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
import { Scrollbars } from 'react-custom-scrollbars-2';
import { createUseStyles } from 'react-jss';

import Filter from '../../../../Components/Filter';
import Checkbox from '../../../../Components/Checkbox';
import useStores from '../../../../Hooks/useStores';

import Groups from './Properties/Groups';
import List from './Properties/List';
import type { QuerySpecification } from '../../../../Types/QuerySpecification';
import type { Property } from '../../../../types';
import type { MouseEvent } from 'react';

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    height: '100%',
    color: 'var(--ft-color-normal)',
    '& input': {
      color: 'black'
    },
    '& hr': {
      margin: '30px auto',
      maxWidth: '500px',
      borderTopColor: 'var(--bg-color-ui-contrast4)'
    },
    '&.has-options': {
      marginTop: '10px',
      '& $panel': {
        height: 'calc(100% - 25px)'
      }
    }
  },
  panelHeader: {
    marginBottom: '20px',
  },
  panel: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto auto auto auto ',
//     border: '1px solid var(--bg-color-ui-contrast1)',
    height: '100%'
  },
  filterRow: {
//     position: 'relative',
    display: 'grid',
    alignItems: 'left',
    gridTemplateColumn: '2fr 1fr',
    gap: '1rem',
  },
  filter: {
    border: 0,
    gridColumn: '1', /* First column */
    '& input': {
      marginLeft: 0,
    },
//     background: 'linear-gradient(90deg, rgba(20,50,60,0.2) 0%, rgba(20,50,60,0.4) 100%)'
  },
  body: {
    padding: '0 10px 20px 0'
//     borderTop: '1px solid var(--bg-color-ui-contrast1)'
  },
  advancedPropertiesCheckbox: {
    padding: '10px',
    gridColumn: '2',
    paddingLeft: '1.5em',
//     borderTop: '1px solid var(--bg-color-ui-contrast1)'
  }
});

  const Properties = observer(() => {

  const classes = useStyles();

  const { queryBuilderStore } = useStores();

  const field = queryBuilderStore.currentField;

  if (!field || !queryBuilderStore.currentFieldLookups.length) {
    return null;
  }

  const lookupsCommonsAttributes = queryBuilderStore.currentFieldLookupsCommonAttributes;
  const lookupsAttributes = queryBuilderStore.currentFieldLookupsAttributes;
  const lookupsCommonsLinks = queryBuilderStore.currentFieldLookupsCommonLinks;
  const lookupsLinks = queryBuilderStore.currentFieldLookupsLinks;

  const handleAddField = (e: MouseEvent<HTMLElement>, property: Property) => {
    //Don't go to newly chosen field options if ctrl is pressed (or cmd)
    const schema = {
      ...property,
      isUnknown: false
    } as QuerySpecification.Schema;
    queryBuilderStore.addField(schema, field, !e.ctrlKey && !e.metaKey);
  };

  const handleChildrenFilterChange = (value: string) => queryBuilderStore.setChildrenFilterValue(value);

  const handleToggleAdvancedProperties = () => queryBuilderStore.toggleIncludeAdvancedAttributes();
//   const handleToggleAdvancedProperties = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setValue(event.target.checked);
//       queryBuilderStore.toggleIncludeAdvancedAttributes();
//     };

  return (
    <div className={`${classes.container} ${queryBuilderStore.currentField === queryBuilderStore.rootField?'':'has-options'}`}>
      <div className={classes.panelHeader}>
        <h5>Add to query</h5>
        <small>Select an item from the options below to be added to your query</small>
      </div>
      <div className={classes.panel}>
        <div className={classes.filterRow}>
          <div className={classes.filter}>
            <Filter value={queryBuilderStore.childrenFilterValue} placeholder="Filter properties"
                    onChange={handleChildrenFilterChange} className={''}/>
          </div>
          <div className={classes.advancedPropertiesCheckbox} >
            <Checkbox
              label="Show advanced properties"
              checked={queryBuilderStore.includeAdvancedAttributes}
              onChange={() => handleToggleAdvancedProperties()}
            />
         </div>
        </div>
        <div className={classes.body}>
          <Scrollbars autoHide>
            <List
              properties={lookupsCommonsAttributes}
              label="Attributes"
              onClick={handleAddField}
            />
            <Groups
              groups={lookupsAttributes}
              prefix="Attributes specific to"
              onClick={handleAddField}
            />
            <List
              properties={lookupsCommonsLinks}
              label="Links"
              onClick={handleAddField}
            />
            <Groups
              groups={lookupsLinks}
              prefix="Links specific to"
              onClick={handleAddField}
            />
          </Scrollbars>
        </div>
      </div>
    </div>
  );
});
Properties.displayName = 'Properties';

export default Properties;