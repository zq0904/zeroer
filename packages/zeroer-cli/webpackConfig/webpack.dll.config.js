const webpack = require('webpack')
const { env: { isPrd }, projectConfig, paths: { dllPath } } = require('../utils')

// 打包生成dll动态链接库 生成相应的清单文件 提供给DllReferencePlugin映射依赖项
module.exports = {
  mode: isPrd ? 'production' : 'development',
  entry: projectConfig['dll-entry'], // entry入口所引用的 vue react包 node_modules包中根据环境变量process.env.NODE_ENV 选用了生产还是开发版本 我们引入包时不用区分
  output: {
    path: dllPath,
    filename: `[name].${isPrd ? 'prd.[contenthash:7]' : 'dev'}.js`,
    library: '[name]', // 打包生成dll动态链接库 向全局暴露的一个变量名名称
  },
  optimization: { // development 也压缩
    minimize: true
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]', // 清单的name属性 与 output.library 一致 DllReferencePlugin会根据这个属性 当使用相应的库时 直接使用这个全局的变量 来提供
      path: `${dllPath}/[name].${isPrd ? 'prd' : 'dev'}.manifest.json`, // 输出清单路径
    })
  ]
}

// 会将依赖打包成一个全局函数 并生成相应清单
// 源码中在使用 import React from 'react' 这个react是从这个全局变量提供的
// 对比 externals 外控者 选项 只有在需要时单独打包 不会浪费每次打包速度 请求文件的个数减少 暴露的全局变量减少
