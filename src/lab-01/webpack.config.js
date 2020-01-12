const path = require('path');
const exampleId = 'lab-01';

module.exports = {
  entry: `./src/${exampleId}/src/index.js`,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, `../../dist/lab-01`),
  },
};