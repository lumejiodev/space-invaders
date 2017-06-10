const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const commonConfig = merge([
    parts.commonConfig(),
    parts.loadJavaScript({ exclude: [/node_modules/] })
]);

const additionalConfig = process.env.NODE_ENV === 'production' ? parts.developmentConfig() : parts.productionConfig();

module.exports = merge( commonConfig, additionalConfig );
