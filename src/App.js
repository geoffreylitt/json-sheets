import React from 'react';
import logo from './logo.svg';
import DataColumn from './DataColumn';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { id: "events", name: "events", visible: false, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "[]" },
        { id: 1, name: "tweets", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "getTwitterData()" },
        { 
          id: 2,
          name: "tweetsForUI",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          formulaType: "javascript",
          query: `
$tweets.map(t => {
  return {
    text: t.text,
    user: t.user.name,
    id: t.id
  }
})
      ` },
        { id: 3,
          name: "UI",
          visible: true,
          ref: React.createRef(),
          children: new Set(),
          formulaType: "html",
          query: `
<h1>Tweet Stream</h1>
{{#$tweetsForUI}}
  <div class="tweet">
    <div class="author">
      {{user}}
    </div>
    {{text}}
    <button metadata={{id}}>Like</button>
  </div>
{{/$tweetsForUI}}
          ` },
          { id: 4, name: "c4", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 5, name: "c5", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 6, name: "c6", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 7, name: "c7", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" },
          { id: 8, name: "c8", visible: true, ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "" }
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
          console.log(c.name, "-> register child ->", updatedCol.name, ", new children: ", newChildren)
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

  addEventToEventsColumn = (e) => {
    // Important note:
    // we can't push to the events array in place--
    // we have to make a copy,
    // in order to trigger re-evaluation of the events array
    // in other places (like the ReactJSON component)
    e.persist()

    let metadata = 
      e.nativeEvent.target &&
      e.nativeEvent.target.getAttribute("metadata")
      // JSON.parse(e.nativeEvent.target.getAttribute("metadata"))

    let nativeEvent = {
      type: e.nativeEvent.type,
      // References to DOM objects get weird when we try to JSON output them...
      // todo: keep DOM nodes around longer, just don't print them
      // target: e.nativeEvent.target.attributes,
      // srcElement: e.nativeEvent.srcElement,
      metadata: metadata,
      x: e.nativeEvent.x,
      y: e.nativeEvent.y

    }
    // console.log("processing", e.nativeEvent)
    this.state.events = this.state.events.concat(nativeEvent)
    this.handleColOutputChange("events", this.state.events, [])
  }

  render() {
    let dataColumns = this.state.columns.map((c) => {
      return <div className={"data-column " + (c.visible ? '' : 'hidden')}>
        <input value={c.name} onChange={(e) => this.handleColNameChange(c.id, e.target.value)}/>
        <DataColumn
        key={c.id}
        colId={c.id}
        visible={c.visible} // todo: actually use this in the datacol
        handleColOutputChange={this.handleColOutputChange}
        ref={c.ref}
        formulaType={c.formulaType}
        query={c.query}
        />
      </div>
    })

    return (
      <div>
        <div className="app" onClick={this.addEventToEventsColumn}>
          {dataColumns}
        </div>
      </div>
    );
  }
}

export default App;
