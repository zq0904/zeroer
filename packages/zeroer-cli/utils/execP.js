// execa优点 1.包装了 child_process (实际上是基于node-cross-spawn的进一步封装) 2.支持promise 3.从输出中删除最终换行符
const execa = require('execa')
const log = require('./log')

module.exports = (command, options = {}) => execa.command(command, {
  preferLocal: true, // 在查找要执行的二进制文件时，首选本地安装的二进制文件 node_modules/.bin/ 下指令
  // LOCALDIR: process.cwd(), // 在（使用preferLocal）中查找本地安装的二进制文件的首选路径 默认 process.cwd()
  // cwd: process.cwd(), // 指定子进程的当前工作目录 默认 process.cwd()
  stdout: 'inherit', // inherit 运行命令的输出直接打印在控制台 默认是pipe 不直接在控制台输出
  ...options
}).catch(err => {
  log(err, 'red')
})
