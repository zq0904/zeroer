const crypto = require('crypto')

/**
 * 获取 Buffer 的 hash
 * @param { Buffer } content
 * @returns { string }
 */
const getContentHash = (content) => {
  const md5 = crypto.createHash('md5')
  md5.update(content)
  return md5.digest('hex')
}

module.exports = getContentHash
