const glob = require('glob'),
    path = require('path'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CompressionPlugin = require('compression-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
    jsonImporter = require('node-sass-json-importer'),
    autoprefixer = require('autoprefixer'),
    webpackConfig = require('./webpack.config.base'),
    helpers = require('./helpers'),
    DefinePlugin = require('webpack/lib/DefinePlugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    env = require('../environment/prod.env');

const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
});

webpackConfig.module.rules = [
    ...webpackConfig.module.rules,
    {
        test: /\.scss$/,
        use: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: false,
                        sourceMap: false,
                        importLoaders: 3
                    }
                },

                {
                   loader: 'postcss-loader',
                   options: {
                        plugins: () => [autoprefixer]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        outputStyle: 'expanded',
                        sourceMap: false,
                        importer: jsonImporter
                    }
                }],
        // use style-loader in development
        fallback: 'style-loader'
        })
    },
    {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?name=assets/img/[name].[ext]'
    },
    {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
    }];

// ensure ts lint fails the build
webpackConfig.module.rules[0].options = {
    failOnHint: true
};

webpackConfig.plugins = [...webpackConfig.plugins,
    extractSass,
    new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardUnused: false,
            discardComments: {removeAll: true}
        },
        canPrint: true
    }),
    new HtmlWebpackPlugin({
        inject: true,
        template: helpers.root('/src/index.html'),
        favicon: helpers.root('/src/fav.jpg'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }),
    new UglifyJsPlugin({
        uglifyOptions: {
            include: /\.js$/,
            minimize: true
        }
    }),
    new CompressionPlugin({
        asset: '[path].gz[query]',
        test: /\.js$/
    }),
    new DefinePlugin({
        'process.env': env
    }),
];

module.exports = webpackConfig;
