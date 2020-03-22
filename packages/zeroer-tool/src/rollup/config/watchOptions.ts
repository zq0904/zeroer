import inputOptions from './inputOptions'
import outputOptions from './outputOptions'
import { paths, resolve } from '../../utils'

const watchOptions = {
  ...inputOptions,
  output: [outputOptions],
  watch: {
    clearScreen: true, // 触发重建时是否清除屏幕
    exclude: resolve(paths.project.root, 'node_modules/**'),
    include: resolve(paths.project.src, '**'),
  }
}

export default watchOptions
