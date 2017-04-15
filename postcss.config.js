module.exports = {
  map: true,
  plugins: [
    require('postcss-easy-import'),
    require('postcss-nesting'),
    require('postcss-custom-properties'),
    require('postcss-color-function'),
    require('autoprefixer'),
  ]
}
