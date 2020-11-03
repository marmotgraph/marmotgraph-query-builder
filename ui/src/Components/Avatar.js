import React from "react";
import injectStyles from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = {
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
};

@injectStyles(styles)
class Avatar extends React.Component {

  render() {
    const {classes, user, size=20} = this.props;

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
  }
}

export default Avatar;