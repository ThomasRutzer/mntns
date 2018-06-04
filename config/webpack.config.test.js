var webpack = require('webpack'),
  webpackConfig = require('./webpack.config.base'),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin'),
  jsonImporter = require('node-sass-json-importer'),
  env = require('../environment/dev.env');

webpackConfig.module.rules = [{
    test: /\.ts$/,
    exclude: /node_modules\/(?!(mntns-landscape)\/).*/,
    loader: 'awesome-typescript-loader',
    query: {
      compilerOptions: {
        inlineSourceMap: true,
        sourceMap: false
      }
    }
  },
  {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: ['./src/index.html']
  },
  {
    test: /\.scss$/,
    use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        },
      },
      {
        loader: 'sass-loader',
        // Apply the JSON importer via sass-loader's options.
        options: {
          importer: jsonImporter,
        },
      },
    ]
  },
  {
    test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    loader: 'url-loader?limit=8192'
  }
];

webpackConfig.plugins = [...webpackConfig.plugins,
  new SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(ts|js)($|\?)/i
  }),
  new DefinePlugin({
    'process.env': env
  })
];

webpackConfig.devtool = 'inline-source-map';

module.exports = webpackConfig;
