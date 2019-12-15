var z = Zero // eslint-disable-line

console.log(z)

// Array
console.log('Array.flat ', z.Array.flat([1, [2, [3]]]))
console.log('Array.remove ', z.Array.remove([1, 2, 3], 2))
console.log('Array.subtract ', z.Array.subtract([1, 2, 3], [2, 3]))
// Browser
console.log('Browser.userAgent', z.Browser.userAgent)
// Cookie
z.Cookie.set('a', 'a-val', '2019/10/24 16:47')
z.Cookie.set('b', 'b-val', 1, '/')
z.Cookie.del('b', '/')
console.log('Cookie.get ', z.Cookie.get('a'), z.Cookie.get('b'))
// Date
console.log('Date.diff ', z.Date.diff('2018/01/01', '2018/01/02 13:00:00', 'H'))
console.log('Date.format ', z.Date.format(new Date().getTime(), 'YYYY-MM-DD a hh:mm:ss'))
// Env
// Event
const event = new z.Event()
const fn = function (...args) {
  console.log('event ', this, ...args)
}
event.on('custom1', fn)
event.on('custom2', function (...args) {
  console.log('event ', this, ...args)
})
event.once('custom3', function (...args) {
  console.log('event ', this, ...args)
})
// event.off() // 清空所有
// event.off('custom1') // 清空 custom1 对应的所有事件
event.off('custom1', fn) // 清空 custom1 对应的 fn
event.emit('custom1', 'custom1', 1)
event.emit('custom2', 'custom2', 1)
event.emit('custom3', 'custom3', 1)
event.emit('custom3', 'custom3', 1)
// SessionStorage
z.SessionStorage.setItem('a', { a: 1 })
z.SessionStorage.setItem('b', '1')
z.SessionStorage.setItem('c', 1)
// z.SessionStorage.clear()
z.SessionStorage.removeItem('b')
console.log(
  'SessionStorage.getItem ',
  z.SessionStorage.getItem('a'),
  z.SessionStorage.getItem('b'),
  z.SessionStorage.getItem('c'),
)
// LocalStorage
z.LocalStorage.setItem('a', { a: 1 }) // 随浏览器进程
z.LocalStorage.setItem('b', { b: 1 }, 1) // 存1天
z.LocalStorage.setItem('c', { c: 1 }, '2019/10/31')
// z.LocalStorage.removeItem('c')
// z.LocalStorage.clear()
console.log('LocalStorage.getItem ', z.LocalStorage.getItem('a'))
console.log('LocalStorage.getItem ', z.LocalStorage.getItem('b'))
console.log('LocalStorage.getItem ', z.LocalStorage.getItem('c'))
// Number
console.log('Number.complement ', z.Number.complement('-1', 3))
console.log('Number.random ', z.Number.random(1, 10))
// Object
console.log('Object.extend ', z.Object.extend({ a: [1, 2] }, { a: [3], b: 2 }))
console.log('Object.isNull ', z.Object.isNull(null), z.Object.isNull(undefined))
console.log('Object.isUndefined ', z.Object.isUndefined(undefined), z.Object.isUndefined(null))
console.log('Object.isNumber ', z.Object.isNumber(1), z.Object.isNumber('1'))
console.log('Object.isString ', z.Object.isString(''), z.Object.isString(1))
console.log('Object.isBoolean ', z.Object.isBoolean(true), z.Object.isBoolean(''))
console.log('Object.isArray ', z.Object.isArray([]), z.Object.isArray({}))
console.log('Object.isObject ', z.Object.isObject({}), z.Object.isObject(function () {}))
console.log('Object.isFunction ', z.Object.isFunction(function () {}), z.Object.isFunction({}))
console.log('Object.isDomElement ', z.Object.isDomElement(document.getElementById('dom')), z.Object.isDomElement(1))
console.log('Object.isRegExp ', z.Object.isRegExp(/asd/), z.Object.isRegExp({}))
console.log('Object.isDate ', z.Object.isDate(new Date()), z.Object.isDate({}))
console.log('Object.isBuffer ', true, z.Object.isBuffer({}))
// Qs
console.log('Qs.stringify ', z.Qs.stringify({ a: 1, b: { c: 'c', d: { e: 'e', r: { a: 1 } } }, c: 3 }))
console.log('Qs.parse ', z.Qs.parse('a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3'))
// String
console.log('String.getQs ', z.String.getQs(), z.String.getQs('s'), z.String.getQs({
  url: 'http://localhost:4321/test/api.html?a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3#hash',
  data: 'c'
}))
console.log(
  'String.setQs ',
  z.String.setQs(),
  z.String.setQs({ b: 1, s: 5 }),
  z.String.setQs({ url: 'http://localhost:4321/test/api.html?a#hash', data: { s: 5 } }),
  z.String.setQs({ url: 'http://localhost:4321/test/api.html?#hash', data: { s: 5 } }),
)
// Unicode
console.log('Unicode.encode ', z.Unicode.encode('今天'))
console.log('Unicode.decode ', z.Unicode.decode('\u4eca\u5929'))
// User
// Util
const add = function (a, b, c) { return a + b + c }
const curryAdd = z.Util.curry(add)
console.log('Util.curry', curryAdd(1)(2)(3), curryAdd(1, 2)(3), curryAdd(1)(2, 3))
document.getElementById('debounce').addEventListener('click', z.Util.debounce(function () {
  console.log('Util.debounce ', this, 'agrs', arguments)
}, 1000))
document.getElementById('throttle').addEventListener('click', z.Util.throttle(function () {
  console.log('Util.throttle ')
}, 1000))
