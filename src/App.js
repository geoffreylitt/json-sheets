import React from 'react';
import logo from './logo.svg';
import DataColumn from './DataColumn';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { id: "events", name: "events", ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "[]" },
        { id: 1, name: "tweets", ref: React.createRef(), children: new Set(), formulaType: "javascript", query: "getTwitterData()" },
        { 
          id: 2,
          name: "tweetsForUI",
          ref: React.createRef(),
          children: new Set(),
          formulaType: "javascript",
          query: `
$tweets.map(t => {
  return {
    text: t.text,
    user: t.user.name
  }
})
      ` },
        { id: 3,
          name: "UI",
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
  </div>
{{/$tweetsForUI}}
          ` }
      ],
      context: {},
      events: ["test"]
    }
  }

  handleColOutputChange = (colId, output, deps) => {
    let updatedCol = this.state.columns.find(c => c.id === colId)
    console.log("updating", updatedCol, "output", output)
    this.setState(state => {
      let columns = state.columns.map ((c) => {
        if (c === updatedCol) {
          // this is the column that got updated;
          // update output and dependencies
          return { ...c, output: output, deps: deps }
        } else if (deps.includes(c.name)) { 
          // this column should now have the updated column
          // as a child to update when it updates
          return { ...c, children: c.children.add(updatedCol.id) }
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
        console.log("updating", c.name, "new context", this.state.context)
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
    let eventsCol = this.state.columns.find(c => c.id === "events")
    console.log("event", e, "col", eventsCol)
    this.state.events.push(e)
    console.log('new events list', this.state.events)
    this.handleColOutputChange("events", this.state.events, [])
  }

  render() {
    let dataColumns = this.state.columns.map((c) => {
      return <div className="data-column">
        <input value={c.name} onChange={(e) => this.handleColNameChange(c.id, e.target.value)}/>
        <DataColumn
        key={c.id}
        colId={c.id}
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
