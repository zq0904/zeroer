const isDate = (arg: any): arg is Date => Object.prototype.toString.call(arg) === '[object Date]'

export default isDate
