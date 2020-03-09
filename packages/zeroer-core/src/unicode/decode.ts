/**
 * Unicode解码（一般只用于 使用Unicode/encode编码的汉字解码）
 * @example
 * decode('\u4eca\u5929') // 今天
 */
const decode = (str: string) => unescape(str.replace(/\\/g, '%')) // unescape兼容safari

export default decode
