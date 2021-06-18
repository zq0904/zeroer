const { execa, getDEO } = require('./execa')

/**
 * 本机是否存在yarn
 * @returns
 */
const hasYarn = async () => {
  try {
    await execa.command('yarn -v', getDEO())
    return true
  } catch (err) {
    return false
  }
}

module.exports = hasYarn
