import Webpack from 'webpack'
import globby from 'globby'
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin' // 向模板html中添加额外的链接资源 如 js css
import { isPrd, config, paths } from '../../../utils'

// https://github.com/webpack/webpack/tree/master/examples/dll-user

const fileNames = Object.keys(config['dll-entry'])

const dlls = [
  ...fileNames.map(fileName => {
    // @ts-ignore
    return new Webpack.DllReferencePlugin({
      manifest: require(`${paths.project.dll}/${fileName}.${isPrd ? 'prd' : 'dev'}.manifest.json`)
    })
  }),
  new AddAssetHtmlPlugin(
    fileNames.map(fileName => ({
      filepath: globby.sync(`${paths.project.dll}/${fileName}.${isPrd ? 'prd' : 'dev'}.*.js`)[0],
      outputPath: `${config.project.version}/static/dll`,
      publicPath: `${config.project.version}/static/dll`,
    }))
  ),
]

export default dlls
