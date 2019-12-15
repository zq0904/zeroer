#!/usr/bin/env node
const fs = require('fs-extra')
const minimist = require('minimist')
const {
  execP,
  paths: { dllPath, webpackConfigPath },
  log
} = require('../utils')

switch (minimist(process.argv.slice(2))._[0]) {
  case 'server':
    log('正在启动 开发服务器...')
    execP(
      `cross-env NODE_ENV=development webpack-dev-server --config ${webpackConfigPath}/webpack.dev.config.js`
    )
    break
  case 'build:dev':
    log('正在构建 编译dev版本...')
    execP(
      `cross-env NODE_ENV=development webpack --config ${webpackConfigPath}/webpack.prd.config.js`
    )
    break
  case 'build:prd':
    log('正在构建 编译prd版本...')
    execP(
      `cross-env NODE_ENV=production webpack --config ${webpackConfigPath}/webpack.prd.config.js`
    )
    break
  case 'dll':
    log('正在生成dll...')
    fs.emptyDirSync(dllPath)
    execP(
      `cross-env NODE_ENV=development webpack --config ${webpackConfigPath}/webpack.dll.config.js`
    )
    execP(
      `cross-env NODE_ENV=production webpack --config ${webpackConfigPath}/webpack.dll.config.js`
    )
    break
  case 'analyzer:dev':
    log('正在启动 dev分析器...')
    execP(
      `cross-env NODE_ENV=development webpack --config ${webpackConfigPath}/webpack.analyzer.config.js`
    )
    break
  case 'analyzer:prd':
    log('正在启动 prd分析器...')
    execP(
      `cross-env NODE_ENV=production webpack --config ${webpackConfigPath}/webpack.analyzer.config.js`
    )
    break
  default:
  // --help
}
