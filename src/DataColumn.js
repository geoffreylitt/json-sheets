import React from 'react';
import logo from './logo.svg';
import './DataColumn.css';
import ReactJson from 'react-json-view'

const jq = require('jq-web')

class DataColumn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ".[]",
      queryValid: true
    };

    this.state.output = this.props.input
  }

  componentDidUpdate(prevProps) {
    if(this.props.input !== prevProps.input) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.evaluateQuery(this.state.query);
    }
  } 

  render() {

    let outputDiv;

    if (!this.state.queryValid) {
      outputDiv = "formula error"
    }
    else {
      outputDiv = <ReactJson
        src={this.state.output}
        displayDataTypes={false}
        displayObjectSize={false}
        name={false}
        displayObjectSize={false}
        indentWidth={2}
        collapsed={2}
        collapseStringsAfterLength={15}
      />
    }

    return (
      <div className="data-column">
        {this.props.colId !== 1 &&
        <textarea
          className={`formula-editor ${this.state.queryValid ? "valid" : "invalid"}`}
        value={this.state.query} onChange={this.handleQueryChange}/> }
        <div className="json-column">
          {outputDiv}
        </div>
      </div>
    );
  }

  handleQueryChange = (e) => {
    let query = e.target.value
    this.setState({query: query})
    this.evaluateQuery(query)
  }

  evaluateQuery = (query) => {
    let output = this.state.output;
    let queryValid = true;

    try {
      output = jq.json(this.props.input, query)
    }
    catch (error) {
      queryValid = false;
      output = null
    }

    this.setState({
      output: output,
      queryValid: queryValid
    })

    this.props.handleColOutputChange(this.props.colId, output)
  }
}

export default DataColumn;
