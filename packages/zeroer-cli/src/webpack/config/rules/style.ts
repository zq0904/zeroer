import MiniCssExtractPlugin from 'mini-css-extract-plugin' // 提取css
import { isPrd, resolve, paths } from '../../../utils'

const style = {
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
      // 配置文件优先级 loader.options > package.json > paths.project.root/.postcssrc.js
      // !!!但是就算提供了loader.options配置也必须提供一个空的package.json配置或paths.project.root/.postcssrc.js
      loader: 'postcss-loader',
      // options: {
      //   config: {
      //     path: resolve(paths.cli.root, 'postcss') // 指定配置文件“目录” 目录中必须包含如.postcssrc.js标准可识别文件名称 而非index.js
      //   },
      // }
    },
    'sass-loader',
  ]
}

export default style
