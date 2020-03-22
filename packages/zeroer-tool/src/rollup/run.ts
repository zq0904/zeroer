import { rollup } from 'rollup'
import { debounce } from '../utils'

import inputOptions from './config/inputOptions'
import outputOptions from './config/outputOptions'

const run = debounce(async () => {
  // 创建 bundle
  const bundle = await rollup(inputOptions)

  // @ts-ignore 生成代码
  await bundle.generate(outputOptions)

  // @ts-ignore 写入磁盘
  await bundle.write(outputOptions)
}, 400)

export default run
