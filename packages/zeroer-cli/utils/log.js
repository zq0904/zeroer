const chalk = require('chalk')

const log = (string, color = 'green') => console.log(chalk[color](string))

module.exports = log
