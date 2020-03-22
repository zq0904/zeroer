// 不管是主进程还是子进程 都能拿到主进程的命令行参数 (透传)
import minimist from 'minimist'
import { defaultCommandLineArgs } from '../types'

const COMMANDLINEARGS = 'COMMANDLINEARGS'

// 当前进程的命令行参数
const args = minimist(process.argv.slice(2))

// 是否是主进程 主进程没有透传的这个参数
const isMainProcess = !args[COMMANDLINEARGS]

// 透传的命令行参数
const passthroughCommandLineArgs = `--${COMMANDLINEARGS} ${isMainProcess ? JSON.stringify(args) : args[COMMANDLINEARGS]}`

// 仅针对mock的 透传参数 这可能是 nodemon命令行嵌套的原因
const mockPassthroughCommandLineArgs = `--${COMMANDLINEARGS} ${JSON.stringify(JSON.stringify(args))}`

interface TopArgs {
  V?: boolean;
  version?: boolean;
  D?: boolean;
  debug?: boolean;
  h?: boolean;
  help?: boolean;
  c: string;
  config: string;
  [other: string]: any;
}

// 主进程命令行参数
const topArgs: TopArgs = isMainProcess ? args : JSON.parse(args[COMMANDLINEARGS])

const commandLineArgs = {
  config: topArgs.c ?? topArgs.config ?? defaultCommandLineArgs.config,
  _: topArgs._
}

export {
  commandLineArgs,
  passthroughCommandLineArgs,
  mockPassthroughCommandLineArgs,
}
