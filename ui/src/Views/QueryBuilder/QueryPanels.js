import React, { useRef, useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { observer } from "mobx-react-lite";
import { Scrollbars } from "react-custom-scrollbars";

import queryBuilderStore from "../../Stores/QueryBuilderStore";

import Tab from "../../Components/Tab";
import QuerySpecification from "./QueryPanels/QuerySpecification";
import Options from "./QueryPanels/Options";
import Result from "./QueryPanels/Result";
import ResultTable from "./QueryPanels/ResultTable";

const useStyles = createUseStyles({
  container: {
    position: "relatif",
    display: "grid",
    gridTemplateRows: "auto 1fr"
  },
  body: {
    padding: "10px",
    border: "1px solid var(--border-color-ui-contrast2)",
    borderTop: "none",
    background: "var(--bg-color-ui-contrast2)"
  },
  tabs: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    borderLeft: "1px solid var(--border-color-ui-contrast2)"
  }
});

const View = ({name}) => {
  switch (name) {
  case "query":
    return(
      <QuerySpecification />
    );
  case "result":
    return(
      <Result />
    );
  case "resultTable":
    return(
      <ResultTable />
    );
  case "fieldOptions":
    return(
      <Options />
    );
  default:
    return null;
  }
};

const QueryPanels = observer(() => {

  const classes = useStyles();

  const scrollRef = useRef();

  const [tab, setTab] = useState("fieldOptions");

  const selectTab = tab => {
    setTab(tab);
    scrollRef.current && scrollRef.current.scrollToTop();
  };

  const handleSelectOptions = () => selectTab("fieldOptions");

  const handleSelectQuery = () => selectTab("query");

  const handleSelectResult = () => selectTab("result");

  const handleSelectTable = () => selectTab("resultTable");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTab(queryBuilderStore.currentField?"fieldOptions":"query"), [queryBuilderStore.currentField]);

  const handleResetField = () => queryBuilderStore.resetField();

  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        {queryBuilderStore.currentField && (
          <Tab icon={"cog"}           current={tab === "fieldOptions"} label={"Field options"}       onClick={handleSelectOptions} onClose={handleResetField}  />
        )}
        <Tab   icon={"shopping-cart"} current={tab === "query"}        label={"Query specification"} onClick={handleSelectQuery} />
        <Tab   icon={"poll-h"}        current={tab === "result"}       label={"Results: JSON View"}  onClick={handleSelectResult} />
        <Tab   icon={"table"}         current={tab === "resultTable"}  label={"Results: Table View"} onClick={handleSelectTable} />
      </div>
      <div className={classes.body}>
        <Scrollbars autoHide ref={scrollRef}>
          <View name={tab} />
        </Scrollbars>
      </div>
    </div>
  );
});

export default QueryPanels;