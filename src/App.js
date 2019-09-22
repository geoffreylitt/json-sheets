import React from 'react';
import logo from './logo.svg';
import CellEditor from './CellEditor';
import DataCell from './DataCell';
import './App.css';

// for query eval
import { transform } from '@babel/standalone'
import _ from 'lodash'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.appDiv = React.createRef();

    this.react = React

    this.state = {
      cells: [
        { id: "events", name: "events", visible: false, ref: React.createRef(), children: new Set(), query: "[]", output: "" },
        {
          id: 1,
          name: "UI",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          query: 
`<div>
  New todo:
  <input value={$newTodo.text || ""} />
  <button
    value={$newTodo.text}
    metadata="addBtn">add</button>
  <div>
    {$todos.map (t => {
      return <div>{t.text}</div>
    })}
  </div>
</div>`,
          output: {}
        },
        { 
          id: 2,
          name: "newTodo",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          query:
`{ text: $events.reduce((_, e) => {
  // update text when user types in box
  if (e.type === "input") { return e.value }
  
  // clear input box when "add" is clicked
  else if (e.type === "click" && 
            e.metadata === "addBtn"){
    return ""
  }
  // ignore other events
  else  { return _ }
}, "")}` ,
          output: {}
        },
        { id: 3,
          name: "todos",
          visible: true,
          ref: React.createRef(),
          children: new Set(),

          output: {},
          query: 
`$events
  .reduce((list, e) => {
    // When "add" is clicked, add todo 
    if (e.type === "click" &&
        e.metadata === "addBtn"){
      return list.concat({text: e.value})
    }
    else  { return list }
  }, [])`
          },
          { id: 4, name: "c4", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 5, name: "c5", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 6, name: "c6", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 7, name: "c7", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 8, name: "c8", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 9, name: "c9", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 10, name: "c10", visible: true, ref: React.createRef(), children: new Set(), query: "" }
      ],
      events: [],
      activeCellId: 1
    }
  }

  handleColNameChange = (colId, name) => {
    this.setState(state => {
      let cells = state.cells.map ((c) => {
        if (c.id === colId) {
          return { ...c, name: name }
        } else { return c; }
      })

      let context = {}
      cells.forEach(c => {
        context[c.name] = c.output  
      })

      return {
        cells: cells,
        context: context
      }
    })
  }

  addNativeEventToEventsColumn = (e) => {
    let metadata = 
      e.target &&
      e.target.getAttribute("metadata")

    // todo: switch to json or rich objects here?
    // metadata = JSON.parse(metadata)

    let nativeEvent = {
      type: e.type,
      // References to DOM objects get weird when we try to JSON output them...
      // todo: keep DOM nodes around longer, just don't print them
      // target: e.nativeEvent.target.attributes,
      // srcElement: e.nativeEvent.srcElement,
      metadata: metadata,
      value: e.target.value,
      x: e.x,
      y: e.y

    }

    // update the events list in the app state,
    // and also update it on the events column
    // (todo: do we need the global events list?
    // can we just use the events column?)
    this.setState((state, _) => { 
      let events = state.events.slice(0).concat(nativeEvent)
      let cells = state.cells.map ((c) => {
        if (c.id === "events") {
          return { ...c, output: {a: 1} }
        } else { return c; }
      })
      return { events: events, cells: cells }
    }, () => {
      this.evaluateCell("events")
    })
  }

  handleChange = (e) => {
    this.addNativeEventToEventsColumn(e)
  }

  handleQueryChange = (cellId, query) => {
    this.setState(state => {
      let cells = state.cells.map ((c) => {
        if (c.id === cellId) {
          return { ...c, query: query }
        } else { return c; }
      })

      return {
        cells: cells
      }
    }, () => {
      this.evaluateCell(cellId)
    })
  }

  evaluateCell = (cellId) => {
    let cell = this.state.cells.find(c => c.id === cellId)
    let result = this.evaluateQuery(cell.query, true)

    this.setState(state => {
      let cells = state.cells.map ((c) => {
        if (c.id === cellId) {
          return { ...c, output: result.output, deps: result.deps }
        } else if (result.deps.includes(c.name)) {
          let newChildren = c.children.add(cellId)
          // console.log(c.name, "-> register child ->", updatedCol.name, ", new children: ", newChildren)
          return { ...c, children: newChildren }
        } else { return c; }
      })

      return {
        cells: cells
      }
    }, () => {
      // evaluate child cells
      cell.children.forEach(child => {
        cell = this.state.cells.find(c => c.id === child)
        if (cell) {
          this.evaluateCell(cell.id)
        }
      })
    })
  }

  evaluateQuery = (query, updateParent) => {
    let output
    let queryValid = true;
    let deps;
    let context  = _.chain(this.state.cells).keyBy(c => c.name).mapValues(c => c.output).value()
    context = Object.assign(context, { events: this.state.events })
    let React = this.react

    // for some reason, in order for eval to have access to these, we need to define here.
    // hypothesis is that babel removes the "unused" variables.
    const lodash = _

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
      compiledQuery = compiledQuery.replace(/\$/g, "context.")
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
        console.error(error)
      }
      queryValid = false;
    }

    return {
      output: output,
      queryValid: queryValid,
      deps: deps
    }
  }

  componentDidMount() {
    // start off by evaluating all our cells
    this.state.cells.forEach(c => {
      this.evaluateCell(c.id)
    })
  }

  setAsActiveCell = (cellId) => {
    this.setState({activeCellId: cellId})
  }

  render() {
    let dataCells = this.state.cells.filter(c => c.name !== "events").map(c => {
      return <DataCell
        key={c.id}
        cell={c}
        active={this.state.activeCellId === c.id}
        setAsActiveCell={this.setAsActiveCell}
        eventHandlers={{ click: this.addNativeEventToEventsColumn, input: this.addNativeEventToEventsColumn }}
        expanded={false}
        handleColNameChange={this.handleColNameChange} />
    })

    let activeCell = this.state.cells.find(c => c.id === this.state.activeCellId)

    return (
      <div>
        <div className="app" ref={this.appDiv}>
          <div className="editor">
            <CellEditor
              cell={activeCell}
              handleQueryChange={this.handleQueryChange}
              handleNameChange={this.handleNameChange}
              eventHandlers={{ click: this.addNativeEventToEventsColumn, input: this.addNativeEventToEventsColumn }}
              />
          </div>
          <div className="output-cells">
            {dataCells}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
