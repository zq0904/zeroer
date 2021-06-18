const pkg = require('../../package.json')

const commandName = Object.keys(pkg.bin)[0]

/**
 * 命令枚举
 */
const Commands = {
  publish: 'publish',
}

module.exports = {
  commandName,
  Commands,
}
