import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './base'
import MiniCssExtractPlugin from 'mini-css-extract-plugin' // 提取css
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin' // 压缩css
import { resolve, paths, config } from '../../utils'

const { name, version } = require(resolve(paths.project.root, 'package.json'))

const prd = merge(base, {
  plugins: [
    new webpack.BannerPlugin({
      banner: `${name} v${version} Date: ${new Date()}\n`,
      entryOnly: true, // 只作用在主入口文件中
    }),
    new MiniCssExtractPlugin({
      filename: `${config.project.version}/css/[name].[contenthash:7].css`,
    }),
    new OptimizeCssAssetsPlugin(),
  ],
})

export default prd
