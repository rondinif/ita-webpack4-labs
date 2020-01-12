const path = require('path');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-02';

module.exports = {
  entry: `./src/${exampleId}/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}a`),
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
            'url-loader?name=assets/[name].[hash].[ext]',
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