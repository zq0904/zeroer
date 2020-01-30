import Webpack from 'webpack'
import { isPrd, config, paths } from '../utils'
import run from './run'

// https://github.com/webpack/webpack/tree/master/examples/dll
// 1.会将依赖打包成一个全局函数 2.生成相应的清单文件 提供给Webpack.DllReferencePlugin映射依赖项
// 源码中在使用 import React from 'react' 这个react是从这个全局变量提供的
// 对比 externals 外控者 选项 只有在需要时单独打包 不会浪费每次打包速度 请求文件的个数减少 暴露的全局变量减少

const dll: Webpack.Configuration = {
  mode: isPrd ? 'production' : 'development',
  entry: config['dll-entry'], // entry入口所引用的 vue react包 node_modules包中根据环境变量process.env.NODE_ENV 选用了生产还是开发版本 我们引入包时不用区分
  output: {
    path: paths.project.dll,
    filename: `[name].${isPrd ? 'prd' : 'dev'}.[contenthash:7].js`,
    library: '[name]', // 打包生成dll动态链接库 向全局暴露的一个变量名名称
  },
  optimization: { // development 也压缩
    minimize: true
  },
  plugins: [
    new Webpack.DllPlugin({
      path: `${paths.project.dll}/[name].${isPrd ? 'prd' : 'dev'}.manifest.json`, // 输出清单路径
      name: '[name]', // 清单的name属性 与 output.library 一致 DllReferencePlugin会根据这个属性 当使用相应的库时 直接使用这个全局的变量 来提供
    })
  ]
}

run(dll)
