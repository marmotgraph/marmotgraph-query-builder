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

import React, { useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useStores from '../../../Hooks/useStores';
import Filter from '../../../Components/Filter';
import TypeSelector from './TypeSelector';
import type { KeyboardEvent } from 'react';

const useStyles = createUseStyles({
    container: {
        '& h5': {
            margin: '0',
            paddingBottom: '20px'
        },
        '& button + button, & a + button, & a + a': {
            marginLeft: '20px'
        },
        '& .modal-content': {
            backgroundColor: 'var(--bg-color-ui-background)',
            borderColor: 'var(--border-color-ui-contrast1)',
            color: 'var(--ft-color-normal)'
        },
        '& .modal-header': {
            backgroundColor: 'var(--bg-color-ui-contrast1)',
            borderBottomColor: 'var(--border-color-ui-contrast2)',
            color: 'var(--ft-color-loud)',
            '& .modal-title': {
                color: 'var(--ft-color-loud)'
            }
        },
        '& .modal-body': {
            backgroundColor: 'var(--bg-color-ui-background)',
            color: 'var(--ft-color-normal)'
        },
        '& .modal-footer': {
            backgroundColor: 'var(--bg-color-ui-contrast1)',
            borderTopColor: 'var(--border-color-ui-contrast2)'
        }
    },
    filter: {
        paddingBottom: '15px'
    }
});

interface NewQueryModalProps {
    show: boolean;
    onCancel: () => void;
    onCreateSuccess: () => void;
}

const NewQueryModal = ({ show, onCreateSuccess, onCancel }: NewQueryModalProps) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [cursor, setCursor] = useState<number>();
    const { typeStore, queryBuilderStore } = useStores();

    const typeArray = Array.from(typeStore.types, ([key, type]) => ({ key, ...type }));

    // Filter types based on the search input
    const filteredTypes = useMemo(() => {
        if (!filterValue.trim()) {
            return typeArray;
        }
        return typeArray.filter(type =>
            type.label.toLowerCase().includes(filterValue.trim().toLowerCase())
        );
    }, [typeArray, filterValue]);

    const handleChange = (value: string) => {
        setFilterValue(value);
        setCursor(undefined);
        // Clear selection if current selected type is not in filtered results
        if (selectedTypeId && !filteredTypes.some(type => type.id === selectedTypeId)) {
            setSelectedTypeId('');
        }
    };

    // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedId = e.target.value;
    //     setSelectedTypeId(selectedId);
    // };

    const handleFilterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (cursor === undefined && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            setCursor(0);
            e.preventDefault();
        }
        if (e.key === 'ArrowUp' && cursor !== undefined && cursor > 0) {
            setCursor(prevCursor => prevCursor !== undefined ? prevCursor - 1 : prevCursor);
            e.preventDefault();
        } else if (
            e.key === 'ArrowDown' &&
            cursor !== undefined &&
            cursor < filteredTypes.length - 1
        ) {
            setCursor(prevCursor => prevCursor !== undefined ? prevCursor + 1 : prevCursor);
            e.preventDefault();
        } else if (e.key === 'Enter' && cursor !== undefined && filteredTypes[cursor]) {
            setSelectedTypeId(filteredTypes[cursor].id);
            e.preventDefault();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (cursor === undefined && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            setCursor(0);
        }
        if (e.key === 'ArrowUp' && cursor !== undefined && cursor > 0) {
            setCursor(prevCursor =>
                prevCursor !== undefined ? prevCursor - 1 : prevCursor
            );
        } else if (
            e.key === 'ArrowDown' &&
            cursor !== undefined &&
            cursor < filteredTypes.length - 1
        ) {
            setCursor(prevCursor =>
                prevCursor !== undefined ? prevCursor + 1 : prevCursor
            );
        }
    };

    const onCreate = () => {
        const type = selectedTypeId && typeStore.types.get(selectedTypeId);
        if (type) {
            localStorage.setItem('type', type.id);
            queryBuilderStore.setType(type);
            const uuid = uuidv4();

            navigate(`/queries/${uuid}`, { replace: true });
            onCreateSuccess();
        }
    };

    const handleModalClose = () => {
        setFilterValue('');
        setSelectedTypeId('');
        setCursor(undefined);
        onCancel();
    };

    return (
        <Modal show={show} className={classes.container}>
            <Modal.Header>
                Select a type
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Filter
                        className={classes.filter}
                        value={filterValue}
                        placeholder="Filter types"
                        onChange={handleChange}
                        onKeyDown={handleFilterKeyDown}
                    />
                    <TypeSelector
                        types={filteredTypes}
                        selectedTypeId={selectedTypeId}
                        cursor={cursor}
                        onTypeSelect={setSelectedTypeId}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onCreate} disabled={!selectedTypeId}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewQueryModal;