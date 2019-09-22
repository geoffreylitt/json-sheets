import React from 'react';
import logo from './logo.svg';
import CellEditor from './CellEditor';
import DataCell from './DataCell';
import './App.css';

// for query eval
import { transform } from '@babel/standalone'
import lodash from 'lodash'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.appDiv = React.createRef();

    this.state = {
      cells: [
        { id: "events", name: "events", visible: false, ref: React.createRef(), children: new Set(), query: "[]" },
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
      context: {},
      events: [],
      activeCellId: 1
    }
  }

  handleColOutputChange = (colId, output, deps) => {
    let updatedCol = this.state.cells.find(c => c.id === colId)
    this.setState(state => {
      let cells = state.cells.map ((c) => {
        if (c === updatedCol) {
          // this is the column that got updated;
          // update output and dependencies
          return { ...c, output: output, deps: deps }
        } else if (deps.includes(c.name)) { 
          // this column should now have the updated column
          // as a child to update when it updates
          let newChildren = c.children.add(updatedCol.id)
          // console.log(c.name, "-> register child ->", updatedCol.name, ", new children: ", newChildren)
          return { ...c, children: newChildren }
        } else {
          return c
        }
      })

      let context = {}
      cells.forEach(c => {
        context[c.name] = c.output
      })

      return {
        cells: cells,
        context: context
      }
    },
    () => {
      // update the context on this cell itself (but don't re-evaluate!)
      updatedCol.ref.current.manualUpdate(this.state.context, false)

      // update context on child cells, and propagate changes forward
      this.state.cells.filter(c => updatedCol.children.has(c.id)).forEach(c => {
        console.log(updatedCol.name, "-> trigger ->", c.name)
        c.ref.current && c.ref.current.manualUpdate(this.state.context, true)
      })
    }
    )
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

  // React doesn't use actual DOM events;
  // this is a wrapper to unwrap React events 
  // and then add them to the magic $events variable
  // (note: this is no longer used since we stopped using react event handlers
  // to respond to DOM events)
  // addSyntheticEventToEventsColumn = (e) => {
  //   e.persist()
  //   this.addNativeEventToEventsColumn(e.nativeEvent)
  // }

  addNativeEventToEventsColumn = (e) => {
    let metadata = 
      e.target &&
      e.target.getAttribute("metadata")

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

    // Important note:
    // we can't push to the events array in place--
    // we have to make a copy,
    // in order to trigger re-evaluation of the events array
    // in other places (like the ReactJSON component)
    // console.log("processing", e.nativeEvent)
    this.state.events = this.state.events.concat(nativeEvent)
    this.handleColOutputChange("events", this.state.events, [])
  }

  handleChange = (e) => {
    this.addNativeEventToEventsColumn(e)
  }

  // a utility function to help with updating all cells.
  // runs a manual update on a given column;
  // once that finishes up, use a callback to recursively
  // run updates on all the remaining cells.
  updateColumnAndSuccessors = (c) => {
    c.ref.current && c.ref.current.manualUpdate(this.state.context, true, () => {
      let nextCol = this.state.cells.find(next => next.id === c.id + 1)
      if (nextCol) {
        this.updateColumnAndSuccessors(nextCol)
      }
    })
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
    })
  }

  evaluateQuery = (query, updateParent) => {
    let context = this.state.context;
    let output = this.state.output;
    let queryValid = true;
    let deps;

    // for some reason, in order for eval to have access to these, we need to define here.
    // hypothesis is that babel removes the "unused" variables.
    const _ = lodash

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

  componentDidMount() {
    // cycle through all the cells once and trigger updates,
    // to correctly initialize the state of the sheet
    this.updateColumnAndSuccessors(this.state.cells[0])
  }

  setAsActiveCell = (cellId) => {
    this.setState({activeCellId: cellId})
  }

  render() {
    let dataCells = this.state.cells.map(c => {
      return <DataCell
        cellId={c.id}
        name={c.name}
        output={c.output}
        active={this.state.activeCellId === c.id}
        setAsActiveCell={this.setAsActiveCell}
        handleColNameChange={this.handleColNameChange} />
    })

    let activeCell = this.state.cells.find(c => c.id === this.state.activeCellId)

    console.log("active cell: ", activeCell)

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
