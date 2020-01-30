import merge from 'webpack-merge'
import prd from './config/prd'
import dev from './config/dev'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { isPrd } from '../utils'
import run from './run'

const analyzer = merge(
  isPrd ? prd : dev,
  {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  }
)

run(analyzer)
