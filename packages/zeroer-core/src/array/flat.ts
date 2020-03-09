import isArray from '../object/isArray'

/**
 * 展平数组 可使用原生[].flat()替换
 * @example
 * flat([1, [2, [3]]], 1) // [1, 2, [3]]
 * flat([1, [2, [3]]]) // [1, 2, 3]
 */
const flat = (arr: any[], dep = Infinity) => {
  if (!isArray(arr)) return arr
  let newArr = arr
  for (let i = 0; i < dep; i++) {
    newArr = Array.prototype.concat(...newArr)
    if (newArr.every(v => !isArray(v))) return newArr
  }
  return newArr
}

export default flat
