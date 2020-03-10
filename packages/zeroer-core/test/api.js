var z = zeroerCore // eslint-disable-line
console.log(z)

// array
console.log(
  'array.flat ',
  z.array.flat([1, [2, [3]]], 1),
  z.array.flat([1, [2, [3]]])
)
console.log('array.remove ', z.array.remove([1, 2, 3], 2))
console.log('array.subtract ', z.array.subtract([1, 2, 3], [2, 3]))

// browser
console.log('browser.userAgent', z.browser.getUserAgent())

// cookie
z.cookie.set('a', 'aVal', '2019/09/04 16:50') // 存储到'2019/09/04 16:50'
z.cookie.set('b', 'bVal', 1, '/') // 存储1天
z.cookie.set('c', 'cVal') // 当前会话期间
// z.cookie.del('b', '/')
console.log(
  'cookie.get ',
  z.cookie.get('a'),
  z.cookie.get('b'),
  z.cookie.get('c')
)

// date
console.log('date.format ',
  z.date.format(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
  z.date.format('2019/09/04 13:00', 'YYYY-MM-DD HH:mm:ss'),
  z.date.format('2019-09-04 13:00', 'YYYY-MM-DD HH:mm:ss'),
  z.date.format(new Date()),
  z.date.format(new Date().getTime(), 'YYYY-MM-DD a hh:mm:ss')
)
console.log('date.diff ',
  z.date.diff(new Date('2018/01/01').getTime(), new Date('2018/01/02 13:00:00').getTime(), 'H'),
  z.date.diff('2018-01-01', '2018/01/02 13:00:00', 'H'),
  z.date.diff(new Date('2018/01/01'), new Date('2018/01/02 13:00:00'), 'H'),
  z.date.diff('2018/01/01', new Date('2018/01/02 13:00:00'), 'H')
)

// env

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

// localStorage
z.localStorage.setItem('a', { a: 1 }) // 随浏览器进程
z.localStorage.setItem('b', { b: 1 }, 1) // 存1天
z.localStorage.setItem('c', { c: 1 }, '2020/03/07')
// z.localStorage.removeItem('c')
// z.localStorage.clear()
console.log(
  'localStorage.getItem ',
  z.localStorage.getItem('a'),
  z.localStorage.getItem('b'),
  z.localStorage.getItem('c')
)

// number
console.log(
  'number.complement ',
  z.number.complement(12, 2),
  z.number.complement(-1, 2),
  z.number.complement(-1, -2)
)
console.log('number.random ', z.number.random(1, 10))

// object
console.log('object.isNull ', z.object.isNull(null), z.object.isNull(undefined))
console.log('object.isUndefined ', z.object.isUndefined(undefined), z.object.isUndefined(null))
console.log('object.isNumber ', z.object.isNumber(1), z.object.isNumber('1'))
console.log('object.isString ', z.object.isString(''), z.object.isString(1))
console.log('object.isBoolean ', z.object.isBoolean(true), z.object.isBoolean(''))
console.log('object.isArray ', z.object.isArray([]), z.object.isArray({}))
console.log('object.isObject ', z.object.isObject({}), z.object.isObject(function () {}))
console.log('object.isFunction ', z.object.isFunction(function () {}), z.object.isFunction({}))
console.log('object.isDomElement ', z.object.isDomElement(document.getElementById('dom')), z.object.isDomElement(1))
console.log('object.isRegExp ', z.object.isRegExp(/asd/), z.object.isRegExp({}))
console.log('object.isDate ', z.object.isDate(new Date()), z.object.isDate({}))
console.log('object.isBuffer ', true, z.object.isBuffer({}))
var aObj1 = { obj: { a: 1 }, arr: [1, 2], v: 1 }
var bObj1 = { obj: { b: 2 }, arr: [3, 4, 5], v: 2 }
var cObj1 = z.object.extend(aObj1, bObj1)
var aObj2 = { obj: { a: 1 }, arr: [1, 2], v: 1 }
var bObj2 = { obj: { b: 2 }, arr: [3, 4, 5], v: 2 }
var cObj2 = z.object.extend(true, aObj2, bObj2)
console.log(
  'object.extend ',
  cObj1,
  cObj2
)

// qs
console.log(
  'qs.stringify ',
  z.qs.stringify({ a: 1, b: { c: 'c', d: { e: 'e', r: { a: 1 } } }, c: 3 })
)

console.log(
  'qs.parse ',
  z.qs.parse('a=1&b%5Bc%5D=c&b%5Bd%5D%5Be%5D=e&b%5Bd%5D%5Br%5D%5Ba%5D=1&c=3')
)

// sessionStorage
z.sessionStorage.setItem('a', { a: 1 })
z.sessionStorage.setItem('b', '1')
z.sessionStorage.setItem('c', 1)
// z.sessionStorage.clear()
z.sessionStorage.removeItem('b')
console.log(
  'sessionStorage.getItem ',
  z.sessionStorage.getItem('a'),
  z.sessionStorage.getItem('b'),
  z.sessionStorage.getItem('c'),
)

// string
console.log(
  'string.getQs ',
  z.string.getQs(),
  z.string.getQs('a'),
  z.string.getQs({ url: 'http://localhost:4321/test/api.html?a=1&b=2#hash' }),
  z.string.getQs({ url: 'http://localhost:4321/test/api.html?a=1&b=2#hash', data: 'a' })
)

console.log(
  'string.setQs ',
  z.string.setQs(),
  z.string.setQs({ b: 1, s: 5 }),
  z.string.setQs({ url: 'http://localhost:4321/test/api.html?a#hash', data: { s: 5 } }),
  z.string.setQs({ url: 'http://localhost:4321/test/api.html?#hash', data: { s: 5 } }),
)

// unicode
console.log('unicode.encode ', z.unicode.encode('今天'))
console.log('unicode.decode ', z.unicode.decode('\u4eca\u5929'))

// util
window.addEventListener('scroll', z.util.throttle(function() {
  console.log('util.throttle ', this, 'agrs', arguments)
}, 400))

var inputDom = document.getElementById('debounce')
inputDom.addEventListener('input', z.util.debounce(function () {
  console.log('util.debounce ', this, 'agrs', arguments)
}, 400))

var add = function (a, b, c) { return a + b + c }
var curryAdd = z.util.curry(add)
console.log(
  'util.curry',
  curryAdd(1)(2)(3),
  curryAdd(1, 2)(3),
  curryAdd(1)(2, 3)
)

var c = z.util.compose(Math.abs, Math.pow)
console.log(
  'util.compose',
  c(-2, 3)
)

var p = z.util.pipe(Math.pow, Math.abs)
console.log(
  'util.pipe',
  p(-2, 3)
)
