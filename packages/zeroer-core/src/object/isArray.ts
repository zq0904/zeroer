// 声明类型保护
const isArray = (arg: any): arg is any[] => Object.prototype.toString.call(arg) === '[object Array]'

export default isArray
