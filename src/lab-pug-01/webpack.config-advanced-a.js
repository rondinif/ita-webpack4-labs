const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-pug-01'; // lab08 + lab03 + pug-loader
const exampleMutation = '-adv-a'; // + webpack-dev-server + watchContentBase

const PATHS = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

console.log(PATHS.src);
console.log(PATHS.dist);


module.exports = {
  entry: `./src/${exampleId}/src/index.js`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}${exampleMutation}`),
  },
  module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            'pug-loader'
          ]
        },  
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
            `file-loader?name=assets/[name].[hash].[ext]&outputPath=../../dist/${exampleId}${exampleMutation}`
          ]
        },        
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            `file-loader?outputPath=../../dist/${exampleId}${exampleMutation}`,
          ],
        },
        /* non usare in webpack4 ... serviva solo nelle versioni vecchie. lascio commento solo per info:
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
        */
      ],
    },
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: `${exampleId}`,
        template: PATHS.src + '/view/index.pug',
        inlineSource: '.(js|css)'
      }),
    ],  
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}${exampleMutation}`),
    publicPath: '/dist/lab-pug-01-adv-a/' // 'http://localhost:8080/dist/lab-pug-01-adv-a/'
  },  


	mode: 'production',

	devServer: {
    contentBase: '.', // `./dist/${exampleId}${exampleMutation}`,
    // publicPath: `../../dist/${exampleId}${exampleMutation}`,
		watchContentBase: true
	},

	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			name: false,

			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}
	}  
};