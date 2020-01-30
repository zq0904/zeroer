import merge from 'webpack-merge'
import base from './base'
import { paths, config } from '../../utils'

const dev = merge(base, {
  devServer: { // webpack-dev-server 提供了对资产的快速 内存 访问 内存效率更高
    contentBase: paths.project.distPath,
    compress: true, // 启用gzip压缩
    hot: true, // 热模块更换 打补丁的方式 style-loader已经实现了HMR接口会使用热模块更换 js代码需要自己实现HMR接口
    overlay: true, // 编译错误遮罩提示
    // open: true,
    // host: '127.0.0.1',
    // port: 8080,
    // proxy: { // 开发环境代理
    //   '/api': {
    //     target: 'http://127.0.0.1:3004', // 请求路径是以 /api 开头的 会代理到的地址
    //     pathRewrite: { '^/api': '' } // 路径重写规则
    //   }
    // },
    ...config.devServer
  }
})

export default dev
