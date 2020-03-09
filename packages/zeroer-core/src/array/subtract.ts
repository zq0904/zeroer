/**
 * 数组做差（得到一个新数组）
 * @example
 * subtract([1, 2, 3], [2, 3]) // [1]
 */
const subtract = (target: any[], arr: any[]) => {
  const result = []
  for (const v of target) {
    let b = false // 标识
    for (const val of arr) {
      if (v === val) {
        b = true
        break
      }
    }
    if (!b) {
      result.push(v)
    }
  }
  return result
}

export default subtract
