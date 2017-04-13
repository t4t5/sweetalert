const path = require('path');

module.exports = {
  entry: './src/sweetalert.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sweetalert.bundle.js',
    library: 'swal',
    libraryTarget: 'umd',
    umdNamedDefine: true,
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
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },

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

