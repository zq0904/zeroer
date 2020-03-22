#!/usr/bin/env ts-node-script -T -O {"target":"ES2019","module":"commonjs","strict":true,"esModuleInterop":true,"forceConsistentCasingInFileNames":true}
import fse from 'fs-extra'
import { program } from 'commander'
import {
  log,
  execA,
  resolve,
  clearConsole,
  passthroughCommandLineArgs,
  paths,
} from './utils'
import pkg from '../package.json'
import { BuildType, BuildVersion, NODE_ENV, defaultCommandLineArgs } from './types'

clearConsole()

program
  .version(pkg.version, '-V, --version', `输出${pkg.name}版本`) // 默认选项标志是-V和--version 当出现时 该命令将打印版本号并退出
  .option('-c, --config <path>', '项目的配置文件路径 基于项目的根目录', defaultCommandLineArgs.config)
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
        `${paths.cli.rollup}/server.ts`,
        passthroughCommandLineArgs
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
          // umd 注入 ts声明文件的（链接文件）
          fse.writeFile(resolve(paths.project.root, version, 'index.d.ts'), `export * from \'../${BuildVersion.cjs}\'`, err => {
            if (err) return console.error(err)
          })
        } else {
          execA([
            `cross-env BABEL_MODULE=${version}`,
            `babel src -d ${version} -s -x .js,.jsx,.ts,.tsx`
          ].join(' '))
          // 发出对应版本的声明文件 由于模块化加载 声明文件只能放到相应的目录中 只打包一份声明文件的方式没有意义
          execA(`tsc --emitDeclarationOnly --declarationDir ${version}`)
        }
      }

      return
    }

  })
  .on('--help', () => {
    log(`
Examples:
  npx ${pkg.name} build -t ${BuildType.Ts} -vs ${defaultVersions.join(',')}`)
  })
  

program.parse(process.argv)
