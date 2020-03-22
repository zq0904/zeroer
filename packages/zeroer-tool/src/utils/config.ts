import { paths } from './paths'
import { commandLineArgs } from './commandLineArgs'
import { safeLoad } from './safeLoad'
import { ProjectConfig } from '../types'

interface Pkg {
  name: string;
}

const pkg = safeLoad<Pkg>(`${paths.project.root}/package.json`)

const config = {
  // 默认值
  'umd-global-variable-name': pkg.name.split('-').map((v: string, i: number) => i > 0 ? v.replace(/(.{1})(.*)/, (match, p1, p2, offset, string) => p1.toUpperCase() + p2) : v).join(''),
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  // 项目值
  ...safeLoad<{ default: ProjectConfig }>(`${paths.project.root}/${commandLineArgs.config}`).default
}

export { config }
