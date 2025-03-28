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

import useAuth from '../Hooks/useAuth';
import useStores from '../Hooks/useStores';

import UserProfileTab from './UserProfileTab';
import MyQueriesHeader from './MyQueriesHeader';

const useStyles = createUseStyles({
  container: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr auto',
    alignItems: 'right'
  },
  fixedTabsLeft: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr'
  },
  fixedTabsRight: {
    display: 'flex', // Use flexbox for alignment
    justifyContent: 'flex-end', // Ensures content aligns to the right
    alignItems: 'center', // Vertically centers the content
    padding: '0 8px' // Optional: Add spacing around the element
  },
  userProfileTab: {
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    border1: '1px solid var(--border-color-ui-contrast2)',
    borderLeft: 'none',
    border: 0,
    '& > button': {
      background: 'transparent',
      color: '#2E2E2E',
      transition: 'background-color 0.3s ease-in-out',
      '&:hover' : {
        color: '#AAA'
      }
    }
  }
});

const Nav = observer(() => {
  const classes = useStyles();

  const { isAuthenticated } = useAuth();
  const { appStore, userProfileStore, spacesStore, typeStore } = useStores();

  if (appStore.globalError) {
    return null;
  }

  const handleButton1Click = () => {
    console.log('Button 1 clicked');
  };

  const handleButton2Click = () => {
    console.log('Button 2 clicked');
  };

  return (
    <nav className={classes.container}>
{/*       <div className={classes.fixedTabsLeft}> */}
{/*         {isAuthenticated && spacesStore.hasSpaces && typeStore.hasTypes && ( */}
{/*           <HomeTab /> */}
{/*         )} */}
{/*       </div> */}
      <div className={classes.fixedTabsRight}>
        <MyQueriesHeader title="My Queries" onButton1Click={handleButton1Click} onButton2Click={handleButton2Click} />
        {isAuthenticated && !!userProfileStore.user && (
          <UserProfileTab className={classes.userProfileTab} />
        )}
      </div>
    </nav>
  );
});
Nav.displayName = 'Nav';

export default Nav;

