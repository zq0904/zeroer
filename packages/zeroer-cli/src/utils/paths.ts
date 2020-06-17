import { resolve } from './resolve'
import { isPrd } from './isPrd'

const projectRootPath = process.cwd() // 项目根目录
const cliRootPath = resolve(__dirname, '../../') // cli根目录

const paths = {
  // 项目
  project: {
    root: projectRootPath,
    src: `${projectRootPath}/src`,
    public: `${projectRootPath}/public`,
    dll: `${projectRootPath}/public/dll`, // dll 的输出目录
    distPath: `${projectRootPath}/${isPrd ? 'dist' : 'dist-dev'}`, // 编译输出的目录
  },
  // cli
  cli: {
    root: cliRootPath,
    src: `${cliRootPath}/src`,
    preset: `${cliRootPath}/preset`,
    webpack: `${cliRootPath}/src/webpack`
  },
}

export { paths }
