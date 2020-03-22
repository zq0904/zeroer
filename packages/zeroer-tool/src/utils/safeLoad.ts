// 约束类型 分配给 T https://github.com/Microsoft/TypeScript/issues/29049

type obj = {
  [key: string]: any;
}

// 我没有办法使用 import() 它是异步的 在流程控制上 无法用于导出
// 一个ts文件默认导出 require().default 得到默认导出对象
// 一个json文件 require() 得到json对象
const safeLoad = <T extends obj = obj>(path: string, defaultVal: obj = { default: {} }) => {
  try {
    return require(path) as T
  } catch (err) {
    return defaultVal as T
  }
}

export { safeLoad }
