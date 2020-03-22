import { resolve } from './resolve'

const projectRootPath = process.cwd() // 项目根目录
const cliRootPath = resolve(__dirname, '../../') // cli根目录

const paths = {
  // 项目
  project: {
    root: projectRootPath,
    src: `${projectRootPath}/src`,
  },
  // cli
  cli: {
    root: cliRootPath,
    src: `${cliRootPath}/src`,
    preset: `${cliRootPath}/preset`,
    rollup: `${cliRootPath}/src/rollup`,
  },
}

export { paths }
