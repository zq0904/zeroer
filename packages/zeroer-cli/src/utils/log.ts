import chalk from 'chalk'
import readline from 'readline'

type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' | 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';

const log = (str: string, color: Color = 'green') => console.log(chalk[color](str))

const logObj = (obj: object, color: Color = 'green') => log(JSON.stringify(obj, null, 2), color)

const logToSingleLine = (str: string, color: Color = 'green') => {
  readline.cursorTo(process.stderr, 0) // 光标移动至最左 不考虑多行
  process.stderr.write(chalk[color](str))
}

export { log, logObj, logToSingleLine }
