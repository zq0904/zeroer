/**
 * 从数组中删除指定的值
 * @example
 * remove([1, 2, 3], 2) // [1, 3]
 */
const remove = (arr: any[], val: any) => {
  const index = arr.findIndex(v => v === val)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

export default remove
