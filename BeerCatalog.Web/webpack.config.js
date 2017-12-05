const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: false },
        entry: { 'main': './ClientApp/main.jsx' },
        resolve: { extensions: ['.js', '.jsx'] },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react', 'stage-3', 'stage-2'],
                    }
                },
                {
                    test: /\.css$/,
                    loader: combineLoaders([
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true,
                            },
                        }, {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                localIdentName: '[local]',
                            },
                        },
                    ])
                }
            ]
        },
        plugins: isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('site.css')
        ]
    }];
};