const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const { DefinePlugin } = require('webpack');

const path = require('path');
const paths = require('./paths');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  resolve: {
    alias: {
      '@': paths.src,
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  entry: {
    main: path.resolve(path.join(paths.src, 'main.js')),
  },
  output: {
    path: paths.build,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: paths.build,
    },
    client: {
      logging: 'none',
    },
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(postcss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'vue'],
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(path.join(paths.src, 'index.html')),
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
