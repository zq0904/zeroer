const merge = require('webpack-merge')
const prdConfig = require('./webpack.prd.config')
const devConfig = require('./webpack.dev.config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { env: { isPrd } } = require('../utils')

module.exports = merge(
  isPrd ? prdConfig : devConfig,
  {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  }
)
