var z = zeroerCore // eslint-disable-line
console.log(z)

// Array
console.log(
  'Array.flat ',
  z.Array.flat([1, [2, [3]]], 1),
  z.Array.flat([1, [2, [3]]])
)
console.log('Array.remove ', z.Array.remove([1, 2, 3], 2))
console.log('Array.subtract ', z.Array.subtract([1, 2, 3], [2, 3]))

// Browser
console.log('Browser.userAgent', z.Browser.userAgent)

// Cookie
z.Cookie.set('a', 'aVal', '2019/09/04 16:50') // 存储到'2019/09/04 16:50'
z.Cookie.set('b', 'bVal', 1, '/') // 存储1天
z.Cookie.set('c', 'cVal') // 当前会话期间
// z.Cookie.del('b', '/')
console.log(
  'Cookie.get ',
  z.Cookie.get('a'),
  z.Cookie.get('b'),
  z.Cookie.get('c')
)

// Date
console.log('Date.format ',
  z.Date.format(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
  z.Date.format('2019/09/04 13:00', 'YYYY-MM-DD HH:mm:ss'),
  z.Date.format('2019-09-04 13:00', 'YYYY-MM-DD HH:mm:ss'),
  z.Date.format(new Date()),
  z.Date.format(new Date().getTime(), 'YYYY-MM-DD a hh:mm:ss')
)
console.log('Date.diff ',
  z.Date.diff(new Date('2018/01/01').getTime(), new Date('2018/01/02 13:00:00').getTime(), 'H'),
  z.Date.diff('2018-01-01', '2018/01/02 13:00:00', 'H'),
  z.Date.diff(new Date('2018/01/01'), new Date('2018/01/02 13:00:00'), 'H'),
  z.Date.diff('2018/01/01', new Date('2018/01/02 13:00:00'), 'H')
)

// Env

// Event
var event = new z.Event()
var fn = function (...args) { console.log('event ', this, ...args) }
event.on('customEventName1', fn)
event.on('customEventName2', function (...args) { console.log('event ', this, ...args) })
event.once('customEventName3', function (...args) { console.log('event ', this, ...args) })
// event.off() // 清空所有
// event.off('customEventName1') // 清空 customEventName1 对应的所有事件
// event.off('customEventName1', fn) // 清空 customEventName1 对应的 fn
event.emit('customEventName1', 1)
event.emit('customEventName2', 2)
event.emit('customEventName3', 3)
event.emit('customEventName3', 3)

// LocalStorage
z.LocalStorage.setItem('a', { a: 1 }) // 随浏览器进程
z.LocalStorage.setItem('b', { b: 1 }, 1) // 存1天
z.LocalStorage.setItem('c', { c: 1 }, '2020/03/07')
// z.LocalStorage.removeItem('c')
// z.LocalStorage.clear()
console.log(
  'LocalStorage.getItem ',
  z.LocalStorage.getItem('a'),
  z.LocalStorage.getItem('b'),
  z.LocalStorage.getItem('c')
)

// Number
console.log(
  'Number.complement ',
  z.Number.complement(12, 2),
  z.Number.complement(-1, 2),
  z.Number.complement(-1, -2)
)
console.log('Number.random ', z.Number.random(1, 10))

// Object
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
var aObj1 = { obj: { a: 1 }, arr: [1, 2], v: 1 }
var bObj1 = { obj: { b: 2 }, arr: [3, 4, 5], v: 2 }
var cObj1 = z.Object.extend(aObj1, bObj1)
var aObj2 = { obj: { a: 1 }, arr: [1, 2], v: 1 }
var bObj2 = { obj: { b: 2 }, arr: [3, 4, 5], v: 2 }
var cObj2 = z.Object.extend(true, aObj2, bObj2)
console.log(
  'Object.extend ',
  cObj1,
  cObj2
)

// Qs
console.log(
  'Qs.stringify ',
  z.Qs.stringify({ a: 1, b: { c: 'c', d: { e: 'e', r: { a: 1 } } }, c: 3 })
)

console.log(
  'Qs.parse ',
  z.Qs.parse('a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3')
)

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

// String
console.log(
  'String.getQs ',
  z.String.getQs(),
  z.String.getQs('a'),
  z.String.getQs({ url: 'http://localhost:4321/test/api.html?a=1&b=2#hash' }),
  z.String.getQs({ url: 'http://localhost:4321/test/api.html?a=1&b=2#hash', data: 'a' })
)

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
window.addEventListener('scroll', z.Util.throttle(function() {
  console.log('Util.throttle ', this, 'agrs', arguments)
}, 400))

var inputDom = document.getElementById('debounce')
inputDom.addEventListener('input', z.Util.debounce(function () {
  console.log('Util.debounce ', this, 'agrs', arguments)
}, 400))

var add = function (a, b, c) { return a + b + c }
var curryAdd = z.Util.curry(add)
console.log(
  'Util.curry',
  curryAdd(1)(2)(3),
  curryAdd(1, 2)(3),
  curryAdd(1)(2, 3)
)

var c = z.Util.compose(Math.abs, Math.pow)
console.log(
  'Util.compose',
  c(-2, 3)
)

var p = z.Util.pipe(Math.pow, Math.abs)
console.log(
  'Util.pipe',
  p(-2, 3)
)
