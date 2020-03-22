/* eslint-disable semi,eol-last */
import pkg from './package.json'
import { ProjectConfig } from 'zeroer-tool'

const config: ProjectConfig = {
  'umd-global-variable-name': pkg.name.split('-').map((v: string, i: number) => i > 0 ? v.replace(/(.{1})(.*)/, (match, p1, p2) => p1.toUpperCase() + p2) : v).join(''),
  extensions: ['.js', '.jsx', '.ts', '.tsx']
}

export default config
