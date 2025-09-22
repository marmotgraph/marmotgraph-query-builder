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
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons/faLongArrowAltRight';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import React from 'react';

import {createUseStyles} from 'react-jss';
import useStores from '../../../../Hooks/useStores';
import PropertyTypes from '../../../PropertyTypes';
import TargetName from './TargetName';
import Types from './Types';
import type Field from '../../../../Stores/Field';


const useStyles = createUseStyles({
  alias: {
    color: 'var(--ft-color-louder)',
    fontWeight: 'bold'
  },
  default: {
    color: 'var(--ft-color-normal)',
    fontStyle: 'italic'
  },
  link: {
    transform: 'translateY(1px)'
  },
  reverseLink: {
    color: '#6ab04c',
    transform: 'translateY(1px)'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  attribute: {
    maxWidth: '80%',  // Will take up to 80% of the parent element's width
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    verticalAlign: 'bottom',
  }
});

interface TypeProps {
  field: Field;
}

const Type = observer(({ field }: TypeProps) => {

  const { queryBuilderStore } = useStores();
  const classes = useStyles();

  const iconClassName = field.isReverse ? classes.reverseLink : classes.link;
  const icon = field.isReverse ? faLongArrowAltLeft : faLongArrowAltRight;
  const title = field.isReverse ? 'is an incoming link' : undefined;

  if (field.isUnknown && field.parent) {
    if (field.schema?.simpleAttributeName) {
      const attributeNameSpace = field.schema.attributeNamespace
        ? field.schema.attributeNamespace
        : field.schema.attribute;
      return (
        <div className={classes.content}>
          <div>
            {field.schema.simpleAttributeName} <TargetName field={field} />&nbsp;
          </div>
          {/*<FontAwesomeIcon icon={icon} className={iconClassName} title={title} />*/}
          <span className={classes.attribute}
            title={field.schema?.attribute} // Full URL shown on hover
            aria-label={`Attribute: ${field.schema?.attribute}`} // For screen readers
          >
            (` ${attributeNameSpace} `)
          </span>

        </div>
      );
    }
    return <>{field.schema?.attribute}</>;
  }

  if (field.parent) {
    return (
      <div title={field.schema?.attribute} // Full URL shown on hover
        aria-label={`Attribute: ${field.schema?.attribute}`} // For screen readers
      >
        <FontAwesomeIcon icon={icon} className={iconClassName} title={title} />
        &nbsp; {field.schema?.label} <TargetName field={field} /> &nbsp;
        {/*<small className={classes.attribute}>{field.schema?.attribute}</small>*/}
        <Types field={field} />
      </div>
    );
  }

  const type = queryBuilderStore.type?.id;

  if (type) {
    return (
      <>
        <PropertyTypes types={[type]} />
        &nbsp;- <small>{type}</small>
      </>
    );
  }

  return null;
});
Type.displayName = 'Type';

export default Type;
