/* eslint-disable */
const fs = require('fs')
const readline = require('readline')
// const { exec } = require('child_process')
const chalk = require('chalk')
const shell = require('shelljs')

const log = (string, color = 'green') => console.log(chalk[color](string))

const exit = () => process.exit(1)

// 将换行后的空白去除
function trim (str) {
  return str.replace(/\n(\s*)/g, '\n').trim()
}

// 原生版 由于某些原因在 npm outdated ... 报错
// const execP = command => new Promise(resolve => {
//   exec(command, (err, stdout, stderr) => {
//     if (err) return log(err, 'red')
//     resolve(stdout.toString())
//   })
// })
const execP = command => new Promise(resolve => {
  shell.exec(command, { async: true, silent: true }, (code, stdout, stderr) => {
    if (code !== 0 && stderr) return log(stderr, 'red')
    resolve(stdout)
  })
})

const readFileP = path => new Promise((resolve) => {
  fs.readFile(path, (err, data) => {
    if (err) return log(err, 'red')
    resolve(data.toString())
  })
})

// 读取指定行数
const readLineP = (path, line = 1) => {
  return new Promise(resolve => {
    const stream = fs.createReadStream(path)
    const rl = readline.createInterface({ input: stream })
    let currentLine = 0
    let res = ''
    rl.on('line', input => {
      res += input
      ++currentLine
      if (line === currentLine) {
        rl.close()
        resolve(res)
      }
    })
  })
}

const getVersion = async tool => {
  const v = await execP(`${tool} --version`)
  return v.replace(/^[\s\S]*?(\d+\.\d+\.\d+)[\s\S]*$/, '$1')
}

// 比较版本号 vs1 是否小于 vs2
// isLessThan('1.5.3', '1.12.3') => true
const isLessThan = (vs1, vs2) => {
  const [, a1, b1, c1] = vs1.trim().match(/^(\d+)\.(\d+)\.(\d+)[^\s]*/)
  const [, a2, b2, c2] = vs2.trim().match(/^(\d+)\.(\d+)\.(\d+)[^\s]*/)
  if (a1 !== a2) return a1 - a2 < 0
  if (b1 !== b2) return b1 - b2 < 0
  if (c1 !== c2) return c1 - c2 < 0
  return false
}

module.exports = {
  log,
  exit,
  trim,
  execP,
  readFileP,
  readLineP,
  getVersion,
  isLessThan,
}
