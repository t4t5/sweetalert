const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './sweetalert.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sweetalert.bundle.js',
    library: 'swal',
    libraryTarget: 'umd',
    /* For dev-server: */
    publicPath: '/dist',
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
    new ExtractTextPlugin('sweetalert.bundle.css'),
  ],

  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9000
  },

  stats: {
    colors: true,
  },

  devtool: 'source-map',
};

