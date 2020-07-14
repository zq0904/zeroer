// 约束类型 分配给 T https://github.com/Microsoft/TypeScript/issues/29049

type obj = {
  default: object;
  [key: string]: any;
}

const safeLoad = <T extends obj = obj>(path: string, defaultVal: obj = { default: {} }) => {
  try {
    return require(path) as T
  } catch (err) {
    console.error(err)
    return defaultVal as T
  }
}

export { safeLoad }
