const path = require('path')
const { isPrd } = require('./env')

const projectPath = process.cwd() // 项目根目录
const srcPath = `${projectPath}/src`
const publicPath = `${projectPath}/public`
const dllPath = `${publicPath}/dll` // dll 的输出目录
const distPath = `${projectPath}/${isPrd ? 'dist-prd' : 'dist-dev'}` // 编译输出的目录

const cliPath = path.resolve(__dirname, '../') // cli目录
const webpackConfigPath = path.resolve(cliPath, 'webpackConfig')

module.exports = {
  projectPath,
  srcPath,
  publicPath,
  dllPath,
  distPath,

  cliPath,
  webpackConfigPath,
}
