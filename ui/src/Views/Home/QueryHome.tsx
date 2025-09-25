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

import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import useListQueriesQuery from '../../Hooks/useListQueriesQuery';
import useStores from '../../Hooks/useStores';
import NewQueryModal from '../Query/QueryBuilder/NewQueryModal';
import List from './Selection/Queries/List';

// const useStyles = createUseStyles({
//   container: {
//
//   },
// });


const QueryHome = observer(() => {
  const {queriesStore} = useStores();

    const [showModal, setShowModal] = useState(false);


    const hideModal = () => {
        setShowModal(false);
    };

  const {
    data: queries


    ,
  } = useListQueriesQuery(null, false);
  useEffect(() => {
    console.log(queries);
    if (queries) {
      queriesStore.setQueries('*', queries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return <>
    <div className="container">
        {queriesStore.hasQueries ? (
            <>
                <h5>Your queries here</h5>
                <br/>
                <div>
                    <div>
                        <List
                            key="Your Queries"
                            title=""
                            list={queries ? queries : []}
                        />
                    </div>
                </div>
            </>
        ) : (
            <div>
                <p>You don't have saved queries yet.</p>
             <p>You can  create a new query or browse the shared ones.</p>
                <Link to="/queries" className='button'>
                    Select shared query
                </Link>

                <Button onClick={() => setShowModal(true)}>
                    <span>Create a new query</span>
                </Button>
                    <NewQueryModal show={showModal} onCreateSuccess={hideModal} onCancel={hideModal}/>
            </div>
        )}

    </div>
  </>;
});
QueryHome.displayName = 'QueryHome';

export default QueryHome;