import React from 'react';
import logo from './logo.svg';
import './DataColumn.css';
import ReactJson from 'react-json-view'
import jq from 'jq-in-the-browser'
import Mustache from 'mustache'

class DataColumn extends React.Component {
  constructor(props) {
    super(props);

    let defaultFormulaType = "javascript";

    this.defaultFormulas = {
      "jq": ".",
      "javascript": "[1, 2, 3, 4]",
      "html": "{{#events}}\n<div>{{sha}}\n<button data-event-id={{sha}}>Like</button></div>\n{{/events}}"
    }

    this.state = {
      query: this.defaultFormulas[defaultFormulaType],
      queryValid: true,
      formulaType: defaultFormulaType,
      context: {}
    };

    this.state.output = props.input
  }

  componentDidMount() {
    this.evaluateQuery(this.state.query, true)
  }

  // we can't update in componentDidUpdate because that's inefficient;
  // we have to manually do our updates spreadsheet style.
  // this is kinda like a prop with limited updates.

  // componentDidUpdate(prevProps) {
    // if(this.props.context !== prevProps.context) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    // {
    //   this.evaluateQuery(this.state.query);
    // }
  // } 

  manualUpdate(newContext) {
    console.log("updating context to", newContext)
    this.setState(
      {context: newContext},
      // pass in updateParent: false here,
      // so that we don't tell the parent our output changed,
      // to avoid infinite looping
      () => this.evaluateQuery(this.state.query, false) 
     )
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
      <div>
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
        </div>
        <div className="json-column">
          {outputDiv}
        </div>
      </div>
    );
  }

  handleQueryChange = (e) => {
    let query = e.target.value
    this.setState({query: query})
    this.evaluateQuery(query, true)
  }

  handleFormulaTypeChange = (e) => {
    this.setState(
      {formulaType: e.target.value, query: this.defaultFormulas[e.target.value]},
      () => this.evaluateQuery(this.state.query, true)
     );
  }

  handleClick = (e) => {
    console.log(e.target);
  }

  httpGet = (url) => {
    return fetch(url).then((r) => r.json())
  }

  processOutput = (output, queryValid, updateParent) => {
    this.setState({
      output: output,
      queryValid: queryValid
    })

    // usually we want to tell the parent that our output has changed,
    // but sometimes we skip that step (to help with janky dep resolution)
    if (updateParent) {
      this.props.handleColOutputChange(this.props.colId, output)
    }
  }

  // Run a query, and update the output
  evaluateQuery = (query, updateParent) => {
    let context = this.state.context;
    let output = this.state.output;
    let queryValid = true;
    const httpGet = this.httpGet;

    try {
      if (this.state.formulaType === "jq") {
        const jqQuery = jq(query)
        output = jqQuery(context)
      }
      else if (this.state.formulaType === "javascript") {
        output = eval(`(${query.replace(/\$/g, "context.")})`)

        // this was used for async http stuff; temporarily remove
        // Promise.all(result).then((resolvedValues) => {
        //   this.processOutput(resolvedValues, queryValid)
        // })
      }
      else if (this.state.formulaType === "html") {
        output = Mustache.render(query, { events: context });
      }
    }
    catch (error) {
      console.log(error)
      queryValid = false;
      // output = null
    }

    this.processOutput(output, queryValid, updateParent)
  }
}

export default DataColumn;
