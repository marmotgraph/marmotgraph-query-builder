import React from "react";
import injectStyles from "react-jss";
import Color from "color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import { isFunction } from "lodash";

import routerStore from "../Stores/RouterStore";

let styles = {
  container:{
    height:"50px",
    lineHeight:"50px",
    color:"rgba(255, 255, 255, 0.5)",
    background:"#1c2022",
    padding:"0 20px",
    border:"1px solid #141618",
    borderLeft:"none",
    cursor:"pointer",
    display:"grid",
    gridTemplateColumns:"auto 1fr auto",
    "& $icon": {
      opacity:0.5
    },
    "&:hover":{
      color:"rgb(224, 224, 224)",
      "& $icon": {
        opacity:1
      }
    }
  },
  active:{
    backgroundColor:new Color("#1c2022").lighten(0.2),
    color:"rgb(224, 224, 224)",
    borderBottom:"1px solid #40a9f3",
    "& $icon": {
      opacity:1
    }
  },
  text:{
    display:"inline-block",
    overflow:"hidden",
    textOverflow:"ellipsis",
    whiteSpace:"nowrap",
    "& + $close":{
      marginLeft:"10px"
    }
  },
  icon:{
    color:"rgb(224, 224, 224)",
    display:"inline-block",
    "& + $text":{
      marginLeft:"10px"
    }
  },
  close:{
    color:"rgba(255, 255, 255, 0.5)",
    "&:hover":{
      color:"rgb(224, 224, 224)"
    }
  }
};

@injectStyles(styles)
@observer
export default class Tab extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    if(this.props.path){
      routerStore.history.push(this.props.path);
    }
  }

  handleClose = (e) => {
    e.stopPropagation();
    if(isFunction(this.props.onClose)){
      this.props.onClose();
    }
  }

  render(){
    const {classes, active, icon, onClose, iconColor, iconSpin} = this.props;
    return (
      <div className={`${classes.container} ${active? classes.active: ""}`} onClick={this.handleClick}>
        <div className={classes.icon} style={iconColor?{color:iconColor}:{}}>
          {icon && <FontAwesomeIcon icon={icon} spin={iconSpin}/>}
        </div>
        <div className={classes.text} title={this.props.fullText}>
          {this.props.children}
        </div>
        {onClose?
          <div className={classes.close} onClick={this.handleClose}>
            <FontAwesomeIcon icon={"times"}/>
          </div>
          :null}
      </div>
    );
  }
}