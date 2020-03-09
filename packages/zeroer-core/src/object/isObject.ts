import { Obj } from '../types'

// 这里不应该使用泛型 使用泛型会失去类型保护 (如下面的 如果arg是对象 ts就能确定其具体的对象类型 不会认为对象的类型是Obj)
const isObject = (arg: any): arg is Obj => Object.prototype.toString.call(arg) === '[object Object]'

export default isObject
