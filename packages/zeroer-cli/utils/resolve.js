const path = require('path')
const { projectPath, cliPath } = require('./paths')

const resolve = (p, isProjectRootDir = true) => path.resolve(isProjectRootDir ? projectPath : cliPath, p)

module.exports = resolve
