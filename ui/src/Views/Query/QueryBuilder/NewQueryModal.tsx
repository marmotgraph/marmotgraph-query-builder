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

import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {createUseStyles} from 'react-jss';
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import useStores from '../../../Hooks/useStores';

const useStyles = createUseStyles({
  container: {
    '& h5': {
      margin: '0',
      paddingBottom: '20px'
    },
    '& button + button, & a + button, & a + a': {
      marginLeft: '20px'
    }
  }
});

interface NewQueryModalProps {
    show: boolean;
    onCancel: () => void;
    onCreateSuccess: () => void;
}

const NewQueryModal = ({show, onCreateSuccess, onCancel}: NewQueryModalProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const {typeStore, queryBuilderStore} = useStores();

  const typeArray = Array.from(typeStore.types, ([key, type]) => ({key, ...type}));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedTypeId(selectedId);
  };

  const onCreate = () => {
    const type = selectedTypeId && typeStore.types.get(selectedTypeId);
    if (type) {
      localStorage.setItem('type', type.id);
      queryBuilderStore.setType(type);
      const uuid = uuidv4();

      navigate(`/queries/${uuid}`, {replace: true});
      onCreateSuccess();
    }
  };

  return (
    <Modal show={show} className={classes.container}>
      <Modal.Header>
          Select a type
      </Modal.Header>
      <Modal.Body>
        <div>
          <select
            id="type-select"
            className="form-select"
            value={selectedTypeId}
            onChange={handleChange}
          >
            <option value="">-- Select a Type --</option>
            {typeArray.map(type => (
              <option
                key={type.id}
                value={type.id}
                style={{color: type.color || 'inherit'}}
              >
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
                    Cancel
        </Button>
        <Button variant={'primary'} onClick={onCreate}>
                    Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewQueryModal;
