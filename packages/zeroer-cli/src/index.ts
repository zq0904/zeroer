import fs from 'fs-extra'
import {
  commandLineArgs,
  passthroughCommandLineArgs,
  mockPassthroughCommandLineArgs,
  log,
  execA,
  paths,
  clearConsole
} from './utils'

clearConsole()
// TODO 并发处理多个任务 只要包含就可以? npx zeroer-cli mock server
switch (commandLineArgs._[0]) {
  case 'mock':
    log('正在启动 mock数据...')
    // https://github.com/remy/nodemon/blob/master/doc/events.md#Using_nodemon_as_child_process
    const cp = execA([
      'nodemon',
      `-w ${paths.project.root}/${commandLineArgs.project}`,
      `-w ${paths.project.src}/mock/data.ts`,
      '--exec ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.src}/mock/index.ts`,
      mockPassthroughCommandLineArgs
    ].join(' '))
    .on('message', event => {
      if (event.type === 'crash') cp.cancel() // nodemon 程序崩溃 直接退出
    })
    break
  case 'server':
    log('正在启动 开发服务器...')
    execA([
      'cross-env NODE_ENV=development',
      'ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.webpack}/server.ts`,
      passthroughCommandLineArgs
    ].join(' '))
    break
  case 'build:dev':
    log('正在构建 dev版本...')
    execA([
      'cross-env NODE_ENV=development',
      'ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.webpack}/build.ts`,
      passthroughCommandLineArgs
    ].join(' '))
    break
  case 'build:prd':
    log('正在构建 prd版本...')
    execA([
      'cross-env NODE_ENV=production',
      'ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.webpack}/build.ts`,
      passthroughCommandLineArgs
    ].join(' '))
    break
  case 'dll':
    log('正在生成dll...')
    // TODO webpack([])配置多参 就可以结合CleanWebpackPlugin去清空了
    fs.emptyDirSync(paths.project.dll)
    execA([
      'cross-env NODE_ENV=development',
      'ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.webpack}/dll.ts`,
      passthroughCommandLineArgs
    ].join(' '))
    execA([
      'cross-env NODE_ENV=production',
      'ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.webpack}/dll.ts`,
      passthroughCommandLineArgs
    ].join(' '))
    break
  case 'analyzer:dev':
    log('正在启动 dev分析器...')
    execA([
      'cross-env NODE_ENV=development',
      'ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.webpack}/analyzer.ts`,
      passthroughCommandLineArgs
    ].join(' '))
    break
  case 'analyzer:prd':
    log('正在启动 prd分析器...')
    execA([
      'cross-env NODE_ENV=production',
      'ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.webpack}/analyzer.ts`,
      passthroughCommandLineArgs
    ].join(' '))
    break
  case 'test':
    execA([
      'ts-node',
      `--project ${paths.cli.root}/tsconfig.json`,
      `${paths.cli.src}/test/index.ts`,
      passthroughCommandLineArgs
    ].join(' '))
    break
  default:
    // TODO
    // --help
    // -p --project 指定 项目的配置文件 必须是.ts
    // -t 直接使用ts-node 启动项目
}