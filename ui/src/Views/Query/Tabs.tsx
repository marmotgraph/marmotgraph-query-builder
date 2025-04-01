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

import {faCode} from '@fortawesome/free-solid-svg-icons/faCode';
import {faPlay} from '@fortawesome/free-solid-svg-icons/faPlay';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {observer} from 'mobx-react-lite';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import useStores from '../../Hooks/useStores';
import Matomo from '../../Services/Matomo';
import Actions from './Actions';

import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

const useStyles = createUseStyles({
  tabs: {
    overflow: 'visible',
    display: 'grid',
    gridTemplateRows: 'auto auto auto 1fr auto auto auto auto', // Last row pushes itself to the bottom
    height: '100%',
    borderRadius: '12px 0px 0px 12px',
    borderRight: '1px solid #E6E7E8',

    '& button': {
      '& span': {display: 'none'},

      alignSelf: 'end',
      padding: 0,
      // color: 'var(--ft-color-normal)',
      borderLeft: '2px solid transparent',
      // opacity: '0.5',
      cursor: 'pointer',
      height: '35px',
      width: '35px',
      lineHeight: '35px',
      margin: '7px',
      borderRadius: '6px',
      fontSize: '1.15em',
      textAlign: 'center',

      '&:hover': {
        background: 'var(--list-bg-hover)',
        color: '#F5F5F5',
        opacity: '1'
      },
      '&.active': {
        background: '#2E2E2E',
        color: '#F5F5F5',
        opacity: '1'
      },
      '&.disabled, &.disabled:hover':{
        background: 'transparent',
        color: 'var(--ft-color-normal)',
        opacity: '0.2',
        cursor: 'not-allowed'
      }
    },
  },

  tab: {
    position: 'relative',
    zIndex: '1000',
    color: 'var(--ft-color-normal)',
    borderLeft: '2px solid transparent',
    opacity: '0.5',
    cursor: 'pointer',
    height: '35px',
    width: '35px',
    lineHeight: '35px',
    margin: '7px',
    borderRadius: '6px',
    fontSize: '1.15em',
    textAlign: 'center',
    '&:hover': {
      background: 'var(--list-bg-hover)',
      color: '#F5F5F5',
      opacity: '1'
    },
    '&.active': {
      background: '#2E2E2E',
      color: '#F5F5F5',
      opacity: '1'
    },
    '&.disabled, &.disabled:hover':{
      background: 'transparent',
      color: 'var(--ft-color-normal)',
      opacity: '0.2',
      cursor: 'not-allowed'
    }
  },
  button: {
    position: 'relative',
    zIndex: '1000',
  }
});

interface TabProps {
  className: string;
  disabled: boolean;
  active: boolean;
  icon: IconDefinition;
  mode: string;
  title: string;
  onClick: (mode:string) => void;
}

const Tab = ({ className, disabled, active, icon, mode, title, onClick }: TabProps) => {

  const props = (disabled || active) ?
    {
      className: `${className} ${disabled?'disabled':''} ${active?'active':''}`
    }:
    {
      className: className,
      onClick: () => onClick(mode)
    };

  return(
    <div {...props} title={title}>
      <FontAwesomeIcon icon={icon}/>
    </div>
  );
};

interface TabsProps {
  mode: string;
}

const Tabs = observer(({ mode }: TabsProps) => {

  const classes = useStyles();

  const navigate = useNavigate();

  const { queryBuilderStore } = useStores();

  const setMode = (selectedMode: string) => {
    Matomo.trackEvent('Tab', 'ChangeMode', selectedMode);
    const id = (queryBuilderStore.saveAsMode && queryBuilderStore.sourceQuery && queryBuilderStore.queryId !== queryBuilderStore.sourceQuery.id)?queryBuilderStore.sourceQuery.id:queryBuilderStore.queryId;
    const path = (selectedMode === 'build')?`/queries/${id}`:`/queries/${id}/${selectedMode}`;
    navigate(path);
  };

  return (
    <div className={classes.tabs}>
      <Tab className={classes.tab} icon={faTools} mode="build"   active={mode === 'build'}   onClick={setMode} title="Build query"   disabled={false} />
      <Tab className={classes.tab} icon={faCode}  mode="edit"    active={mode === 'edit'}    onClick={setMode} title="Edit query"    disabled={false} />
      <Tab className={classes.tab} icon={faPlay}  mode="execute" active={mode === 'execute'} onClick={setMode} title="Execute query" disabled={queryBuilderStore.isQueryEmpty} />
      <Actions />
    </div>
  );
});
Tabs.displayName = 'Tabs';

export default Tabs;