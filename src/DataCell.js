import React from 'react';
import './DataCell.css';
import ReactJson from 'react-json-view'
import lodash from 'lodash'
import ReactDOMServer from 'react-dom/server';
import classNames from 'classnames';

// A read-only preview of output for a cell

class DataCell extends React.Component {
  constructor(props) {
    super(props);

    this.outputRef = React.createRef()

    this.react = React
  }

  componentDidMount() {
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
    let outputDiv
    let output = this.props.cell.output

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
    else {
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

    return (
      <div className={classNames({'active': this.props.active, 'data-cell': true})} onClick={() => this.props.setAsActiveCell(this.props.cell.id)}>
        { !this.props.expanded && <input className="column-name" value={this.props.cell.name} onChange={(e) => this.props.handleColNameChange(this.props.cellId, e.target.value)}/>}
        <div className={classNames({'data-preview': true, 'expanded': this.props.expanded})} ref={this.outputRef}>
          {outputDiv}
        </div>
      </div>
    );
  }

  // detects whether given output is a react element or not
  // todo: use this to dynamically output either HTML or JS,
  // depending on the case
  isReactElement = (obj) => {
    return !!(obj) && !!(obj.$$typeof) && obj.$$typeof.toString() === "Symbol(react.element)"
  }
}

export default DataCell;
