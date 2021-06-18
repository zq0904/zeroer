const execa = require('execa')

const getDEO = () => ({
  shell: true,
  preferLocal: true,
  localDir: __dirname, // 查找本地安装二进制文件的首选路径(与preferLocal一起使用) 主要用于解决 npm link 查找时的问题
})

module.exports = {
  execa,
  getDEO,
}
