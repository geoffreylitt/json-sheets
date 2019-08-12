import React from 'react';
import logo from './logo.svg';
import './DataColumn.css';

class DataColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div className="data-column">
        <h1>Hello, world!</h1>
      </div>
    );
  }
}

export default DataColumn;
