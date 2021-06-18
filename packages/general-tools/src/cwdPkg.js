const path = require('path')
const { cwdDir } = require('./paths')
const { log } = require('./log')

/**
 * @type {{ [k: string]: any }}
 */
let cwdPkg = {}

try {
  cwdPkg = require(path.resolve(cwdDir, 'package.json'))
} catch (err) {
  log(`warning: ${err.message}`, 'yellow')
}

module.exports = cwdPkg
