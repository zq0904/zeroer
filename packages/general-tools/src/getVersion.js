const getVersion = (str) => str.replace(/^[\s\S]*?(\d+\.\d+\.\d+)[\s\S]*$/, '$1')

module.exports = getVersion
