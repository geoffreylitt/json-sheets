import React from 'react';
import logo from './logo.svg';
import CellEditor from './CellEditor';
import DataCell from './DataCell';
import './App.css';
import './todo-mvc.css';
import uuid from 'uuid/v1'

// for query eval
import { transform } from '@babel/standalone'
import _ from 'lodash'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.appDiv = React.createRef();

    this.react = React

    // map of event type to handler function
    this.eventHandlers = {
      input: this.handleEvent,
      click: this.handleEvent,
      keydown: this.handleEvent
    }

    this.state = {
      cells: [
        {
          id: 1,
          name: "UI",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          query: 
`<div>
<section className="todoapp">
  <header>
    <h1>todos</h1>
    {$inputBox}
  </header>
  {$todos.length > 0 && $listView}
  {$todos.length > 0 && $footer}
</section>
</div>`,
          output: {}
        },
        { id: "events", name: "events", visible: false, ref: React.createRef(), children: new Set(), query: "$events", output: "" },
        { 
          id: 2,
          name: "newTodo",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          query:
`{ text: $events.reduce((_, e) => {
  // update text when user types in box
  if (e.type === "input" && e.target.tag === "newTodoBox") { return e.value }
  
  // clear input box on enter press
  // (todo: can we use enterPresses here somehow? hmm...)
  else if (e.type === "keydown" && 
            e.keyCode === 13 && e.value){
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
`// since we already defined enterPresses,
// we can just reduce over it here
$events
  .reduce((list, e) => {
 	if (e.type === "keydown" && e.keyCode === 13) {
      return list.concat({
        id: e.target["data-todo-id"],
        text: e.value,
      	completed: false
      })
    } else if (e.type === "click"
               && e.target.tag === "toggleComplete") {
        return list.map(t => {
          if (e.target["data-todo-id"] === t.id) {
            return { ...t, completed: e.checked }
          }
          else {
            return t
          }
        })
    } else if (e.type === "click" && e.target.tag === "clearCompleted") { 
      return list.map(t => {
      	if (t.completed) { return null }
        else { return t }
      }).filter(t => t)
	} else {
      return list
   	}
  }, [])`
          },
          { id: 4, name: "inputBox", visible: true, ref: React.createRef(), children: new Set(), query: 
`<div>
<input
  value={$newTodo.text}
  className="new-todo"
  data-todo-id={genUUID()}
  placeholder="What needs to be done?"
  tag="newTodoBox"
  autofocus />
</div>`
          },
          { id: 5, name: "listView", visible: true, ref: React.createRef(), children: new Set(), query: 
`<section className="main">
<input id="toggle-all" className="toggle-all" type="checkbox" />
<label for="toggle-all">Mark all as complete</label>
<ul className="todo-list">
  {$filteredTodos.map(todo => <li className={todo.completed && 'completed'}>
  <div className="view">
        <input tag="toggleComplete" data-todo-id={todo.id} className="toggle" type="checkbox" checked={todo.completed} />
        <label>{todo.text}</label>
        <button className="destroy"></button>
      </div>
</li>)}
</ul>
</section>`
          },
          { id: 6, name: "footer", visible: true, ref: React.createRef(), children: new Set(), query: 
`<footer className="footer">
<span className="todo-count"><strong>{$filteredTodos.length}</strong> item left</span>
<ul className="filters">
  <li>
    <button tag="filter.all" className={$filter.filter === "all" && 'selected'}>All</button>
  </li>
  <li>
    <button tag="filter.active" className={$filter.filter === "active" && 'selected'}>Active</button>
  </li>
  <li>
    <button tag="filter.completed" className={$filter.filter === "completed" && 'selected'}>Completed</button>
  </li>
</ul>
<button tag="clearCompleted" className="clear-completed">Clear completed</button>
</footer>`
          },
          { id: 8, name: "filteredTodos", visible: true, ref: React.createRef(), children: new Set(), query:
`$todos.filter(t => {
  if ($filter.filter === "active") { return !t.completed }
  else if ($filter.filter === "completed") { return t.completed }
  else { return true }
})` },
          { id: 9, name: "filter", visible: true, ref: React.createRef(), children: new Set(), query: 
`{filter: $events.reduce((value, e) => {
  if (e.type === "click" && e.target.tag === "filter.all") {
    return "all"
  }
  else if (e.type === "click" && e.target.tag === "filter.active") {
    return "active"
  }
  else if (e.type === "click" && e.target.tag === "filter.completed") {
    return "completed"
  }
  else { return value }
}, "all")}`
          },
          { id: 10, name: "c10", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 11, name: "c10", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 12, name: "c10", visible: true, ref: React.createRef(), children: new Set(), query: "" },
          { id: 13, name: "c10", visible: true, ref: React.createRef(), children: new Set(), query: "" }
      ],
      events: [],
      activeCellId: 2,
      pinnedCellId: 1
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

  handleEvent = (e) => {
    let metadata = 
      e.target &&
      e.target.getAttribute("metadata")

    // todo: switch to json or rich objects here?
    // metadata = JSON.parse(metadata)

    // here we subset event attributes;
    // 1) to avoid trying to display recursive DOM structures as JSON,
    // 2) to make them more concise for display.
    // This is pretty restrictive though.
    // TODO:
    // * keep all the fields around
    // * do a subsetting on display

    // creates an object like { class: "css-class", value: "attr-value" }
    let targetAttributes =
      Array.prototype.slice.call(e.target.attributes) // get the attributes as an array
      .reduce((acc, attr) => { acc[attr.name] = attr.value; return acc }, {}) // assemble into an object

    let eventForDisplay = {
      type: e.type,
      target: targetAttributes,
      metadata: metadata,
      value: e.target.value,
      keyCode: e.keyCode,
      checked: e.target.checked
    }

    // update the events list in the app state,
    // and also update it on the events column
    // (todo: do we need the global events list?
    // can we just use the events column?)
    this.setState((state, _) => { 
      let events = state.events.slice(0).concat(eventForDisplay)
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
    this.handleEvent(e)
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
    const genUUID = uuid

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
    const dataCells = this.state.cells.filter(e => e.visible).map(c => {
      return <DataCell
        key={c.id}
        cell={c}
        pinned={this.state.pinnedCellId === c.id}
        active={this.state.activeCellId === c.id}
        setAsActiveCell={this.setAsActiveCell}
        eventHandlers={this.eventHandlers}
        expanded={false}
        handleColNameChange={this.handleColNameChange} />
    })

    const activeCell = this.state.cells.find(c => c.id === this.state.activeCellId)
    const pinnedCell = this.state.cells.find(c => c.id === this.state.pinnedCellId)

    return (
      <div>
        <div className="app" ref={this.appDiv}>
          <div class="pinned app-section">
            <CellEditor
                cell={pinnedCell}
                handleQueryChange={this.handleQueryChange}
                handleNameChange={this.handleNameChange}
                eventHandlers={this.eventHandlers}
                /> 
          </div>
          <div className="editor app-section">
            <CellEditor
              cell={activeCell}
              handleQueryChange={this.handleQueryChange}
              handleNameChange={this.handleNameChange}
                eventHandlers={this.eventHandlers}
              />
          </div>
          <div className="output-cells app-section">
            {dataCells}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
