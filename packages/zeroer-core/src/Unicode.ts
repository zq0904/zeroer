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

/**
 * Unicode解码（一般只用于 使用Unicode/encode编码的汉字解码）
 * @example
 * decode('\u4eca\u5929') // 今天
 */
const decode = (str: string) => unescape(str.replace(/\\/g, '%')) // unescape兼容safari

export { encode, decode }
