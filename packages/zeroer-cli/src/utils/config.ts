import { paths } from './paths'
import { commandLineArgs } from './commandLineArgs'
import { safeLoad } from './safeLoad'

const matchRes = paths.project.root.match(/^.+\/(.+)\.(v\d+)$/) ?? []

const config = {
  // 默认配置
  project: {
    domainName: '//fe.zero.com', // 前端部署资源域名
    name: matchRes[1], // 项目的名字
    version: matchRes[2], // 项目的版本
  },
  'dll-entry': {},
  mock: {
    host: '127.0.0.1',
    port: 3000,
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
  },
  ...safeLoad(`${paths.project.root}/${commandLineArgs.project}`).default,
}

export { config }
