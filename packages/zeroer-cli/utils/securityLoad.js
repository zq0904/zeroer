module.exports = (path, defaultVal = {}) => {
  try {
    return require(path)
  } catch (err) {
    return defaultVal
  }
}