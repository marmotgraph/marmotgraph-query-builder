import React from "react";
import queryBuilderStore from "../../Stores/QueryBuilderStore";
import { observer } from "mobx-react";
import { Button, Row, Col } from "react-bootstrap";
import { SingleField } from "hbp-quickfire";
import injectStyles from "react-jss";

const styles = {
  container:{
    color:"var(--ft-color-loud)",
    background:"var(--bg-color-ui-contrast3)",
    margin:"-10px -10px 30px -10px",
    padding:"10px 10px 20px 10px",
    position:"relative",
    "&::after":{
      display:"block",
      content:"''",
      position:"absolute",
      bottom:"-10px",
      left:"50%",
      marginLeft:"-10px",
      width:"20px",
      height:"20px",
      background:"var(--bg-color-ui-contrast3)",
      transform:"rotate(45deg)"
    }
  }
};

const scopeOptions =  [{label: "Released", value: "RELEASED" }, {label: "Curated", value: "INFERRED"}];

@injectStyles(styles)
@observer
export default class ResultOptions extends React.Component{
  handleToggleRunStripVocab = () => {
    queryBuilderStore.toggleRunStripVocab();
  }

  handleChangeSize = (event, field) => {
    queryBuilderStore.setResultSize(field.getValue());
  }

  handleChangeStart = (event, field) => {
    queryBuilderStore.setResultStart(field.getValue());
  }

  handlExecuteQuery = () => {
    queryBuilderStore.executeQuery();
  }

  handleChangeScope = (event, field) => {
    queryBuilderStore.setDatabaseScope(field.getValue());
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.container}>
        <Row>
          <Col xs={6}>
            <SingleField value={queryBuilderStore.resultSize} defaultValue={20} label="Size" type="InputText" inputType="number" onChange={this.handleChangeSize}/>
          </Col>
          <Col xs={6}>
            <SingleField value={queryBuilderStore.resultStart} defaultValue={0} label="Start" type="InputText" inputType="number" onChange={this.handleChangeStart}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SingleField
              key={queryBuilderStore.databaseScope}
              value={queryBuilderStore.databaseScope}
              options={scopeOptions}
              label="Select space"
              type="Select"
              onChange={this.handleChangeScope} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p>Strip vocab : <input type="checkbox" onChange={this.handleToggleRunStripVocab} checked={queryBuilderStore.runStripVocab}/></p>
          </Col>
          <Col xs={12}>
            <Button bsStyle={"primary"} className={"btn-block"} disabled={queryBuilderStore.isQueryEmpty} onClick={this.handlExecuteQuery} title={!queryBuilderStore.isQueryEmpty?"Run it":"The current query specification is not valid/complete. Please select at least one field."}>
              Run it
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}