/**
 * Unicode编码（一般只用于 插件的汉字编码）
 * @example
 * encode('今天') // \u4eca\u5929
 */
const encode = (str: string) => {
  const arr = []
  for (const s of str) {
    arr.push(('00' + s.charCodeAt(0).toString(16)).slice(-4))
  }
  return '\\u' + arr.join('\\u')
}

export default encode
