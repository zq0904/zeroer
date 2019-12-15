const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css
const { env: { isPrd }, resolve } = require('../../utils')

module.exports = {
  test: /\.(sc|sa|c)ss$/,
  use: [
    isPrd ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/', // 提取css 原css样式中url()如果引用相对路径会有问题
      },
    } : 'style-loader',
    { loader: 'css-loader', options: { importLoaders: 2 } }, // importLoaders: 2 => postcss-loader, sass-loader
    {
      // 配置文件优先级 loader > package.json > root/.postcssrc.js
      // !!!但是就算提供了loader配置也必须提供一个空的package.json配置或root/.postcssrc.js 这里我只是在package.json配置提供一个空的配置
      loader: 'postcss-loader',
      // options: {
      //   config: {
      //     path: resolve('postcssConfig', false) // 指定配置文件“目录” 目录中必须包含如.postcssrc.js标准可识别文件 而非index.js
      //   },
      // }
    },
    'sass-loader',
  ]
}
