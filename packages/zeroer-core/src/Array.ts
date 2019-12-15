import { isArray } from './Object'

// 展平数组
const flat = (arr: any[], dep = Infinity) => {
  if (!isArray(arr)) return arr
  let newArr = arr
  for (let i = 0; i < dep; i++) {
    newArr = Array.prototype.concat(...newArr)
    if (newArr.every(v => !isArray(v))) return newArr
  }
  return newArr
}

// 从数组中删除指定的值
const remove = (arr: any[], val: any) => {
  const index = arr.findIndex(v => v === val)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

// 数组做差 得到一个新数组
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

export {
  flat,
  remove,
  subtract,
}
