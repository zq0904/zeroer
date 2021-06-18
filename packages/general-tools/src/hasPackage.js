/**
 * 包是否存在
 * @param {string} packageName 包的名称
 * @returns {boolean}
 */
const hasPackage = (packageName) => {
  try {
    require.resolve(packageName)
    return true
  } catch (err) {
    return false
  }
}
