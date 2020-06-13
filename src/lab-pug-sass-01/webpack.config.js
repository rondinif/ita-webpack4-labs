const path = require('path');
const DotenvFlow = require('dotenv-flow-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const helpers = require('./node-helpers.js');
const exampleId = 'lab-pug-sass-01';

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
          query: { doctype: 'pug', globals: { hello: 'ronda' } }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              prependData: (loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);
                console.log(`##> prependData loaderContext relativePath>:${relativePath}`);
                if (relativePath === 'src/lab-pug-sass-01/src/styles/foo.scss') {
                  return '$ratio-from-sass-loader: 1; $value: 100px;';
                }
                else if ( relativePath === 'src/lab-pug-sass-01/src/styles/common/_variables.scss') {
                  return '$ratio-from-sass-loader: 2;';
                } else {
                  return '$ratio-from-sass-loader: 4;';
                }
              },
            }
          }
        ]
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