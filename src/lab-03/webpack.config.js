const path = require('path');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-03';


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
};