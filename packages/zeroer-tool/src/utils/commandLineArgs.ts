// 不管是主进程还是子进程 都能拿到主进程的命令行参数 (透传)
import minimist from 'minimist'

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
  project?: string;
  P?: string;
  clear?: boolean;
  C?: boolean;
  help?: boolean;
  H?: boolean;
  // TODO 如果以后编译成js 可以考虑 -T ts源码执行
  _: Array<'server' | 'build:dev' | 'build:prd' | 'dll' | 'analyzer:dev' | 'analyzer:prd' | 'mock' | 'test'>;
  [other: string]: any;
}

// 主进程命令行参数
const topArgs: TopArgs = isMainProcess ? args : JSON.parse(args[COMMANDLINEARGS])

const commandLineArgs = {
  project: topArgs.project ?? topArgs.P ?? 'project.config.ts',
  clear: topArgs.clear ?? topArgs.C ?? false,
  help: topArgs.help ?? topArgs.H ?? false,
  _: topArgs._
}

export {
  commandLineArgs,
  passthroughCommandLineArgs,
  mockPassthroughCommandLineArgs,
}
