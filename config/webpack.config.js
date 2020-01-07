const argv = require('yargs').argv
const path = require('path')
const APP_DIR_NAME = argv.project || 'src'
const APP_DIR = path.resolve(__dirname, `./src/${APP_DIR_NAME}`)

console.log('🐝 Starting webpack 🐝')

module.exports = function(env) {
  return {
    entry: APP_DIR + '/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },
    module: {
      rules:  [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      }],
    },
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'lib/'),
        'settings': path.resolve(__dirname, 'config/settings.js')
      }
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    mode:'development',
    devtool: '#eval-source-map'
  }
}
/*******

Before Launch :

"scripts": {
  "dev": "webpack-dev-server --port 8080 --watch",
  "build": "babel --plugins transform-es2015-modules-umd --out-dir dist"
}

"devDependencies": {
  "@babel/core": "^7.5.5",
  "babel": "^6.23.0",
  "babel-loader": "^8.0.6",
  "webpack": "^4.39.2",
  "webpack-cli": "^3.3.6",
  "webpack-dev-server": "^3.8.0",
  "yargs": "^13.3.0"
}
*******/