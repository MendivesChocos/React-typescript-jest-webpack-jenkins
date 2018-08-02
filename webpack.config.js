// simple function for created vars for webpack DefinePlugin
function createVarsDefinePlugin (vars) {
  let newVars = {}
  for(let key in vars) {
    newVars['process.env.' + key] = JSON.stringify(vars[key]);
  }
  return newVars;
}

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const isProd = process.env.NODE_ENV === 'production';
const dotenv = require('dotenv').config({ path: './.env' });
const vars = require('dotenv-expand')(dotenv).parsed;
const varsDefinePlugin = createVarsDefinePlugin(vars);
const publicPath = isProd ? vars.PATH_CDS : '/';
const distPath = 'dist';

const withVersion = false; // Para que el versionado no se aplique por webpack, sino por quien lo llama {default: 'isProd'}
const fileJsName = (withVersion) ? 'js/[name].[chunkhash:8].js' : 'js/[name].js';
const fileCssName = (withVersion) ? 'styles/[name].[contenthash:8].css' : 'styles/[name].css';
const fileImgName = (withVersion) ? 'images/[name].[hash:8].[ext]' : 'images/[name].[ext]';
const fileFontName = (withVersion) ? 'fonts/[name].[hash:8].[ext]' : 'fonts/[name].[ext]';

const webpackConfig = {
  devtool: 'inline-source-map',
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  entry: {
    'app': './src/index.tsx',
    'vendor': [
      'react',
      'react-dom',
      'styled-components'
    ]
  },
  output: {
    path: path.join(__dirname, distPath),
    filename: fileJsName,
    publicPath: publicPath
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@app': path.resolve(__dirname)
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'tslint-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              'loader': 'css-loader',
              'options': {
                'minimize': true,
                'importLoaders': 1
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              'loader': 'css-loader',
              'options': {
                'minimize': true,
                'importLoaders': 1
              }
            },
            {
              'loader': 'postcss-loader',
              'options': {
                'sourceMap': true
              }
            },
            {
              'loader': 'resolve-url-loader',
              'options': {
                'sourceMap': true
              }
            },
            {
              'loader': 'sass-loader',
              'options': {
                'sourceMap': true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg|webp)$/,
        loader: 'file-loader',
        options: {
          name: fileImgName,
          publicPath: publicPath
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        loader: 'file-loader',
        options: {
          name: fileFontName,
          publicPath: publicPath
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          },
          'stylelint-custom-processor-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(varsDefinePlugin),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new ExtractTextPlugin({
      filename: fileCssName,
      allChunks: false
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new WebpackNotifierPlugin(),
  ]
};

if (isProd) {
  const pluginsProd = [
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: true
      }
    })
  ]
  webpackConfig.plugins = webpackConfig.plugins.concat(pluginsProd);
}

module.exports = webpackConfig;
