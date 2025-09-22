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

import React from 'react';
import { createUseStyles } from 'react-jss';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import Icon from '../../../Components/Icon';
import type { KeyboardEvent } from 'react';
import type { Type } from '../../../types';

const useStyles = createUseStyles({
    listContainer: {
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid var(--border-color-ui-contrast1)',
        borderRadius: '4px',
        backgroundColor: 'var(--bg-color-ui-background)'
    },
    listItem: {
        padding: '12px 16px',
        borderBottom: 'var(--border-separator)',
        transition: 'var(--list-item-transition)',
        borderLeft: '3px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'var(--list-hover-bg)',
            borderLeftColor: 'var(--list-hover-border)',
            color: 'var(--list-hover-text)'
        },
        '&:last-child': {
            borderBottom: 'none'
        }
    },
    selected: {
        backgroundColor: 'var(--list-selected-bg)',
        borderLeftColor: 'var(--list-selected-border)',
        color: 'var(--list-selected-text)',
        '&:hover': {
            backgroundColor: 'var(--list-selected-bg)',
            borderLeftColor: 'var(--list-selected-border)',
            color: 'var(--list-selected-text)'
        }
    },
    focused: {
        backgroundColor: 'var(--bg-color-ui-contrast4)',
        '&:hover': {
            backgroundColor: 'var(--bg-color-ui-contrast4)'
        }
    },
    typeInfo: {
        marginLeft: '8px'
    },
    typeLabel: {
        fontWeight: 'bold',
        color: 'var(--ft-color-loud)',
        fontSize: '14px'
    },
    typeId: {
        fontSize: '12px',
        color: 'var(--ft-color-quiet)',
        wordBreak: 'break-word'
    }
});

interface TypeSelectorProps {
    types: Array<Type & { key: string }>;
    selectedTypeId: string;
    cursor?: number;
    onTypeSelect: (typeId: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
}

const TypeSelector = ({ types, selectedTypeId, cursor, onTypeSelect, onKeyDown }: TypeSelectorProps) => {
    const classes = useStyles();

    return (
        <div className={classes.listContainer}>
            {types.map((type, index) => (
                <div 
                    key={type.id}
                    className={`${classes.listItem} ${
                        selectedTypeId === type.id ? classes.selected : ''
                    } ${
                        cursor === index ? classes.focused : ''
                    }`}
                    onClick={() => onTypeSelect(type.id)}
                    onKeyDown={onKeyDown}
                    tabIndex={cursor === index ? 0 : -1}
                >
                    <Icon icon={faCircle} color={type.color} />
                    <div className={classes.typeInfo}>
                        <div className={classes.typeLabel}>{type.label}</div>
                        <div className={classes.typeId}>{type.id}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TypeSelector;
