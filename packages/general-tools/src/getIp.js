const os = require('os')
const ifaces = os.networkInterfaces()

/**
 * 获取本机ip
 * @returns { string[] }
 */
const getIp = () => {
  let arr = []
  for (const key of Object.keys(ifaces)) arr = arr.concat(ifaces[key])
  // 过滤 内部地址(即127.0.0.1)和非ipv4地址
  arr = arr.filter(
    ({ family, internal }) => family === 'IPv4' && internal === false
  )
  return arr.map(({ address }) => address)
}

module.exports = getIp
