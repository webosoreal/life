const path = require('path');

module.exports = {
  entry: '../app/www/js/index.js',
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