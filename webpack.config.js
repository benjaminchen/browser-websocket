const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
    entry: './src/index.js'
}

var normalConfig = Object.assign({}, config, {
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    output: {
        library: "BrowserWebSocket",
        path: path.resolve(__dirname, 'dist'),
        filename: 'browser-websocket.js'
    }
})

var miniConfig = Object.assign({}, config, {
    plugins: [
        new UglifyJSPlugin()
    ],
    output: {
        library: "BrowserWebSocket",
        path: path.resolve(__dirname, 'dist'),
        filename: 'browser-websocket.min.js'
    }
})

module.exports = [ normalConfig, miniConfig ]
