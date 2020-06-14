import Webpack from 'webpack'
import rules from './rules'
import plugins from './plugins'
import { isPrd, paths, config } from '../../utils'
import { NODE_ENV } from '../../types'

const base: Webpack.Configuration = {
  // production模式自带的优化
  // 1.默认开启 tree shaking (依赖于import export 静态语法)
  // 2.scope hoisting 分析模块之间的依赖关系 (依赖于import export 静态语法)
  // 3.压缩js
  mode: isPrd ? NODE_ENV.PRODUCTION : NODE_ENV.DEVELOPMENT,
  devtool: isPrd ? 'hidden-source-map' : 'cheap-module-eval-source-map', // eval版本 不会单独提取.map文件 提高重构效率
  entry: `${paths.project.src}/index.tsx`,
  output: {
    path: paths.project.distPath,
    // https://stackoverflow.com/questions/50217480/cannot-use-chunkhash-or-contenthash-for-chunk-in-name-chunkhash-js-us
    // 由于dev环境 使用了hot热模块更换 不能使用contenthash
    filename: `${config.version}/js/[name].${isPrd ? '[contenthash:7]' : '[hash]'}.js`,
  },
  resolve: {
    // mainFiles: ['index'], // import from './目录' 的解析方式 寻找目录下index 会尝试extensions
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'], // 省略后缀
    alias: { // 别名
      '@': paths.project.src,
    }
  },
  externals: { // 外控者 防止将import的包打入bundle中 而是在运行时直接用全局变量
    // a: 'zhaoqi' 当我们去import ZQ from 'a' 不去从node_modules里找依赖 而直接使用全局变量zhaoqi
    // 'BMap': 'BMap', // 如百度地图相关
  },
  // optimization: {
  //   splitChunks: { // SplitChunksPlugin
  //     chunks: 'async', // 只对异步加载的模块进行代码分割 可选值还有 all initial
  //     minSize: 30000, // 模块大于30kb才会拆分 单位是字节
  //     maxSize: 0, // 模块大小无上限 大于给定值会进一步拆分
  //     minChunks: 1, // 模块至少引用一次才会拆分
  //     maxAsyncRequests: 5, // 按需加载时的最大并行请求数不能超过5 超过部分不拆分
  //     maxInitialRequests: 3, // 入口点处的最大并行请求数不能超过3 超过部分不拆分
  //     automaticNameDelimiter: '~', // 指定用于生成的名称的分隔符
  //     name: true, // 提供true将根据块和缓存组密钥自动生成名称
  //     cacheGroups: { // 当上面的配置都匹配了 才会进入缓存组
  //       // 组名：配置
  //       vendors: { // 第三方模块的分割
  //         test: /[\\/]node_modules[\\/]/, // 属于node_modules
  //         priority: -10 // 权重 -10 > -20 优先级高
  //       },
  //       default: { // 自己写模块
  //         minChunks: 2, // 至少引用两次
  //         priority: -20,
  //         reuseExistingChunk: true // 如果当前chunk 包含 拆分的出的模块 则将直接重用 而不是生成新的块
  //       }
  //     }
  //   }
  // }
  module: {
    // 设置一些内部明确没有依赖的库 阻止webpack解析其内部依赖 提高构建性能
    // 注意 使用antd内部会依赖部分lodash的方法 是包含require的 所以不能忽略（除非你是全部导入lodash 是不包含依赖的）
    // noParse: /jquery|lodash/,
    rules,
  },
  plugins,
}

// 多页面打包
// 1.多个入口 entry: { a: '...js', a: '...js' } // 多入口必然会造成“人工的代码分割”
// 输入文件名filename 必须是动态的'[name]' 不能是指定文件名 会冲突
// 2.new 多个 htmlwebpackplugin 配置不同的模板 根据chunks选项引入对应的js

// chrom浏览器 (command+shift+p 进行搜索) coverage面板查看代码使用的覆盖率 performance面板查看性能指标

export default base
