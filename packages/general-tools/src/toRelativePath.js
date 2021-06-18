const path = require('path')
const paths = require('./paths')

/**
 * 将绝对路径转化成相对路径 相对cwd
 * @param { string } to
 * @param { string } from
 * @returns
 */
const toRelativePath = (to, from = paths.cwdDir) => path.relative(from, to)

module.exports = toRelativePath
