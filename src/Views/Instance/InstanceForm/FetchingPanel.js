import React from "react";
import injectStyles from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = {
  panel: {
    position: "relative",
    padding: "10px 10px 0 10px",
    fontSize: "18px",
    fontWeight: "lighter",
    "@media screen and (max-width:576px)": {
      width: "220px",
      "&[inline='false']": {
        width: "180px"
      }
    },
    "&[inline='false']": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    "& small": {
      display: "block",
      padding: "10px 0",
      color:"grey",
      fontWeight:"400",
      fontSize:"0.6em",
      fontStyle: "italic",
      whiteSpace: "nowrap",
      "@media screen and (max-width:576px)": {
        wordBreak: "break-all",
        wordWrap: "break-word",
        whiteSpace: "normal"
      }
    }
  },
  label: {
    paddingLeft: "6px"
  }
};

@injectStyles(styles)
export default class FetchingPanel extends React.Component{
  render(){
    const { classes, id, show, inline } = this.props;
    if (!show) {
      return null;
    }
    return(
      <div className={classes.panel} inline={inline?"true":"false"}>
        <FontAwesomeIcon className={classes.icon} icon="circle-notch" spin/>
        <span className={classes.label}>Fetching instance...</span>
        <small>Nexus ID: {id}</small>
      </div>
    );
  }
}