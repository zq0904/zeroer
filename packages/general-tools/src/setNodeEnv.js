/**
 * 设置 NODE_ENV
 * @param { 'production' | 'development' } defaultEnv 
 */
const setNodeEnv = (defaultEnv) => {
  process.env.NODE_ENV = process.env.NODE_ENV || defaultEnv
}

module.exports = setNodeEnv
