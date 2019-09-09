import React from 'react';
import logo from './logo.svg';
import './DataColumn.css';
import ReactJson from 'react-json-view'
import jq from 'jq-in-the-browser'
import Mustache from 'mustache'
import twitterData from './twitter'
import momentLib from 'moment'

class DataColumn extends React.Component {
  constructor(props) {
    super(props);

    let defaultFormulaType = "javascript";

    this.defaultFormulas = {
      "jq": ".",
      "javascript": "",
      "html": ""
    }

    this.state = {
      query: props.query,
      queryValid: true,
      formulaType: props.formulaType,
      context: {}
    };
  }

  componentDidMount() {
    this.evaluateQuery(this.state.query, true)
  }



  // we usually can't update in componentDidUpdate because React
  // doesn't understand which cells depend on which.
  // we need to manually manage spreadsheet-style deps
  // componentDidUpdate(prevProps) {
  //   console.log("updating props")
  //   if(this.props.input !== prevProps.input) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
  //   {
  //     this.evaluateQuery(this.state.query, true);
  //   }
  // } 

  // pass in the new context of all the data from the environment,
  // and re-evaluate this query in that context.
  // if propagate is true, we tell the environment that we re-eval'd
  // which will trigger more updates.
  // if false, we don't tell the env, and stop here,
  // which helps avoid infinite loops.
  manualUpdate(newContext, propagate) {
    this.setState(
      {context: newContext},
      () => this.evaluateQuery(this.state.query, propagate) 
     )
  }


  render() {

    let outputDiv;
    let output = this.state.output;

    if (this.state.formulaType === "html") {
      outputDiv = <div onClick={this.handleClick} className="html-content" dangerouslySetInnerHTML={{__html: output}}></div>
    }
      else if (this.state.queryValid) {
      outputDiv = <ReactJson
        src={output}
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

  processOutput = (output, deps, queryValid, updateParent) => {
    this.setState({
      output: output,
      queryValid: queryValid
    })

    // usually we want to tell the parent that our output has changed,
    // but sometimes we skip that step (to help with janky dep resolution)
    if (updateParent) {
      this.props.handleColOutputChange(this.props.colId, output, deps)
    }
  }

  // Run a query, and update the output
  evaluateQuery = (query, updateParent) => {
    let context = this.state.context;
    let output = this.state.output;
    let queryValid = true;
    let deps;

    let queryRefs = query.match(/\$[a-zA-Z0-9]*/g)
    if (queryRefs) {
      deps = queryRefs.map(r => r.substring(1))
    } else {
      deps = []
    }
    const httpGet = this.httpGet;

    try {
      if (this.state.formulaType === "jq") {
        const jqQuery = jq(query)
        output = jqQuery(context)
      }
      else if (this.state.formulaType === "javascript") {
        let getTwitterData = () => { return twitterData }
        let formatDate = (date) => { return  }
        let moment = momentLib

        output = eval(`(${query.replace(/\$/g, "context.")})`)

        // this was used for async http stuff; temporarily remove
        // Promise.all(result).then((resolvedValues) => {
        //   this.processOutput(resolvedValues, queryValid)
        // })
      }
      else if (this.state.formulaType === "html") {
        output = Mustache.render(query.replace(/\$/g, "context."), { context: context });
      }
    }
    catch (error) {
      console.error(error)
      queryValid = false;
    }

    this.processOutput(output, deps, queryValid, updateParent)
  }
}

export default DataColumn;
