const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-83'; // lab08 + lab03 + pug-loader


module.exports = {
  entry: `./src/${exampleId}/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`),
  },
  module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],

        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            `file-loader?name=assets/[name].[hash].[ext]&outputPath=../../dist/${exampleId}`
          ]
        },        
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            `file-loader?outputPath=../../dist/${exampleId}`,
          ],
        },
      ],
    },
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