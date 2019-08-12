import React from 'react';
import logo from './logo.svg';
import DataColumn from './DataColumn';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div className="app">
        <DataColumn />
        <DataColumn />
        <DataColumn />
        <DataColumn />
        <DataColumn />
      </div>
    );
  }
}

export default App;
