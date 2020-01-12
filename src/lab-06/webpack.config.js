const path = require('path');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-06';

module.exports = {
  entry: {
    app: `./src/${exampleId}/src/index.js`,
    print: `./src/${exampleId}/src/print.js`,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`)
  }
};