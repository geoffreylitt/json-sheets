import React from 'react';
import './CellEditor.css';
// import CodeMirror from 'react-codemirror'
import {Controlled as CodeMirror} from 'react-codemirror2'
import DataCell from './DataCell';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/mdn-like.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/jsx/jsx');

// Just a code editor for a query

class CellEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  handleQueryChange = (editor, data, value) => {
    this.props.handleQueryChange(this.props.cell.id, value)
  }

  render() {
    return (
      <div className="cell-editor">
        <div>
          <div className="cell-name">{this.props.cell.name}</div>
          <CodeMirror
            className="formula-editor"
            value={this.props.cell.query}
            onBeforeChange={this.handleQueryChange}
            options={{ mode: "jsx", theme: "mdn-like" }}
            />
          <DataCell
            cell={this.props.cell}
            active={false}
            expanded={true}
            setAsActiveCell={() => {}}
            eventHandlers={this.props.eventHandlers}
            />
        </div>
      </div>
    );
  }
}

export default CellEditor;
