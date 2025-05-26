/*
 * Copyright 2024 ETH Zurich
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
import {createUseStyles} from 'react-jss';
import {Link} from 'react-router-dom';

import NewQueryModal from './Query/QueryBuilder/NewQueryModal';


const useStyles = createUseStyles({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Pushes elements apart
        padding: '16px',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px', // Adds spacing between the link and button
        marginLeft: 'auto', // Moves it to the right
    },
    link: {
        color: 'var(--link-color-default)',
        '& hover': {
          color: 'var(--link-color-hover)',
          textDecoration: 'var(--link-decoration-hover)',
        },
        '& visited': {
          color: 'var(--link-color-visited)',
        },
        '& active': {
          color: 'var(--link-color-active)'
        },
        // color: '#007bff', // Blue like a standard link
        textDecoration: 'underline',
        // fontSize: '14px',
        // cursor: 'pointer',
        // background: 'none',
        border: 'none',
        // padding: '0',
        marginRight: '20px',
    },
    linkButton: {
        display: 'inline-block',
        textDecoration: 'none',
        boxSizing: 'border-box',
        width: '150px',
        height: '34px',
        lineHeight: '32px',
        textAlign: 'center',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    primary: {
        backgroundColor: 'var(--cta-primary-bg)',
        color: 'var(--cta-primary-text)',
        borderRadius: 'var(--cta-primary-border-radius)',
        boxShadow: 'var(--cta-primary-box-shadow)',
        border: 'none',
        fontWeight: 500,
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: 'var(--cta-primary-hover-bg)',
        },

        '&:active': {
            backgroundColor: 'var(--cta-primary-active-bg)',
        },
        // color: 'var(--ft-color-loud)',
        // background: 'var(--bg-color-ui-contrast2)',
        // // background: '#2E2E2E',
        // border: '1px solid var(--bg-color-ui-contrast2)',
        // color: '#F5F5F5',
    },
    secondary: {
        backgroundColor: 'var(--cta-secondary-bg)',
        color: 'var(--cta-secondary-text)',
        border: `1px solid var(--cta-secondary-border)`,
        borderRadius: 'var(--cta-secondary-border-radius)',
        fontWeight: 500,
        transition: 'all 0.2s ease',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: 'var(--cta-secondary-hover-bg)',
        },

        '&:active': {
            backgroundColor: 'var(--cta-secondary-active-bg)',
        }
        // color: 'var(--ft-color-loud)',
        // background: 'var(--bg-color-ui-contrast2)',
        // border: '1px solid var(--bg-color-ui-contrast2)',
        // // color: '#2E2E2E',
        // marginRight: '10px',
    },
});

interface MyQueriesHeaderProps {
    title?: string
}

const MyQueriesHeader = ({title}: MyQueriesHeaderProps) => {
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false);


    const hideModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <header className={classes.header}>
                {/* Buttons */}
                <div className={classes.buttonContainer}>
                    <Link to="/queries" className={classes.link}>
                        Select shared query
                    </Link>
                    <button className={`${classes.linkButton} ${classes.primary}`}
                            onClick={() => setShowModal(true)}>
                        <span>Create a new query</span>
                    </button>
                </div>
            </header>
            <NewQueryModal show={showModal} onCreateSuccess={hideModal} onCancel={hideModal}/>
        </>
    );
};

export default MyQueriesHeader;