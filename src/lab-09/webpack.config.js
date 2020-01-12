const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const exampleId = 'lab-09';


module.exports = {
  entry: {
    app: `./src/${exampleId}/src/index.js`,
    print: `./src/${exampleId}/src/print.js`,
  },
  devtool: 'inline-source-map',
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
    ],  
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`)
  }
};