const path = require('path');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-02';


module.exports = {
  entry: './src/lab-02/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}b`),
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
            `file-loader?name=[name].[ext]&outputPath=../../dist/${exampleId}b/images/`
            // name=assets/[name].[hash].[ext]',
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