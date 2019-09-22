import React from 'react';
import './DataColumn.css';
// import CodeMirror from 'react-codemirror'
import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/mdn-like.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/jsx/jsx');

// Just a code editor for a query

class CellEditor extends React.Component {
  constructor(props) {
    super(props);
    this.cmRef = React.createRef()
  }

  handleQueryChange = (editor, data, value) => {
    this.props.handleQueryChange(this.props.cell.id, value)
  }

  render() {
    let query = this.props.cell.query
    console.log("query", query)

    return (
      <div>
        <div>
          <CodeMirror
            className="formula-editor"
            value={query}
            onChange={this.handleQueryChange}
            options={{ mode: "jsx", theme: "mdn-like" }}
            />
        </div>
      </div>
    );
  }
}

export default CellEditor;
