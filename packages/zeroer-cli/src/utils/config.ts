import { paths } from './paths'
import { commandLineArgs } from './commandLineArgs'
import { ProjectConfig } from '../types'

const config: ProjectConfig = require(`${paths.project.root}/${commandLineArgs.project}`).default

export { config }
