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
import { createUseStyles } from 'react-jss';
import PropertyComponent from './Property';
import type { Property } from '../../../../../types';
import type { MouseEvent } from 'react';

const useStyles = createUseStyles({
  container: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 4px #E6E7E8',
    borderRadius: '12px',
    color: 'var(--ft-color-loud)',
    padding: '10px',
    marginBottom: '20px',
    '& h5': {
      margin: '18px 0 6px 5px',
      '& small': {
        color: 'var(--ft-color-quiet)',
        fontStyle: 'italic'
      }
    }
  }
});

interface ListProps {
  properties?: Property[];
  label: string;
  onClick: (e: MouseEvent<HTMLElement>, property: Property) => void;
}

const List = observer(({ properties, label, onClick }: ListProps) => {
  const classes = useStyles();

  if (!Array.isArray(properties) || !properties.length) {
    return null;
  }

  return (
    <div className={classes.container}>
      <h5>{label}</h5>
      {properties.map(property => (
        <PropertyComponent key={`${property.attribute}${property.reverse?'reverse':''}`} property={property} onClick={onClick} />
      ))}
    </div>
  );
});
List.displayName = 'List';

export default List;