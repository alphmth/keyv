const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'keyv-browser.js',
    library: {
      name: 'KeyvBrowser',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "util": false
    } 
  },
};
