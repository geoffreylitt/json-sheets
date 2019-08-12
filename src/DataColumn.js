import React from 'react';
import logo from './logo.svg';
import './DataColumn.css';

const jq = require('jq-web')

class DataColumn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: [
        {
          name: "Geoffrey",
          age: 27,
          hobbies: [
            "basketball",
            "tennis",
            "cello"
          ]
        },
        {
          name: "Maggie",
          age: 27,
          hobbies: [
            "violin",
            "running"
          ]
        }
      ],
      query: ".[]",
      queryValid: true
    };

    this.state.output = this.state.input
  }

  render() {
    
    const recordItems = this.state.output.map ((record) => 
      <li>{JSON.stringify(record)}</li>
    );

    return (
      <div className="data-column">
        <input
          className={`formula-editor ${this.state.queryValid ? "valid" : "invalid"}`}
          value={this.state.query} onChange={this.handleQueryChange}/>
        <ul>{recordItems}</ul>
      </div>
    );
  }

  handleQueryChange = (e) => {
    let query = e.target.value
    let output = this.state.output;
    let queryValid = true;

    try {
      output = jq.json(this.state.input, query)
    }
    catch (error) {
      console.error("bad query")
      queryValid = false;
    }

    this.setState({
      query: query,
      output: output,
      queryValid: queryValid
    })
  }
}

export default DataColumn;
