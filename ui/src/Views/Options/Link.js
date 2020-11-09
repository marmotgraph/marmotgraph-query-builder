import React from "react";
import Icon from "../../Components/Icon";
import { createUseStyles } from "react-jss";

import Property from "./Property";

const useStyles = createUseStyles({
  container: {
    color: "var(--ft-color-loud)",
    "& h3": {
      fontSize: "1.7em",
      marginBottom: "10px",
      marginLeft: "10px",
      "& small": {
        color: "var(--ft-color-quiet)",
        fontStyle: "italic"
      }
    },
    "& .merge": {
      "& h3": {
        "& strong": {
          color: "greenyellow"
        }
      }
    }
  }
});

const Link = ({ link, label: prefix, isMerge=false, onClick }) => {
  const classes = useStyles();

  const { id, label, color, properties } = link;

  return (
    <div className={`${classes.container} ${isMerge?"merge":""}`}>
      <h3>{isMerge?(<strong>Merge</strong> ):""}{prefix} <Icon icon="circle" color={color}/> {label} <small> - {id}</small></h3>
      {properties.map(property => (
        <Property key={property.attribute + (property.reverse ? "reverse" : "")} property={property} onClick={onClick} />
      ))}
    </div>
  );
};

export default Link;