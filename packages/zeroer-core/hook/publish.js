// "prepublish": "node hook/publish.js"
// 由于使用lerna 项目目录结构变动zeroer-core目录不是根目录 导致vscode eslint识别问题
/* eslint-disable */
const path = require('path')
const { log, exit, trim, execP, readLineP, getVersion } = require('./_utils')
const pkg = require('../package.json')

const { original } = JSON.parse(process.env.npm_config_argv)
const isFormal = !original.includes('run') && original.includes('publish') && !original.includes('beta')
const cwd = process.cwd()

new class {
  constructor () {
    this.tools = ['node', 'npm', 'git']
    this.init()
  }
  async init () {
    await this.echoVersion() // 打印版本号
    await this.echoGitInfo() // 打印git 用户名 邮箱 分支名
    await this.check() // 检测
  }
  async echoVersion () {
    const versions = await Promise.all(this.tools.map(tool => getVersion(tool)))
    const res = this.tools.map((tool, index) => `${tool}：v${versions[index]}`).join('\n')
    log(res)
  }
  async echoGitInfo () {
    const [user, branch] = await Promise.all([execP('git config --global --list'), execP('git rev-parse --abbrev-ref HEAD')])
    const [,, name, email] = user.match(/(^|\n)user.name=([^\n]+)[\s]*user.email=([^\n]+)/)
    log(trim(`name：${name}\nemail：${email}\nbranch：${branch}`))
  }
  async check () {
    await Promise.all([isFormal ? this.formalCheck() : Promise.resolve(), this.compileLatest()])
  }
  // 正式包相关检测
  async formalCheck () {
    const err = '发布正式包错误'
    let info = await execP('git status -s -b')
    info = info.match(/^## master\.\.\.origin\/master([^\n]*)\n?([\s\S]*)/)
    if (!info) {
      log(`${err} 必须是master分支！`, 'red')
      return exit()
    }
    if (info[2]) {
      log(trim(`${err} 本地文件有更改没有提交！\n${info[2]}`), 'red')
      return exit()
    }
    if (info[1]) {
      log(`${err} 本地有${info[1].replace(/.+(\d+).+/, '$1')}个提交 没有提交到远程仓库！`, 'red')
      return exit()
    }
    // 由于 获取远程 commitId 这步通常较慢 就不与上面的操作并行了
    const [localId, remoteId] = await Promise.all([execP('git rev-parse --verify HEAD'), execP('git ls-remote origin -h HEAD|cut -f1')])
    if (localId !== remoteId) {
      log(`${err} 远程仓库代码较新 请更新代码！`, 'red')
      return exit()
    }
  }
  // 编译的文件是否与pkg版本一致
  async compileLatest () {
    const [mainRes, moduleRes] = await Promise.all([
      readLineP(path.resolve(cwd, pkg.main)),
      pkg.module ? readLineP(path.resolve(cwd, pkg.module)) : Promise.resolve('')
    ])
    const mainNot = mainRes.replace(/^[\s\S]*?(\d+\.\d+\.\d+[^\s]*)[\s\S]*$/, '$1') !== pkg.version
    const moduleNot = pkg.module ? moduleRes.replace(/^[\s\S]*?(\d+\.\d+\.\d+[^\s]*)[\s\S]*$/, '$1') !== pkg.version : false
    if (mainNot || moduleNot) {
      log('package.json版本 与 编译后文件的版本 不一致 请重新编译！', 'red')
      return exit()
    }
  }
}()
