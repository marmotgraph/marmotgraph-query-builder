/*
*   Copyright (c) 2020, EPFL/Human Brain Project PCO
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*/

import React from "react";
import {observer} from "mobx-react-lite";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = createUseStyles({
  avatar: {
    verticalAlign: "middle",
    "&.picture": {
      border: 0,
      borderRadius: "50%"
    },
    "&.default": {
      transform: "scale(1.35)"
    }
  }
});

const Avatar = observer(({ user, size=20 }) => {

  const classes = useStyles();

  if (!user) {
    return null;
  }

  if (user.picture) {
    return (
      <img alt={user.name?user.name:user.id} width={size} height={size} src={user.picture} title={user.name?user.name:user.id} className={`${classes.avatar} avatar picture`} />
    );
  }

  return (
    <FontAwesomeIcon icon="user" title={user.name?user.name:user.id} className={`${classes.avatar} avatar default`} />
  );
});

export default Avatar;