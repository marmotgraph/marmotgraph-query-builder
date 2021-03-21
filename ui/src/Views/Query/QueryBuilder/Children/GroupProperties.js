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
import Icon from "../../../../Components/Icon";
import { createUseStyles } from "react-jss";
import { observer } from "mobx-react-lite";

import Property from "./Property";

const useStyles = createUseStyles({
  container: {
    color: "var(--ft-color-loud)",
    "& h5": {
      margin: "18px 0 6px 5px",
      "& small": {
        color: "var(--ft-color-quiet)",
        fontStyle: "italic"
      }
    }
  }
});

const GroupProperties = observer(({group, prefix, onClick }) => {

  const classes = useStyles();

  const { id, label, color, properties } = group;

  if (!Array.isArray(properties) || !properties.length) {
    return null;
  }

  return (
    <div className={classes.container}>
      <h5>{prefix} <Icon icon="circle" color={color}/> {label} <small> - {id}</small></h5>
      {properties.map(property => (
        <Property key={`${property.attribute}${property.reverse?"reverse":""}`} property={property} onClick={onClick} />
      ))}
    </div>
  );
});

export default GroupProperties;