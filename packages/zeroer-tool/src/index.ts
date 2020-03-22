#!/usr/bin/env ts-script -T -O {"target":"ES2019","module":"commonjs","strict":true,"esModuleInterop":true,"forceConsistentCasingInFileNames":true}
import fse from 'fs-extra'
import { program } from 'commander'
import {
  log,
  execA,
  resolve,
  clearConsole,
  paths,
} from './utils'
import pkg from '../package.json'
import { BuildType, BuildVersion, NODE_ENV } from './types'

clearConsole()

program
  .version(pkg.version, '-V, --version', `输出${pkg.name}版本`) // 默认选项标志是-V和--version 当出现时 该命令将打印版本号并退出
  .option('-D, --debug', 'debug 测试')
  // .option('-c, --config <path>', '设置配置文件路径 默认为./zeroer-toll.config.js', 'zeroer-toll.config.js') // <> 标识如果使用了这个选项则必填  []表可选值
  // .option('--no-sauce', 'sauce') // 1.解析参数里只包括 sauce字段 默认就是true 2.没有 --sauce命令 3.如果传递了--no-sauce sauce字段值为false
  // .option('-l, --list <items>', 'list', (value, preVal: string[]) => value.split(','), [])
  // .requiredOption('-cc <type>', 'cc') // 该选项为必填项
  .helpOption('-h, --help', '显示命令帮助')
  .command('help [command]', '显示命令帮助')

program
  .command('server')
  .description('启动开发服务器')
  .option('-t, --type <type>', '构建的类型', BuildType.Ts) // TODO 将来待扩展
  .action((options: { type: BuildType }) => {
    log('正在 启动开发服务器...')
    if (options.type === BuildType.Ts) {
      execA([
        `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
        `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
        `${paths.cli.rollup}/server.ts`
      ].join(' '))
      return
    }
  })
  .on('--help', () => {
    log(`
Examples:
  npx ${pkg.name} server -t ${BuildType.Ts}`)
  })

const defaultVersions = [BuildVersion.umd, BuildVersion.cjs, BuildVersion.esm, BuildVersion.esmStreamline]
program
  .command('build')
  .alias('compiler')
  .description('构建相应的版本')
  .option('-t, --type <type>', '构建的类型', BuildType.Ts) // TODO 将来待扩展
  .option('-vs, --versions <versions>', '构建的版本', (value, preVal: string[]) => value.split(','), defaultVersions)
  .action((options: { type: BuildType; versions: BuildVersion[] }) => {

    if (program.opts().debug) {
      console.log('命令内参数 options.type =>', options.type)
      console.log('命令内参数 options.versions =>', options.versions)
      console.log('全局参数 program.opts() =>', program.opts())
    }

    log(`正在构建... 类型 ${options.type} 版本 ${options.versions.join(' ')}`)

    if (options.type === BuildType.Ts) {

      // 构建版本
      for (const version of options.versions) {
        fse.emptyDirSync(resolve(paths.project.root, version))
        if (version === BuildVersion.umd) {
          execA([
            `cross-env NODE_ENV=${NODE_ENV.PRODUCTION}`,
            `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
            `${paths.cli.rollup}/umd.ts`
          ].join(' '))
        } else {
          execA([
            `cross-env BABEL_MODULE=${version}`,
            `babel src -d ${version} -s -x .js,.jsx,.ts,.tsx`
          ].join(' '))
        }
      }

      log('构建声明文件...')
      // 构建声明文件
      const declarationFileDir = 'types' // 声明文件目录
      const rootDeclarationFileName = 'index.d.ts'
      for (const version of defaultVersions) {
        fse.removeSync(resolve(paths.project.root, version, rootDeclarationFileName))
      }
      fse.emptyDirSync(resolve(paths.project.root, declarationFileDir))
      execA(`tsc --emitDeclarationOnly --declarationDir ${declarationFileDir}`)
        .then(() => {
          // 注入 ts声明文件的（链接文件）
          for (const version of defaultVersions) {
            fse.writeFile(resolve(paths.project.root, version, rootDeclarationFileName), 'export * from \'../types\'', err => {
              if (err) return console.error(err)
            })
          }
        })

      return
    }

  })
  .on('--help', () => {
    log(`
Examples:
  npx ${pkg.name} build -t ${BuildType.Ts}
  npx ${pkg.name} build -t ${BuildType.Ts} -vs ${BuildVersion.esmStreamline}`)
  })
  

program.parse(process.argv)

// if (commandLineArgs.clear) {
//   const dirs = ['babel-loader', 'eslint-loader']
//   const cacheDir = 'node_modules/.cache'
//   for (const dir of dirs) {
//     fse.emptyDirSync(resolve(paths.project.root, cacheDir, dir))
//   }
//   log(`已清空：\n${dirs.map(dir => ` ${cacheDir}/${dir}`).join('\n')}`, 'blue')
// }

// commandLineArgs.help && log(`
// Usage: ${pkg.name} <command> [options]

//   command:
//     server              启动开发服务器
//     build:dev           构建 dev版本
//     build:prd           构建 prd版本
//     dll                 生成dll文件及清单
//     analyzer:dev        dev分析器
//     analyzer:prd        prd分析器
//     mock                启动mock数据
//     test

//   options:
//     --project, -P       指定项目的配置文件名（必须是ts文件）           [字符串]  [默认值: project.config.ts]
//     --clear, -C         清空缓存文件如 babel-loader eslint-loader      [布尔]
//     --help, -H          显示帮助信息                                   [布尔]`,
// 'blue')

// // 支持并发操作 但并不推选
// for (const commond of commandLineArgs._) {
//   switch (commond) {
//     case 'server':
//       log('正在启动 开发服务器...')
//       execA([
//         `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.webpack}/server.ts`,
//         passthroughCommandLineArgs
//       ].join(' '))
//       break
//     case 'build:dev':
//       log('正在构建 dev版本...')
//       execA([
//         `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.webpack}/build.ts`,
//         passthroughCommandLineArgs
//       ].join(' '))
//       break
//     case 'build:prd':
//       log('正在构建 prd版本...')
//       execA([
//         `cross-env NODE_ENV=${NODE_ENV.PRODUCTION}`,
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.webpack}/build.ts`,
//         passthroughCommandLineArgs
//       ].join(' '))
//       break
//     case 'dll':
//       log('正在生成dll...')
//       fse.emptyDirSync(paths.project.dll)
//       execA([
//         `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.webpack}/dll.ts`,
//         passthroughCommandLineArgs
//       ].join(' '))
//       execA([
//         `cross-env NODE_ENV=${NODE_ENV.PRODUCTION}`,
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.webpack}/dll.ts`,
//         passthroughCommandLineArgs
//       ].join(' '))
//       break
//     case 'analyzer:dev':
//       log('正在启动 dev分析器...')
//       execA([
//         `cross-env NODE_ENV=${NODE_ENV.DEVELOPMENT}`,
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.webpack}/analyzer.ts`,
//         passthroughCommandLineArgs
//       ].join(' '))
//       break
//     case 'analyzer:prd':
//       log('正在启动 prd分析器...')
//       execA([
//         `cross-env NODE_ENV=${NODE_ENV.PRODUCTION}`,
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.webpack}/analyzer.ts`,
//         passthroughCommandLineArgs
//       ].join(' '))
//       break
//     case 'mock': {
//       log('正在启动 mock数据...')
//       // https://github.com/remy/nodemon/blob/master/doc/events.md#Using_nodemon_as_child_process
//       const cp = execA([
//         'nodemon',
//         `-w ${paths.project.root}/${commandLineArgs.project} -w ${paths.project.src}/mock/data.ts`,
//         '--exec',
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.src}/mock/index.ts`,
//         mockPassthroughCommandLineArgs
//       ].join(' '))
//         .on('message', event => {
//           if (event.type === 'crash') cp.cancel() // nodemon 程序崩溃 直接退出
//         })
//       break
//     }
//     case 'test':
//       execA([
//         `ts-node -T --script-mode --project ${paths.cli.root}/tsconfig.json`,
//         `${paths.cli.src}/test/index.ts`,
//         passthroughCommandLineArgs
//       ].join(' '))
//       break
//     default:
//   }
// }
