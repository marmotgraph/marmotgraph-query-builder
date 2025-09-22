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

import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { createUseStyles } from 'react-jss';

import PropertyTypes from '../../../../PropertyTypes';
import type { Property as PropertyType } from '../../../../../types';
import type { MouseEvent } from 'react';

const useStyles = createUseStyles({
  propertyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    color: 'var(--ft-color-loud)',
    fontWeight: 'normal',
    padding: '10px',
    margin: '1px',
    borderBottom: 'var(--border-separator)',
    '&:last-of-type': {
      borderBottom: 'transparent',
    },
    //     background: 'rgba(0,0,0,0.4)',
    '& small': {
      color: 'var(--ft-color-quiet)',
      fontStyle: 'italic'
    },
  },
  propertyInfo: {
    display: 'flex',
    flexDirection: 'column', // Stacks label and PropertyTypes vertically
    gap: '8px', // Adds spacing between label and PropertyTypes
  },
  propertyTypes: {
    //         marginTop: '5px', // Adds a little margin for visual separation
  },
  propertyActions: {
    display: 'flex',
    flexDirection: 'column', // Ensures button stays on a separate line
    alignItems: 'flex-start',
    gap: '10px', // Adds spacing between the button and other elements if needed
  },
  addProperty: {
    whiteSpace: 'nowrap',
    backgroundColor: 'var(--cta-secondary-bg)',
    color: 'var(--cta-secondary-text)',
    border: '1px solid var(--cta-secondary-border)',
    borderRadius: 'var(--cta-secondary-border-radius)',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    height: '34px',
    padding: '0 7px',
    '&:hover': {
      backgroundColor: 'var(--cta-secondary-hover-bg)',
    },

    '&:active': {
      backgroundColor: 'var(--cta-secondary-active-bg)',
    },

    // background: '#F5F5F5',
    // marginLeft: 'auto',
    // borderRadius: '6px',
    // cursor: 'pointer',
    // /* Button style  */
    // boxSizing: 'border-box',
    // height: '34px',
    // border: '1px solid #2E2E2E',
    // padding: '0 7px',
    // '&:hover': {
    //   //       background: 'linear-gradient(90deg, rgba(40,70,80,0.9) 0%, rgba(45,75,85,0.9) 100%)'
    //   background: '#F0F0F0'
    // }
  },
  reverseLink: {
    color: 'greenyellow',
    transform: 'translateY(1px)'
  }
});

interface PropertyProps {
  property: PropertyType;
  onClick: (e: MouseEvent<HTMLElement>, property: PropertyType) => void;
}

const Property = observer(({ property, onClick }: PropertyProps) => {

  const classes = useStyles();

  const { attribute, label, canBe } = property;

  const handleClick =  (e: React.MouseEvent<HTMLButtonElement>)  => onClick(e, property);

  return (
    <div className={classes.propertyRow}>
      {/* Left side */}
      <div className={classes.propertyInfo}>
        <div>{property.reverse && (
          <React.Fragment>
            <FontAwesomeIcon icon={faLongArrowAltLeft} className={classes.reverseLink} title="is an incoming link" />&nbsp;
          </React.Fragment>
        )}
        {label} - <small>{attribute}</small></div>
        <div className={classes.propertyTypes}>
          <small><PropertyTypes types={canBe} /></small>
        </div>
      </div>
      {/* Right side */}
      <div className={classes.propertyActions}>
        <button
          className={classes.addProperty}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faPlus} title="Add property"/> Add</button>
      </div>
    </div>
  );
});
Property.displayName = 'Property';

export default Property;