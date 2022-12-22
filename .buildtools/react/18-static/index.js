// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpPlugin = require('imagemin-webp-webpack-plugin')
// const ImageminAvifPlugin = require('imagemin-avif-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

// Helpers
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')

// Rules
const resources = require('./rules/resource');
const transpile = require('./rules/transpile');
const templates = require('./rules/source');
const styles = require('./rules/style');

// Development Mode Only Config
const dev = (options) => { return {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(options.dir, './dist'),
        publicPath: '/'
    },
    devServer: {
        static: "./public",
        hot: true,
        server: 'https',
        allowedHosts: 'all',
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || '4443'
    },
    plugins: [
        ...options.paths.map((path) => {
            // Simulate Pre-Rendering (instead of using server historyApiFallback)
            return new HtmlWebpackPlugin({
                filename:`${path}/index.html`
            })
        }),
        new ImageminWebpPlugin({
            config:[{
                test: /\.(jpe?g|png)$/i,
                options: {
                    quality:  75
                }
            }],
            overrideExtension: false,
        }),
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ],
    // Ignore workbox warnings and files generated
    stats: {
        warningsFilter: [
            '--watch',
            'maximumFileSizeToCacheInBytes'
        ],
        // assets: false,
        // chunks: false,
        // hash: false,
        // modules: false,
        // version: false,
        // timings: true
    }
}}

// Production Build Only Config
const prod = (options) => { return {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(options.dir, './build'),
    },
    plugins: [
        new ImageminWebpPlugin({
            config:[{
                test: /\.(jpe?g|png)$/i,
                options: {
                    quality:  75
                }
            }],
            overrideExtension: false,
        }),
        // new ImageminAvifPlugin({
        //     config:[{
        //         test: /\.(jpe?g|png)$/i,
        //         options: {
        //             quality:  85
        //         }
        //     }],
        //     overrideExtension: false,
        // }),
        new StaticSiteGeneratorPlugin({
            globals: { window: {} },
            paths: options.paths,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new CopyPlugin({
            patterns: [
                "public"
            ],
        }),
    ],
}}

const shared = (options) => { return {
    target: 'web',
    entry: options.entry,
    output: {
        assetModuleFilename: '[name][ext][query]',
        filename: 'bundle.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        publicPath: 'http://localhost:8080/', // TODO: Use relative path
    },
    module: {
        rules: [
            resources(),
            templates(),
            transpile(options.isDev),
            styles(MiniCssExtractPlugin.loader),
        ]
    },
    plugins: [
        new WorkboxPlugin.GenerateSW({
            swDest: 'worker.js',
            navigateFallback: '/',
            maximumFileSizeToCacheInBytes: 20971520
        }),
        new MiniCssExtractPlugin(),
        new CompressionPlugin({
            test: /\.(js|css|html)?$/i,
            algorithm: 'gzip',
        }),
        new CleanWebpackPlugin()
    ]
}}

/**
 * React 18 Static Site Config
 * @param {string} options.entry webpack entry point
 * @param {string} options.mode webpack mode (development/production/none)
 * @param {string?} options.dir sub directory for assets
 * @returns {Object}
 */
module.exports = (options) => {
    const opt = {
        isDev: options.mode == 'development',
        entry: options.entry || './src/index.js',
        paths: options.paths || ['/'],
        dir:   options.dir || './'
    }

    return merge(shared(opt), opt.isDev ? dev(opt) : prod(opt))
}