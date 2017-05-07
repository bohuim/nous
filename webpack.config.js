const path = require('path');
const webpack = require('webpack');


// ====================
// Dev
// ====================
const PROD = (process.env.NODE_ENV === "production");
const DEV = !PROD;
const sourceMap = DEV ? 'cheap-module-source-map' : false;

const devServerConfig = {
    port: 3000,
    hot: true,

    inline: true,
    stats: 'normal',
    historyApiFallback: true
}


// ====================
// Plugins
// ====================
const styleLoader = {
    loader: 'style-loader',
    options: { sourceMap: true }
}

const cssLoader = {
    loader: 'css-loader',
    options: {
        importLoader: 1,
        modules: true,
        localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
    }
}

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true,
        includePaths: [
            path.resolve('src'),
            path.resolve('src/styles'),
            path.resolve('src/partials')
        ]
    }
}

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: 'styles.css',
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
const context = path.resolve(__dirname)

module.exports = {
    context: context,
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
            '~': path.resolve('src'),
            'styles': path.resolve('src/styles')
        },
        modules: [
            path.resolve('src'),
            path.resolve('node_modules')
        ],
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins:
                    [
                        ["react-css-modules", {
                            context: context,
                            webpackHotModuleReloading: true,
                            filetypes: { '.scss': 'postcss-scss' }
                        }]
                    ]
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: styleLoader,
                    use: [cssLoader, sassLoader]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: styleLoader,
                    use: [cssLoader]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff)$/, 
                loader: 'file-loader'
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
