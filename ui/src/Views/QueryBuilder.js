import React from "react";
import injectStyles from "react-jss";
import { observer } from "mobx-react";
import { Button, FormControl} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";

import queryBuilderStore from "../Stores/QueryBuilderStore";
import typesStore from "../Stores/TypesStore";
import Query from "./Query";
import QueriesDrawer from "./QueriesDrawer";

import RootSchemaChoice from "./RootSchemaChoice";
import QuerySpecification from "./QuerySpecification";
import Options from "./Options";
import Result from "./Result";
import ResultTable from "./ResultTable";
import Tab from "../Components/Tab";
import BGMessage from "../Components/BGMessage";
import FetchingLoader from "../Components/FetchingLoader";

const rootPath = window.rootPath || "";

let styles = {
  container: {
    width: "100%",
    height: "100%",
    color: "var(--ft-color-normal)",
    backgroundImage: `url('${window.location.protocol}//${window.location.host}${rootPath}/assets/graph.png')`,
  },
  structureLoader: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10000,
    background: "var(--bg-color-blend-contrast1)",
    "& .fetchingPanel": {
      width: "auto",
      padding: "30px",
      border: "1px solid var(--border-color-ui-contrast1)",
      borderRadius: "4px",
      color: "var(--ft-color-loud)",
      background: "var(--list-bg-hover)"
    }
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "10px",
    padding: "10px",
    height: "100%"
  },
  leftPanel: {
    position: "relative"
  },
  tabbedPanel: {
    display: "grid",
    gridTemplateRows: "auto 1fr"
  },
  tabs: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    borderLeft: "1px solid var(--border-color-ui-contrast2)"
  },
  tabBody: {
    border: "1px solid var(--border-color-ui-contrast2)",
    borderTop: "none",
    background: "var(--bg-color-ui-contrast2)"
  },
  tabBodyInner: {
    padding: "10px"
  },
  filterTypeInput: {
    color: "var(--ft-color-loud)",
    width: "calc(100% - 20px)",
    margin: "10px",
    border: "1px solid transparent",
    paddingLeft: "30px",
    borderRadius: "2px",
    backgroundColor: "var(--bg-color-blend-contrast1)"
  },
  filterType: {
    position: "relative",
    color: "var(--ft-color-loud)",
    backgroundColor: "var(--bg-color-ui-contrast3)",
    border: "1px solid var(--border-color-ui-contrast2)",
    borderLeft: 0,
    borderBottom: 0
  },
  searchIcon: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "var(--ft-color-normal)"
  }
};

@injectStyles(styles)
@observer
class QueryBuilder extends React.Component {
  componentDidMount() {
    this.fetchStructure(true);
  }

  fetchStructure(forceFetch=false) {
    typesStore.fetch(!!forceFetch);
  }

  handleSelectTab = tab => {
    queryBuilderStore.selectTab(tab);
    this.scrolledPanel.scrollToTop();
  }

  handleCloseField = () => {
    queryBuilderStore.closeFieldOptions();
  }

  handleRetryFetchStructure = () => {
    this.fetchStructure(true);
  }

  handleFilterTypes = e => typesStore.setFilterValue(e.target.value);

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {typesStore.isFetching ?
          <div className={classes.structureLoader}>
            <FetchingLoader>
              Fetching api structure...
            </FetchingLoader>
          </div>
          :
          typesStore.fetchError ?
            <BGMessage icon={"ban"}>
              There was a network problem fetching the api structure.<br />
              If the problem persists, please contact the support.<br />
              <small>{typesStore.fetchError}</small><br /><br />
              <Button bsStyle={"primary"} onClick={this.handleRetryFetchStructure}>
                <FontAwesomeIcon icon={"redo-alt"} />&nbsp;&nbsp; Retry
              </Button>
            </BGMessage>
            :
            !typesStore.hasTypes ?
              <BGMessage icon={"tools"}>
                No types available.<br />
                If the problem persists, please contact the support.<br /><br />
                <Button bsStyle={"primary"} onClick={this.handleRetryFetchStructure}>
                  <FontAwesomeIcon icon={"redo-alt"} />&nbsp;&nbsp; Retry
                </Button>
              </BGMessage>
              :
              <div className={classes.layout}>
                <div className={classes.leftPanel}>
                  {queryBuilderStore.hasRootSchema ?
                    <Query />
                    :
                    <BGMessage icon={"tools"}>
                      Please choose a type in the right panel
                    </BGMessage>}
                </div>
                <div className={classes.tabbedPanel}>
                  <div className={classes.tabs}>
                    {queryBuilderStore.hasRootSchema ?
                      <React.Fragment>
                        {queryBuilderStore.currentField && <Tab icon={"cog"} current={queryBuilderStore.currentTab === "fieldOptions"} label={"Field options"} onClose={this.handleCloseField} onClick={this.handleSelectTab.bind(this, "fieldOptions")} />}
                        <Tab icon={"shopping-cart"} current={queryBuilderStore.currentTab === "query"} label={"Query specification"} onClick={this.handleSelectTab.bind(this, "query")} />
                        <Tab icon={"poll-h"} current={queryBuilderStore.currentTab === "result"} label={"Results: JSON View"} onClick={this.handleSelectTab.bind(this, "result")} />
                        <Tab icon={"table"} current={queryBuilderStore.currentTab === "resultTable"} label={"Results: Table View"} onClick={this.handleSelectTab.bind(this, "resultTable")} />
                      </React.Fragment>
                      :
                      <div className={classes.filterType}>
                        <FormControl
                          className={classes.filterTypeInput}
                          type="text"
                          onChange={this.handleFilterTypes}
                          value={typesStore.filterValue}
                          placeholder="Filter types" />
                        <FontAwesomeIcon icon="search" className={classes.searchIcon} />
                      </div>
                    }
                  </div>
                  <div className={classes.tabBody}>
                    <Scrollbars autoHide ref={ref => this.scrolledPanel = ref}>
                      <div className={classes.tabBodyInner}>
                        {!queryBuilderStore.hasRootSchema ?
                          <RootSchemaChoice />
                          : queryBuilderStore.currentTab === "query" ?
                            <QuerySpecification />
                            : queryBuilderStore.currentTab === "result" ?
                              <Result />
                              : queryBuilderStore.currentTab === "resultTable" ?
                                <ResultTable />
                                : queryBuilderStore.currentTab === "fieldOptions" ?
                                  <Options />
                                  : null}
                      </div>
                    </Scrollbars>
                  </div>
                </div>
                {queryBuilderStore.hasRootSchema && (
                  <QueriesDrawer />
                )}
              </div>
        }
      </div>
    );
  }
}

export default QueryBuilder;