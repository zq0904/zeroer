import stringify from '../qs/stringify'
import parse from '../qs/parse'

function calculate (href: string, obj = {}) {
  let hash = ''
  // 去除hash
  const index = href.indexOf('#')
  if (index > -1) {
    hash = href.substr(index)
    href = href.replace(hash, '')
  }
  if (href.match(/^(.*?\?)(.*)$/)) {
    const newQs = Object.assign(parse(RegExp.$2), obj)
    return RegExp.$1 + stringify(newQs) + hash
  }
  return href + '?' + stringify(obj) + hash
}

export {
  calculate,
}
