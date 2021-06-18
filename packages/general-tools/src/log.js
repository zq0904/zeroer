const chalk = require('chalk')
const readline = require('readline')

/**
 * @typedef { 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' | 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright' } Color
 */

const indentation = 2

/**
 * 输出带颜色的日志
 * @param { string | string[] } info 
 * @param { Color } color 
 */
const log = (info, color = 'green') => {
  if (!Array.isArray(info)) info = [info]
  const str = info.join('\n' + ' '.repeat(indentation))
  console.log(chalk[color](str))
}

/**
 * 输出 对象
 * @param { {[ k:string]: any } } obj 
 * @param { Color } color 
 */
const logObj = (obj, color = 'green') => log(JSON.stringify(obj, null, 2), color)

/**
 * 
 * @param { string } str 
 * @param { Color } color 
 */
const logToSingleLine = (str, color = 'green') => {
  readline.cursorTo(process.stderr, 0) // 光标移动至最左 不考虑多行
  process.stderr.write(chalk[color](str))
}

module.exports = {
  chalk,
  log,
  logObj,
  logToSingleLine
}
