import React from 'react';
import logo from './logo.svg';
import DataColumn from './DataColumn';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.appDiv = React.createRef();

    this.state = {
      columns: [
        { id: "events", name: "events", visible: false, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "[]" },
        {
          id: 1,
          name: "UI",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          formulaType: "html",
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
</div>`
        },
        { 
          id: 2,
          name: "newTodo",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          formulaType: "javascript",
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
}, "")}` 
        },
        { id: 3,
          name: "todos",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          formulaType: "html",
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
          { id: 4, name: "c4", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 5, name: "c5", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 6, name: "c6", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 7, name: "c7", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 8, name: "c8", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 9, name: "c9", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 10, name: "c10", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" }
      ],
      context: {},
      events: []
    }
  }

  handleColOutputChange = (colId, output, deps) => {
    let updatedCol = this.state.columns.find(c => c.id === colId)
    this.setState(state => {
      let columns = state.columns.map ((c) => {
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
      columns.forEach(c => {
        context[c.name] = c.output
      })

      return {
        columns: columns,
        context: context
      }
    },
    () => {
      // update the context on this cell itself (but don't re-evaluate!)
      updatedCol.ref.current.manualUpdate(this.state.context, false)

      // update context on child cells, and propagate changes forward
      this.state.columns.filter(c => updatedCol.children.has(c.id)).forEach(c => {
        console.log(updatedCol.name, "-> trigger ->", c.name)
        c.ref.current && c.ref.current.manualUpdate(this.state.context, true)
      })
    }
    )
  }

  handleColNameChange = (colId, name) => {
    this.setState(state => {
      let columns = state.columns.map ((c) => {
        if (c.id === colId) {
          return { ...c, name: name }
        } else { return c; }
      })

      let context = {}
      columns.forEach(c => {
        context[c.name] = c.output  
      })

      return {
        columns: columns,
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

  // a utility function to help with updating all columns.
  // runs a manual update on a given column;
  // once that finishes up, use a callback to recursively
  // run updates on all the remaining columns.
  updateColumnAndSuccessors = (c) => {
    c.ref.current && c.ref.current.manualUpdate(this.state.context, true, () => {
      let nextCol = this.state.columns.find(next => next.id === c.id + 1)
      if (nextCol) {
        this.updateColumnAndSuccessors(nextCol)
      }
    })
  }

  componentDidMount() {
    // cycle through all the columns once and trigger updates,
    // to correctly initialize the state of the sheet
    this.updateColumnAndSuccessors(this.state.columns[0])
  }

  render() {
    let dataColumns = this.state.columns.map((c) => {
      return <div className={"data-column " + (c.visible ? '' : 'hidden')}>
        <DataColumn
        key={c.id}
        colId={c.id}
        visible={c.visible} // todo: actually use this in the datacol
        handleColOutputChange={this.handleColOutputChange}
        handleColNameChange={this.handleColNameChange}
        eventHandlers={{ click: this.addNativeEventToEventsColumn, input: this.addNativeEventToEventsColumn }}
        ref={c.ref}
        formulaType={c.formulaType}
        query={c.query}
        name={c.name}
        />
      </div>
    })

    return (
      <div>
        <div className="app" ref={this.appDiv}>
          {dataColumns}
        </div>
      </div>
    );
  }
}

export default App;
