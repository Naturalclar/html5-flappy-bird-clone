const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname,'src/index.ts'),
  output: {
    path: path.join(__dirname, 'build/'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts','.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: [ /\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'CANVAS_RENDERER': JSON.stringify(true),
        'WEBGL_RENDERER': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.join(__dirname,'/src/template.html'),
    })
  ]
};