const fse = require('./fs-extra')
const commander = require('./commander')
const inquirer = require('./inquirer')
const globby = require('./globby')
const urlJoin = require('./url-join')
const ejs = require('./ejs')
const tapable = require('./tapable')
const babel = require('./babel')

const paths = require('./paths')
const clearConsole = require('./clearConsole')
const getIp = require('./getIp')
const getVersion = require('./getVersion')
const getContentHash = require('./getContentHash')
const hasYarn = require('./hasYarn')
const hasPackage = require('./hasPackage')
const setNodeEnv = require('./setNodeEnv')
const cwdPkg = require('./cwdPkg')
const argv = require('./argv')
const dataExtend = require('./dataExtend')
const toRelativePath = require('./toRelativePath')

module.exports = {
  fse,
  commander,
  inquirer,
  globby,
  urlJoin,
  ejs,
  tapable,
  babel,
  ...require('./execa'),
  ...require('./log'),
  paths,
  clearConsole,
  getIp,
  getVersion,
  getContentHash,
  hasYarn,
  hasPackage,
  setNodeEnv,
  cwdPkg,
  argv,
  dataExtend,
  toRelativePath,
}
