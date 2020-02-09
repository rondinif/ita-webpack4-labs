const path = require('path');
const DotenvFlow = require('dotenv-flow-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-pug-03';

const PATHS = {
	src: path.join(__dirname, 'src'),
	// dist: path.join(__dirname, 'dist')
};

console.log(PATHS.src);
// console.log(PATHS.dist);

module.exports = {
  entry: `./src/${exampleId}/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`),
  },
  module: {
      rules: [
        {
          test: /\.pug$/,
          use: [{
            loader: 'pug-loader',
            query: { doctype: 'pug', globals: {hello: 'ronda'}}
            /*  options: {
              data: {
                hello: 'Hello World',
                getUsername: function() {
                  return "ronda";
              }
              }
              
            } ,
						query: { doctype: 'pug', plugins: [{
							codeGen () {
							    return 'function template() {\nreturn \'superronda\'\n}';
							},
						},
						{
							preCodeGen(ast) {
								return myPugLoaderPlugin(ast);
							}
						}					
						]},*/
					}]
        } 
      ],
    },
  plugins: [
      new DotenvFlow({
        default_node_env: 'development',
        path: `./src/${exampleId}/config`,
        system_vars: true,
        silent: false
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: `${exampleId}`,
        template: PATHS.src + '/index.pug',
        inlineSource: '.(js|css)',
        templateParameters: {
          foo: () => 'bar',
          some: 'value'
        }
      }),
    ],  
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}`)
  }  
};