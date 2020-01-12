const path = require('path');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-05';

module.exports = {
  entry: `./src/${exampleId}/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`),
  }
};