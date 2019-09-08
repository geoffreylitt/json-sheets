import React from 'react';
import logo from './logo.svg';
import './DataColumn.css';
import ReactJson from 'react-json-view'
import jq from 'jq-in-the-browser'
import Mustache from 'mustache'

class DataColumn extends React.Component {
  constructor(props) {
    super(props);

    this.defaultFormulas = {
      "jq": ".",
      "javascript": "event",
      "html": "{{#events}}\n<div>{{sha}}\n<button data-event-id={{sha}}>Like</button></div>\n{{/events}}"
    }

    this.state = {
      query: ".",
      queryValid: true,
      formulaType: "jq"
    };

    this.state.output = this.props.input
  }

  componentDidMount() {
    this.evaluateQuery(this.state.query)
  }

  componentDidUpdate(prevProps) {
    if(this.props.input !== prevProps.input) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.evaluateQuery(this.state.query);
    }
  } 



  render() {

    let outputDiv;
    let output = this.state.output;

    if (this.state.formulaType === "html") {
      outputDiv = <div onClick={this.handleClick} className="html-content" dangerouslySetInnerHTML={{__html: output}}></div>
    }
    else if (this.state.queryValid && (typeof output === "object" || Array.isArray(output) )) {
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
    else {
      outputDiv = "formula error"
    }

    return (
      <div className="data-column">
        {this.props.colId !== 1 &&
        <div>
          <div className="formula-type-selector">
            Formula type:
            <select value={this.state.formulaType} onChange={this.handleFormulaTypeChange}>
              <option value="jq">jq</option>
              <option value="javascript">javascript</option>
              <option value="html">html</option>
            </select>
          </div>
          <textarea
          className={`formula-editor ${this.state.queryValid ? "valid" : "invalid"}`}
          value={this.state.query}
          rows={5}
          style={{'font-family': 'Courier New, Courier, serif'}}
          onChange={this.handleQueryChange}/>
        </div>}
        {this.props.colId === 1 &&
        <div>
          Input data (from Github API)
        </div>}
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

  handleFormulaTypeChange = (e) => {
    this.setState(
      {formulaType: e.target.value, query: this.defaultFormulas[e.target.value]},
      () => this.evaluateQuery(this.state.query)
     );
  }

  handleClick = (e) => {
    console.log(e.target);
  }

  httpGet = (url) => {
    return fetch(url).then((r) => r.json())
  }

  processOutput = (output, queryValid) => {
    this.setState({
      output: output,
      queryValid: queryValid
    })

    this.props.handleColOutputChange(this.props.colId, output)
  }

  // Run a query on the input to this column,
  // and update the output
  evaluateQuery = (query) => {
    let input = this.props.input;
    let output = this.state.output;
    let queryValid = true;
    const httpGet = this.httpGet;

    try {
      if (this.state.formulaType === "jq") {
        const jqQuery = jq(query)
        output = jqQuery(input)
      }
      else if (this.state.formulaType === "javascript") {
        let result = input.map((event) => {
          return eval(`(${query})`)
        })

        Promise.all(result).then((resolvedValues) => {
          this.processOutput(resolvedValues, queryValid)
        })
      }
      else if (this.state.formulaType === "html") {
        output = Mustache.render(query, { events: input });
      }
    }
    catch (error) {
      console.log(error)
      queryValid = false;
      // output = null
    }

    this.processOutput(output, queryValid)
  }
}

export default DataColumn;
