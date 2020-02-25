# JSON Sheets

A research prototype exploring ideas for extending spreadsheets.

No coherent result yet, just various explorations. Use at your own risk and don't expect good code inside.

See [Twitter](https://twitter.com/geoffreylitt/status/1161033775872118789) for a tad more explanation.

Some of the concepts in play:

* named cells containing JSON
* JQ as a formula language
* build a GUI in a spreadsheet -- input events in the UI
  are represented as an append-only immutable stream,
  which is then processed by further cells

The `redesign` branch has an alternate version from the `master` one.

## To run

`npm start`, then view the app at `localhost:3000`
