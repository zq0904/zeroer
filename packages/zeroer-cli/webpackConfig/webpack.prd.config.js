const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const { resolve, projectConfig: { projectVersion } } = require('../utils')
const { name, version } = require(resolve('package.json'))

module.exports = merge(base, {
  plugins: [
    new webpack.BannerPlugin({
      banner: `${name} v${version} Date: ${new Date()}\n`,
      entryOnly: true, // 只作用在主入口文件中
    }),
    new MiniCssExtractPlugin({
      filename: `${projectVersion}/css/[name].[contenthash:7].css`,
    }),
    new OptimizeCssAssetsPlugin(),
  ],
})
