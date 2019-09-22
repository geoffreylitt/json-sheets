import React from 'react';
import ReactDOMServer from 'react-dom/server';
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
require('codemirror/mode/jsx/jsx');


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

  // pass in the new context of all the data from the environment,
  // and re-evaluate this query in that context.
  // if propagate is true, we tell the environment that we re-eval'd
  // which will trigger more updates.
  // if false, we don't tell the env, and stop here,
  // which helps avoid infinite loops.
  manualUpdate(newContext, propagate, callback) {
    this.setState(
      {context: newContext},
      () => {
        this.evaluateQuery(this.state.query, propagate)
        if(callback) { callback() }
      }
     )
  }

  render() {
    let outputDiv;
    let output = this.state.output;

    // if we're outputting a list of react elements,
    // wrap in a div for rendering so that we can 
    // see it as HTML rather than JSON

    if (Array.isArray(output) && this.isReactElement(output[0])) {
      output = <div>{output}</div>
    }

    // if output is a react element, render as HTML
    if (this.isReactElement(output)) {
      
      // Often, the React element tree provided by the user
      // will be unsafe to render because it's incomplete.
      // To avoid crashing the entire environment in these cases,
      // we first try rendering the React elements to a string
      // using the ReactDOMServer library, and see if that crashes.
      // If not, then we're safe to actually use the elements.
      try{
        let rendered = ReactDOMServer.renderToString(output)
        outputDiv = output
      }
      catch(error) {
        // it's not that helpful to get this error message
        // console.error(error)
      }
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
            options={{ mode: "jsx", theme: "mdn-like" }}
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

  // Run a query, and update the output
  evaluateQuery = (query, updateParent) => {
    let context = this.state.context;
    let output = this.state.output;
    let queryValid = true;
    let deps;

    // for some reason, in order for eval to have access to these, we need to define here.
    // hypothesis is that babel removes the "unused" variables.
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

      output = eval(compiledQuery)
    }
    catch (error) {
      // swallow syntax errors, those are common as we type
      // but we want to see other types of errors
      if (!(error instanceof SyntaxError)) {
        // console.error(error)
      }
      queryValid = false;
    }

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
}

export default DataColumn;
