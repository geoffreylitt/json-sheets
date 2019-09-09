import React from 'react';
import logo from './logo.svg';
import DataColumn from './DataColumn';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { id: 1, name: "stream1", ref: React.createRef(), children: new Set() },
        { id: 2, name: "stream2", ref: React.createRef(), children: new Set() },
        { id: 3, name: "stream3", ref: React.createRef(), children: new Set() },
      ],
      context: {}
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
        console.log("updating cell ", c.name)
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

      console.log("columns", columns, "context", context)

      return {
        columns: columns,
        context: context
      }
    })
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
        />
      </div>
    })

    return (
      <div>
        <div className="app">
          {dataColumns}
        </div>
      </div>
    );
  }
}

export default App;
