const minimist = require('minimist')
const inquirer = require('inquirer')
const { log, execA, execRes, execP, getVersion } = require('./_utils')

const args = minimist(process.argv.slice(2))
// npm 参数透传做兼容
const { cooked } = JSON.parse(process.env.npm_config_argv || '{"cooked":[]}')
const npmArgs = minimist(cooked.slice(2))

new class {
  constructor() {
    this.requireTools = ['node', 'npm', 'git'] // 必须的工具
    this.indentation = '  ' // 缩进
    this.isMaster = null
    this.nowPreset = args.preset || npmArgs.preset
    this.formalPreset = ['patch', 'minor', 'major'] // 正式版
    this.testPreset = ['alpha', 'beta', 'rc'] // 测试版
    this.optionalPreset = this.testPreset.concat(this.formalPreset) // 可选版
    this.init()
  }
  async init() {
    console.log('this.nowPreset', this.nowPreset)
    log('环境信息:')
    await this.echoVersion() // 打印 必须工具 版本号
    await this.echoGitInfo() // 打印 git 用户名 邮箱 分支名
    await this.processControl() // 流程控制
  }
  async echoVersion () {
    const versions = await Promise.all(this.requireTools.map(tool => getVersion(tool)))
    log(this.requireTools.map((tool, index) => `${this.indentation}${tool}: ${versions[index]}`).join('\n'))
  }
  async echoGitInfo () {
    const [user, branch] = await Promise.all([
      execRes('git config --global --list'),
      execRes('git rev-parse --abbrev-ref HEAD')
    ])
    this.isMaster = branch === 'master'
    const [,, name, email] = user.match(/(^|\n)user.name=([^\n]+)[\s]*user.email=([^\n]+)/)
    log(`${this.indentation}branch: ${branch}\n${this.indentation}name: ${name}\n${this.indentation}email: ${email}\n`)
  }
  async processControl() {
    if (this.formalPreset.includes(this.nowPreset)) return this.releaseFormal()
    if (this.testPreset.includes(this.nowPreset)) return this.releaseTest()
    const { wantVersion } = await inquirer.prompt([{
      name: 'wantVersion',
      message: '请选择您要发布的版本类型:',
      type: 'list',
      choices: this.optionalPreset
    }])
    if (this.formalPreset.includes(wantVersion)) return this.releaseFormal(wantVersion)
    if (this.testPreset.includes(wantVersion)) return this.releaseTest(wantVersion)
  }
  // 发布正式版
  async releaseFormal(willVersion = this.nowPreset) {
    if (!this.isMaster) return log(`发布${willVersion}版 必须是 master 分支`, 'red')
    await execA(`lerna publish ${willVersion} --conventional-commits`)
  }
  async getChangeFiles() {
    const res = await execP('git status -s -b')
    return res.match(/^## [^\n]*?\n([\s\S]*)/)[1]
  }
  // 发布测试版
  async releaseTest(willVersion = this.nowPreset) {
    const changeFiles = await this.getChangeFiles()
    if (changeFiles.trim() !== '') return log(`本地文件有更改没有提交！\n${changeFiles}`, 'red')
    await execA(`lerna version prerelease --preid ${willVersion} --no-git-tag-version --no-push`)
    const changeFilesStr = await this.getChangeFiles()
    if (changeFilesStr.trim() === '') return // 没有包变动 包未更改
    await execA('git add -A') // 只有package.json文件变动 提交相应文件
    const commitInfo = await execP(`git commit -m 'chore(release): publish ${willVersion}'`)
    log(commitInfo, 'white')
    await execA(`lerna publish from-package --dist-tag ${willVersion} --yes`)
  }
}
