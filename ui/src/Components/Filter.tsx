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

import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { createUseStyles } from 'react-jss';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import type {ChangeEvent, KeyboardEvent, RefObject } from 'react';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--ft-color-loud)',
    //   backgroundColor: 'var(--bg-color-ui-contrast3)',
    borderBottom: 0
  },
  input: {
    flex: '1',
    background: 'var(--bg-color-ui-contrast4)',
    color: 'var(--ft-color-loud)',
    width: 'calc(100% - 100px)',
    margin: '10px',
    border: 'var(--border-color-ui-contrast5)',
    borderRadius: '6px',
    paddingLeft: '30px',
    //     backgroundColor: 'var(--bg-color-blend-contrast1)',
    //     '&:focus': {
    //       color: 'var(--ft-color-loud)',
    //       borderColor: 'rgba(64, 169, 243, 0.5)',
    //       backgroundColor: 'transparent'
    //     }
  },
  icon: {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '20px',
    color: '#A3A5A6'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    border: 'none',
    borderRadius: 'var(--cta-primary-border-radius)',
    backgroundColor: 'var(--cta-primary-bg)',
    color: 'var(--cta-primary-text)',
    boxShadow: 'var(--cta-primary-box-shadow)',
    fontWeight: 500,
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--cta-primary-hover-bg)',
    },
    '&:active': {
      backgroundColor: 'var(--cta-primary-active-bg)',
    },
  }}
);

interface FilterProps {
  value: string;
  className: string;
  placeholder: string;
  icon?: IconDefinition;
  onChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Filter = ({
  value,
  className,
  placeholder = 'filter...',
  icon = faSearch,
  onChange,
  onKeyDown
}: FilterProps) => {
  const classes = useStyles();

  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
    return () => {
      onChange('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (ref.current && ref.current.value) {
      onChange(ref.current.value);
    }
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    onKeyDown && onKeyDown(e);

  return (
    <div className={`${classes.container} ${className ? className : ''}`}>
      <Form.Control
        ref={ref as RefObject<HTMLInputElement>}
        className={classes.input}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder={placeholder}
      />
      <button className={classes.filterButton} onClick={handleClick}>
        <FontAwesomeIcon icon={icon}/>
      </button>
    </div>
  );
};

export default Filter;
