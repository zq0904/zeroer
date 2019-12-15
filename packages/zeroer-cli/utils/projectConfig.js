const { projectPath } = require('./paths')
const securityLoad = require('./securityLoad')
const projectConfig = securityLoad(`${projectPath}/project.config.js`)
const domainName = '//fe.zero.com'
const matchRes = projectPath.match(/^.+\/(.+)\.(v\d+)$/)

module.exports = {
  domainName, // 前端部署资源域名
  projectName: matchRes[1], // 项目的名字
  projectVersion: matchRes[2], // 项目的版本
  ...projectConfig,
}
