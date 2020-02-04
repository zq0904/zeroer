
import style from './style'
import { paths, config, resolve } from '../../../utils'

const name = '[name].[contenthash:7].[ext]'

const rules = [ // 双倒序规则
  {
    test: /\.(t|j)sx?$/,
    exclude: /(node_modules|bower_components)/,
    include: paths.project.src, // 最好设置以优化性能
    use: {
      loader: 'babel-loader',
      // TODO 应该开启缓存
      // options: {
      //   configFile: resolve(paths.cli.root, 'babel'), // 手动指定配置文件
      //   cacheDirectory: true, // 在node_modules/.cache/babel-loader缓存
      // }
    },
  },
  {
    enforce: ('pre' as 'pre'), // 优先级最高
    test: /\.(t|j)sx?$/,
    exclude: /(node_modules|bower_components)/,
    include: paths.project.src,
    use: {
      loader: 'eslint-loader',
      options: {
        cache: true,
        failOnError: true, // eslint错误 将导致构建失败
        failOnWarning: true, // eslint警告 将导致构建失败
      }
    },
  },
  style,
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader', // url-loader 依赖于 file-loader
    options: {
      limit: 5 * 1024, // url-loader 小于limit DataURl编码内置模板 大于limit file-loader 直接拷贝原文件修改url路径
      outputPath: `${config.project.version}/images`,
      name, // css样式中的url相对路径 import导入的
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/,
    loader: 'url-loader',
    options: {
      limit: 5 * 1024,
      outputPath: `${config.project.version}/fonts`,
      name,
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
    loader: 'url-loader',
    options: {
      limit: 5 * 1024,
      outputPath: `${config.project.version}/media`,
      name,
    }
  },
  // { // npm i -D script-loader exports-loader 对于非cjs规范 使用loader模块化 加载如Zepto AMD规范的模块
  //   test: require.resolve('zepto'),
  //   loader: 'exports-loader?window.Zepto!script-loader'
  // },
  // { // npm i -D expose-loader 将第三方包直接打到全局 当使用过一次 import $ from 'jquery'  $ jQuery 就会被挂载到全局 其他文件中不用再次导入
  //   test: require.resolve('jquery'),
  //   use: [{
  //     loader: 'expose-loader', 
  //     options: '$'
  //   }, {
  //     loader: 'expose-loader',
  //     options: 'jQuery'
  //   }]
  // },
]

export default rules
