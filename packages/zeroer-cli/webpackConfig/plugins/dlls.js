const webpack = require('webpack')
const globby = require('globby')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin') // 向模板html中添加额外的链接资源 如 js css 
const { env: { isPrd }, projectConfig, paths: { dllPath } } = require('../../utils')
const { projectVersion } = projectConfig
const fileNames = Object.keys(projectConfig['dll-entry'])

module.exports = [
  ...fileNames.map(fileName => {
    return new webpack.DllReferencePlugin({
      manifest: require(`${dllPath}/${fileName}${isPrd ? '.prd' : '.dev'}.manifest.json`)
    })
  }),
  new AddAssetHtmlPlugin(
    fileNames.map(fileName => ({
      filepath: isPrd ? globby.sync(`${dllPath}/${fileName}.prd.*.js`)[0] : `${dllPath}/${fileName}.dev.js`,
      outputPath: `${projectVersion}/static/dll`,
      publicPath: `${projectVersion}/static/dll`,
    }))
  ),
]
