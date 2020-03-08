/**
 * 对目标’数字‘进行补0处理
 * @example
 * complement(12, 2) // '12'
 * complement(-1, 2) // '-01'
 * complement(-1, -2) // '-1'
 */
const complement = (number: number, length: number) => {
  const prefix = number < 0 ? '-' : ''
  const s = String(Math.abs(number))
  return prefix + '0'.repeat(length - s.length > 0 ? length - s.length : 0) + s
}

/**
 * 随机生成一个包含 min max 的整数数字
 * @example
 * random(1, 3) // 1 | 2 | 3
 */
const random = (min: number, max: number) => {
  if (max < min) [min, max] = [max, min]
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

export {
  complement,
  random,
}
