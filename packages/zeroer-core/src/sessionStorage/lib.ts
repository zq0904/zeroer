const PREFIX = '__sS__'

// 是否是无痕
const isTrace = () => {
  try {
    const TEST = '__test__'
    sessionStorage.setItem(TEST, TEST)
    sessionStorage.removeItem(TEST)
    return false
  } catch (err) {
    console.error(err)
    return true
  }
}

export {
  PREFIX,
  isTrace,
}
