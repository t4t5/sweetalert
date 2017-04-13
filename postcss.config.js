module.exports = {
  map: true,
  plugins: [
    require('postcss-nesting'),
    require("postcss-custom-properties"),
    require('autoprefixer'),
  ]
}
