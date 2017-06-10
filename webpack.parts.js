const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    app: path.join( __dirname, 'javascript', 'app' ),
    build: path.join( __dirname, 'public', 'build' ),
    public: path.join( __dirname, 'public' ),
};

exports.commonConfig = () => ({
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        publicPath: '/build/',
        filename: '[name].js'
    },
    stats: {
        hash: false,
        version: false,
        children: false
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules', 'javascript']
    }
});

exports.developmentConfig = () => ({
    output: {
        filename: '[name].js'
    }
});

exports.productionConfig = () => ({
    output: {
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin([ PATHS.build ], {
            verbose: false
        })
    ]
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
});
