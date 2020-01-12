const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const exampleId = 'lab-07';

module.exports = {
  entry: {
    app: `./src/${exampleId}/src/index.js`,
    print: `./src/${exampleId}/src/print.js`,
  },
  plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
    ],  
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`)
  }
};