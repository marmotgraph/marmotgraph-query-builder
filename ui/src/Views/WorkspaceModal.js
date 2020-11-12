import React from "react";
import { createUseStyles } from "react-jss";
import { observer } from "mobx-react-lite";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-bootstrap/Modal";

import appStore from "../Stores/AppStore";
import authStore from "../Stores/AuthStore";

const rootPath = window.rootPath || "";
const useStyles = createUseStyles({
  container: {
    width: "100%",
    height: "100%",
    backgroundImage: `url('${window.location.protocol}//${window.location.host}${rootPath}/assets/graph.png')`,
    backgroundPosition: "50% 50%",
    color: "var(--ft-color-normal)"
  },
  modal: {
    overflow: "hidden",
    width: "90%",
    margin: "auto",
    "@media screen and (min-width:1024px)": {
      width: "900px"
    },
    "&.modal-dialog": {
      marginTop: "25vh",
      maxWidth: "unset",
      "& .modal-content": {
        background: "var(--bg-color-ui-contrast2)",
        color: "var(--ft-color-normal)",
        border: "1px solid var(--border-color-ui-contrast1)",
        "& .modal-body": {
          padding: "0",
          maxHeight: "calc(100vh - 30vh -80px)",
          overflowY: "hidden"
        }
      }
    }
  },
  panel: {
    fontSize: "1.5em",
    padding: "30px 0",
    "& h1": {
      padding: "0 30px 20px 30px"
    },
    "& p": {
      padding: "0 30px",
      fontWeight: "300"
    }
  },
  content: {
    display: "grid",
    padding: "0 30px",
    gridGap: "15px",
    gridTemplateColumns: "repeat(1fr)",
    "@media screen and (min-width:768px)": {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    "@media screen and (min-width:1024px)": {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
  },
  workspace: {
    position: "relative",
    padding: "20px",
    background: "var(--bg-color-ui-contrast3)",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1.2em",
    fontWeight: "300",
    textAlign: "center",
    wordBreak: "break-word",
    transition: "background .3s ease-in-out, color .3s ease-in-out",
    "@media screen and (min-width:768px)": {
      whiteSpace: "nowrap"
    },
    "&:hover": {
      background: "var(--bg-color-blend-contrast1)",
      color: "var(--ft-color-loud)",
    }
  }
});

const WorkspaceModal = observer(() => {
  const classes = useStyles();

  const handleClick = workspace => appStore.setCurrentWorkspace(workspace);

  const firstNameReg = /^([^ ]+) .*$/;
  const name = authStore.user
      && authStore.user.givenName?
    authStore.user.givenName
    :
    authStore.user.displayName?
      (firstNameReg.test(authStore.user.displayName)?
        authStore.user.displayName.match(firstNameReg)[1]
        :
        authStore.user.displayName)
      :
      authStore.user.username?
        authStore.user.username
        :
        "";
  return (
    <div className={classes.container}>
      <Modal dialogClassName={classes.modal} show={true} onHide={() => {}} >
        <Modal.Body>
          <div className={classes.panel}>
            <h1>Welcome <span title={name}>{name}</span></h1>
            <p>Please select a workspace:</p>
            <div style={{height: `${Math.round(Math.min(window.innerHeight * 0.5 - 140, Math.ceil(authStore.workspaces.length / 3) * 90))}px`}}>
              <Scrollbars>
                <div className={classes.content}>
                  {authStore.workspaces.map(workspace =>
                    <div className={classes.workspace} key={workspace} onClick={() => handleClick(workspace)}>{workspace}</div>
                  )}
                </div>
              </Scrollbars>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );

});

export default WorkspaceModal;