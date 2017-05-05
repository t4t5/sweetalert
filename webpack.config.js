const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (_env, args) => {

  const IS_PRODUCTION = args.p;

  const BUILD_PATH = IS_PRODUCTION ? 'dist' : 'docs/assets/sweetalert';
  const JS_FILE_NAME = IS_PRODUCTION ? 'sweetalert.min.js' : 'sweetalert.dev.js';
  const CSS_FILE_NAME = IS_PRODUCTION ? 'sweetalert.min.css' : 'sweetalert.css.dev';

  /*
{
  context: path.resolve(__dirname, 'docs'),
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'docs.js',
    publicPath: '/dist',
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    })
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      }
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    compress: true,
    port: 9000,
  },
},
*/
  return {
    context: path.resolve(__dirname, 'src'),
    entry: './sweetalert.js',

    output: {
      path: path.resolve(__dirname, BUILD_PATH),
      filename: JS_FILE_NAME,
      library: 'swal',
      libraryTarget: 'umd',
    },

    resolve: {
      extensions: [
        ".ts",
        ".js",
      ],
    },

    module: {
      rules: [
        {
          /* Expose global sweetAlert() function
           * (in addition to swal())
           */
          test: require.resolve("./src/sweetalert"),
          use: 'expose-loader?sweetAlert'
        },
        {
          enforce: 'pre',
          test: /\.ts?$/,
          loader: 'tslint-loader',
          options: {
            configFile: './tslint.json',
            typeCheck: true,
          },
          exclude: /(node_modules)/,
        },
        {
          /* Compile TypeScript */
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          /* Use PostCSS */
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader?sourceMap!postcss-loader",
          })
        }
      ],
    },

    plugins: [
      new ExtractTextPlugin(CSS_FILE_NAME),
    ],

    /*
    devServer: {
      contentBase: __dirname,
      compress: true,
      port: 9000
    },
    */

    stats: {
      colors: true,
    },

    devtool: 'source-map',
  }
};

