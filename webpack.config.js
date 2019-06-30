const path = require('path');

module.exports = {
  entry: '../life/www/js/index.js',
  output: {
    path: path.resolve(__dirname, 'www/js'),
    filename: 'bundle.js'
  },
  resolve: {
      extensions: []
  },
  module: {
      rules: []
  },
  plugins: []
}