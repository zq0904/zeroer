/**
 * 获取cookie
 * @example
 * get('a')
 */
const get = (name: string) => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  return arr ? decodeURIComponent(arr[2]) : null
}

export default get
