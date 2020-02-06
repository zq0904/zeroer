#!/usr/bin/env ts-script -T -O {"target":"ESNEXT","module":"commonjs","strict":true,"esModuleInterop":true,"forceConsistentCasingInFileNames":true}
import fse from 'fs-extra'
import {
  commandLineArgs,
  passthroughCommandLineArgs,
  mockPassthroughCommandLineArgs,
  log,
  execA,
  paths,
  resolve,
  clearConsole
} from './utils'
import pkg from '../package.json'
import { NODE_ENV } from './types'

clearConsole()

if (commandLineArgs.clear) {
  const dirs = ['babel-loader', 'eslint-loader']
  const cacheDir = 'node_modules/.cache'
  for (const dir of dirs) {
    fse.emptyDirSync(resolve(paths.project.root, cacheDir, dir))
  }
  log(`已清空：\n${dirs.map(dir => ` ${cacheDir}/${dir}`).join('\n')}`, 'blue')
}

commandLineArgs.help && log(`
Usage: ${pkg.name} <command> [options]

  command:
    server              启动开发服务器
    build:dev           构建 dev版本
    build:prd           构建 prd版本
    dll                 生成dll文件及清单
    analyzer:dev        dev分析器
    analyzer:prd        prd分析器
    mock                启动mock数据
    test

  options:
    --project, -P       指定项目的配置文件名（必须是ts文件）           [字符串]  [默认值: project.config.ts]
    --clear, -C         清空缓存文件如 babel-loader eslint-loader      [布尔]
    --help, -H          显示帮助信息                                   [布尔]`,
'blue')

// 支持并发操作 但并不推选
for (const commond of commandLineArgs._) {
  switch (commond) {
    case 'server':
      log('正在启动 开发服务器...')
      execA([
        `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.webpack}/server.ts`,
        passthroughCommandLineArgs
      ].join(' '))
      break
    case 'build:dev':
      log('正在构建 dev版本...')
      execA([
        `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.webpack}/build.ts`,
        passthroughCommandLineArgs
      ].join(' '))
      break
    case 'build:prd':
      log('正在构建 prd版本...')
      execA([
        `cross-env NODE_ENV=${NODE_ENV.PRODUCTION}`,
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.webpack}/build.ts`,
        passthroughCommandLineArgs
      ].join(' '))
      break
    case 'dll':
      log('正在生成dll...')
      fse.emptyDirSync(paths.project.dll)
      execA([
        `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.webpack}/dll.ts`,
        passthroughCommandLineArgs
      ].join(' '))
      execA([
        `cross-env NODE_ENV=${NODE_ENV.PRODUCTION}`,
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.webpack}/dll.ts`,
        passthroughCommandLineArgs
      ].join(' '))
      break
    case 'analyzer:dev':
      log('正在启动 dev分析器...')
      execA([
        `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.webpack}/analyzer.ts`,
        passthroughCommandLineArgs
      ].join(' '))
      break
    case 'analyzer:prd':
      log('正在启动 prd分析器...')
      execA([
        `cross-env NODE_ENV=${NODE_ENV.PRODUCTION}`,
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.webpack}/analyzer.ts`,
        passthroughCommandLineArgs
      ].join(' '))
      break
    case 'mock':
      log('正在启动 mock数据...')
      // https://github.com/remy/nodemon/blob/master/doc/events.md#Using_nodemon_as_child_process
      const cp = execA([
        'nodemon',
        `-w ${paths.project.root}/${commandLineArgs.project} -w ${paths.project.src}/mock/data.ts`,
        '--exec',
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.src}/mock/index.ts`,
        mockPassthroughCommandLineArgs
      ].join(' '))
      .on('message', event => {
        if (event.type === 'crash') cp.cancel() // nodemon 程序崩溃 直接退出
      })
      break
    case 'test':
      execA([
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.src}/test/index.ts`,
        passthroughCommandLineArgs
      ].join(' '))
      break
    default:
  }
}
