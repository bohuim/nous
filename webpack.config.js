const path = require('path');
const webpack = require('webpack');


// ====================
// Dev
// ====================
const DEV = (process.env.NODE_ENV === "development");
const sourceMap = DEV ? 'cheap-module-source-map' : false;

const devServerConfig = {
    port: 3000,
    hot: true,

    inline: true,
    stats: 'normal'
}


// ====================
// Plugins
// ====================
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: DEV
});

const CopyWebpackPlugin = require('copy-webpack-plugin');
const copyFiles = new CopyWebpackPlugin([
    {from: './src/index.html'},
    {from: './src/static'}
])

const HMR = new webpack.HotModuleReplacementPlugin();


// ====================
// Webpack
// ====================
module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:' + devServerConfig.port,
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            '/': path.resolve(''),
            '~': path.resolve('src')
        },
        modules: [
            path.resolve('src'),
            path.resolve('node_modules')
        ],
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.(scss|sass)$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        extractSass, 
        copyFiles,
        HMR
    ],
    devtool: sourceMap,
    devServer: devServerConfig
};
