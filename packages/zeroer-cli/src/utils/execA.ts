// https://www.npmjs.com/package/execa
// execa优点 1.包装了 child_process (实际上是基于node-cross-spawn的进一步封装) 2.支持promise 3.从输出中删除最终换行符
import execa from 'execa'
import { log, logObj } from './log'

const execA = (command: string, options: execa.Options = {}) => {
  const cp = execa.command(command, {
    preferLocal: true, // 在查找要执行的二进制文件时，首选本地安装的二进制文件 node_modules/.bin/ 下指令
    // localDir: process.cwd(), // 在中查找本地安装的二进制文件的首选路径（与结合使用preferLocal） 默认process.cwd()
    // cwd: process.cwd(), // 子进程的当前工作目录 默认 process.cwd()
    // stdin: 'inherit', // 默认pipe 以流的形式输入 一些如inquirer与用户交互的库希望从控制台直接输入
    // stdout: 'inherit', // 默认pipe 以流的形式输出 不直接在控制台输出 inherit 输出直接打印在控制台
    // stderr: 'inherit',
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    ...options
  })
  cp.on('error', (err) => {
    log(`执行命令：${command} 时出错!`, 'red')
    logObj(err, 'red')
  })
  return cp
}

export { execA }
