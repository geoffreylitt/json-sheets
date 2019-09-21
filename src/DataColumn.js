import React from 'react';
import logo from './logo.svg';
import './DataColumn.css';
import CodeMirror from 'react-codemirror'
import ReactJson from 'react-json-view'
import twitterData from './twitter'

import { transform } from '@babel/standalone'

// for formulas
import momentLib from 'moment'
import lodash from 'lodash'
import { compile } from 'handlebars';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/mdn-like.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');


class DataColumn extends React.Component {
  constructor(props) {
    super(props);

    this.outputRef = React.createRef()

    this.react = React

    this.state = {
      query: props.query,
      queryValid: true,
      context: {}
    };
  }

  componentDidMount() {
    this.evaluateQuery(this.state.query, true)

    lodash.forEach(this.props.eventHandlers, (handler, eType) => {
      this.outputRef.current.addEventListener(eType, handler)
    })
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

    // if we got back a react element, render it out as HTML
    if (this.isReactElement(output)) {
      outputDiv = output
    }
    // otherwise, render as JSON
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
          <input className="column-name" value={this.props.name} onChange={(e) => this.props.handleColNameChange(this.props.colId, e.target.value)}/>
          <CodeMirror
            className={`formula-editor ${this.state.queryValid ? "valid" : "invalid"}`}
            value={this.state.query}
            onChange={this.handleQueryChange}
            options={{ mode: "javascript", theme: "mdn-like" }}
            />
        </div>
        <div className="json-column" ref={this.outputRef}>
          {outputDiv}
        </div>
      </div>
    );
  }

  handleQueryChange = (query) => {
    this.setState({query: query})
    this.evaluateQuery(query, true)
  }

  httpGet = (url) => {
    return fetch(url).then((r) => r.json())
  }

  // detects whether given output is a react element or not
  // todo: use this to dynamically output either HTML or JS,
  // depending on the case
  isReactElement = (obj) => {
    return !!(obj) && !!(obj.$$typeof) && obj.$$typeof.toString() === "Symbol(react.element)"
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

    // why do we need to define this here??? does babel cut out unused lib references maybe?
    const moment = momentLib
    const _ = lodash
    const httpGet = this.httpGet;
    const React = this.react
    const getTwitterData = () => { return twitterData }

    let queryRefs = query.match(/\$[a-zA-Z0-9]+/g)
    if (queryRefs) {
      deps = queryRefs.map(r => r.substring(1))
    } else {
      deps = []
    }

    try {
      // Time to compile the JS expression the user gave!
      let compiledQuery = query
      
      // sub in our $ spreadsheet references
      compiledQuery = compiledQuery.replace(/\$/g, "this.state.context.")
      
      // wrap in parens, so JSON expressions eval correctly
      compiledQuery = `(${compiledQuery})`

      // also run it through Babel to compile JSX
      compiledQuery = transform(compiledQuery, { presets: ['react'] }).code

      // console.log("compiled query: ", compiledQuery)
      output = eval(compiledQuery)
      // console.log("output: ", output)
    }
    catch (error) {
      // swallow syntax errors, those are common as we type
      // but we want to see other types of errors
      if (!(error instanceof SyntaxError)) {
        console.error(error)
      }
      queryValid = false;
    }

    this.processOutput(output, deps, queryValid, updateParent)
  }
}

export default DataColumn;
