import chalk from 'chalk'

type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' | 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';

interface Log {
  (str: string, color?: Color): void;
}

const log: Log = (str: string, color = 'green') => console.log(chalk[color](str))

const logObj = (obj: object, color: Color = 'green') => log(JSON.stringify(obj, null, 2), color)

export { log, logObj }
