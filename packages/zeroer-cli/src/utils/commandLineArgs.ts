// 注意 只会在加载该文件的进程中 解析命令行参数
import minimist from 'minimist'

const COMMANDLINEARGS = 'COMMANDLINEARGS'

const strs = minimist(process.argv.slice(2))[COMMANDLINEARGS]

// 透传的命令行参数
const passthroughCommandLineArgs = `--${COMMANDLINEARGS} ${strs}`
// 仅针对mock的 透传参数 这可能是 nodemon命令行嵌套的原因
const mockPassthroughCommandLineArgs = `--${COMMANDLINEARGS} ${JSON.stringify(strs)}`

interface Args {
  project?: string;
  p?: string;
  _: string[];
  [other: string]: any;
}

const args: Args = JSON.parse(strs)

const commandLineArgs = {
  project: args.project || args.p || 'project.config.ts',
  _: args._
}

export {
  passthroughCommandLineArgs,
  mockPassthroughCommandLineArgs,
  commandLineArgs,
}
