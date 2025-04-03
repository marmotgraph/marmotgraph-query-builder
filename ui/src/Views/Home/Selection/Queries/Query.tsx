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

import {faTag} from '@fortawesome/free-solid-svg-icons/faTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {observer} from 'mobx-react-lite';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

import Matomo from '../../../../Services/Matomo';
import type { Query as QuerySpecs } from '../../../../Types/Query';
import type { MouseEvent } from 'react';

const useStyles = createUseStyles({
  container:{
    position:'relative',
    cursor:'pointer',
    //     margin:'4px 0',
    padding:'10px',
    borderBottom: '1px solid #E6E6E6',
    '&:firstChild': {
      borderTop: '1px solid #E6E6E6',
    },
    color:'var(--ft-color-normal)',
    '&:hover': {
      background: '#F0F0F0'
    },
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 2fr',
    gridGap: '10px',
  },
  name: {
    //     position: 'relative',
    width: '100%',
    //     display: 'inline-block',
    color:'var(--ft-color-louder)',
    textTransform: 'capitalize',
    '& small': {
      color:'var(--ft-color-quiet)',
      fontStyle:'italic',
      textTransform: 'none'
    }
  },
  description: {
    overflow:'hidden',
    marginTop:'5px',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis',
    fontSize:'0.9em'
  }
});

interface QueryProps {
  query: QuerySpecs.Query;
}


const Query = observer(({query}: QueryProps) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleSelect = (e: MouseEvent<HTMLDivElement>) => {
    Matomo.trackEvent('Query', 'Select', query.id);
    e.stopPropagation();
    navigate(`/queries/${query.id}`);
  };

  const extractType = (type: string): string => {
    if (typeof query.meta.type !== 'string') {
      return '<unknown filter>';
    }
    const idx = type.lastIndexOf('/');
    if (idx !== -1) {
      return type.substring(idx + 1);
    }
    return type;
  };

  const type = query.meta.type ? extractType(query.meta.type) : undefined;

  return (
    <div className={classes.container} key={query.id} onClick={handleSelect} >
      <div className={classes.name}>
        <FontAwesomeIcon icon={faTag} />&nbsp;&nbsp;
        {type}
        <br/><small>{query.meta.type}</small>
      </div>
      <div>
        {query.space}
      </div>
      <div><h6>{query.label?query.label:query.id}</h6>
        {query.description && (
          <div className={classes.description} title={query.description}>{query.description}</div>
        )}</div>
    </div>
  );
});
Query.displayName = 'Query';

export default Query;
