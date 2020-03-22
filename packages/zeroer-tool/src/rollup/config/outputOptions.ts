import { log, paths, resolve } from '../../utils'
import { BuildVersion } from '../../types'

const outputOptions = {
  file: resolve(paths.project.root, BuildVersion.umd, 'index.js'),
  format: BuildVersion.umd, // 可选值 amd cjs esm iife umd
  // TODO从配置文件中获取
  name: 'zeroerCore', // (如果是iife/umd格式 则必填) 全局导出的变量名
  // globals: { // 配合外控者依赖的全局变量
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  sourcemap: true
}

export default outputOptions
