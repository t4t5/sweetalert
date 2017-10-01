const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_env, args) => {

  const IS_PROD = args.p;

  const BUILD_PATH = 'dist';
  const JS_FILE_NAME = 'sweetalert.min.js';
  const devtool = IS_PROD ? false : 'source-map';

  const plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    //new BundleAnalyzerPlugin(),
  ];

  if (IS_PROD) {
    plugins.push(
      new CopyWebpackPlugin([{
        from: 'sweetalert.d.ts',
        to: '../types/sweetalert.d.ts',
      }])
    );

    plugins.push(
      new DtsBundlePlugin()
    );
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: './sweetalert.js',
    plugins,

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
          // Expose global swal() function
          test: require.resolve("./src/sweetalert"),
          use: [{
            loader: 'expose-loader',
            options: 'sweetAlert'
          }, {
            loader: 'expose-loader',
            options: 'swal'
          }],
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
          use: [
            {
              loader: 'style-loader',
              options: {
                insertAt: 'top',
              },
            },
            { 
              loader: 'css-loader', 
              options: { 
                importLoaders: 1 
              } 
            },
            'postcss-loader',
          ]
        }
      ],
    },

    stats: {
      colors: true,
    },

    devtool,
  }
};

function DtsBundlePlugin(){}

DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function(){
    var dts = require('dts-bundle');

    dts.bundle({
      name: 'sweetalert',
      main: 'types/sweetalert.d.ts',
      out: '../index.d.ts',
      removeSource: false,
      outputAsModuleFolder: true // to use npm in-package typings
    });
  });
};
