const chalk = require('chalk')
const execa = require('execa')
const shell = require('shelljs')

const log = (str, color = 'green') => console.log(chalk[color](str))

const logObj = (obj, color = 'green') => log(JSON.stringify(obj, null, 2), color)

// 执行命令 直接输出
const execA = (command, options = {}) => {
  const cp = execa.command(command, {
    preferLocal: true,
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    ...options
  })
  cp.on('error', (err) => {
    log(`执行命令：${command} 时出错!`, 'red')
    logObj(err, 'red')
  })
  return cp
}

// 执行命令获取结果 不输出
const execRes = (command, options = {}) => execA(command, { stdio: 'pipe', ...options }).then(res => res.stdout)

const execP = command => new Promise(resolve => {
  shell.exec(command, { async: true, silent: true }, (code, stdout, stderr) => {
    if (code !== 0 && stderr) return log(stderr, 'red')
    resolve(stdout)
  })
})

const getVersion = async tool => {
  const v = await execRes(`${tool} --version`)
  return v.replace(/^[\s\S]*?(\d+\.\d+\.\d+)[\s\S]*?$/, '$1')
}

module.exports = {
  log,
  logObj,
  execA,
  execRes,
  execP,
  getVersion,
}
