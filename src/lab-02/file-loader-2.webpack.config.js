const path = require('path');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-02';

module.exports = {
  entry: `./src/${exampleId}/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}c`),
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
            `file-loader?name=assets/[name].[hash].[ext]&outputPath=../../dist/${exampleId}c`
          ]
          /* ,
          include: [ 
            helpers.root('images'), 
          ]
          */
        },        
      ],
    },
};