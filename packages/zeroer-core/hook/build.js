// "prebuild": "node hook/build.js",
// 由于使用lerna 项目目录结构变动zeroer-core目录不是根目录 导致vscode eslint识别问题
/* eslint-disable */
const inquirer = require('inquirer')
const chalk = require('chalk')
const { execP, isLessThan, log, exit } = require('./_utils')
const pkg = require('../package.json')

new class {
  constructor () {
    this.init()
  }
  async init () {
    await Promise.all([this.checkUpdate(), this.getRemoteVersions()])
    await this.checkVersion()
  }
  async checkUpdate () {
    const { updates } = await inquirer.prompt([{
      type: 'checkbox',
      message: chalk.red('请选择您要检测的 依赖更新'),
      name: 'updates',
      choices: [
        {
          name: 'dependencies',
          checked: false
        },
        {
          name: 'devDependencies',
          checked: false
        },
      ]
    }])
    if (updates.length !== 0) await this.dependUpdate(updates)
  }
  async dependUpdate (arr) {
    const res = await execP(`npm outdated ${[].concat(...arr.map(v => Object.keys(pkg[v]))).join(' ')}`)
    const { nameVersion } = await inquirer.prompt([{
      type: 'checkbox',
      message: chalk.red('请选择需要更新的依赖'),
      name: 'nameVersion',
      choices: this._handleChoices(res)
    }])
    log(`正在更新 ${nameVersion.join(' ')} ...`, 'blue')
    const updateRes = await execP(`npm i ${nameVersion.join(' ')}`)
    log(updateRes)
  }
  _handleChoices (str) {
    const rows = str.match(/[^\n]+/g) || []
    if (rows.length === 0) return
    const head = rows.shift().replace(/^(\S+\s+)\S+(\s+).*$/, '  $1    now$2       will')
    const immediatelyTitle = new inquirer.Separator(chalk.blue(head))
    const immediately = [] // 立即更新
    const cautiousTitle = new inquirer.Separator(chalk.blue('  以下包更新可能会导致不兼容 请谨慎行事！'))
    const cautious = [] // 谨慎更新
    rows.forEach(row => {
      row.match(/(\S+\s+)(\S+)(\s+\S+)(\s+\S+).*/g)
      const packageName = RegExp.$1
      const current = RegExp.$2
      const wanted = RegExp.$3
      const latest = RegExp.$4
      if (isLessThan(current, wanted)) {
        immediately.push({
          name: chalk.red(packageName) + current + '   ->' + chalk.green(wanted),
          checked: true,
          value: packageName.trim() + '@' + wanted.trim(),
          short: packageName.trim() // 选择后输出的简短描述
        })
        return
      }
      if (isLessThan(current, latest)) {
        cautious.push({
          name: chalk.yellow(packageName) + current + '   ->' + chalk.magenta(latest),
          checked: false,
          value: packageName.trim() + '@' + latest.trim(),
          short: packageName.trim()
        })
        
      }
    })
    return [].concat(immediatelyTitle, immediately, cautiousTitle, cautious)
  }
  async getRemoteVersions () {
    const str = await execP(`npm view ${pkg.name} versions`)
    this.remoteVersions = str.match(/([^\s,'\[\]]+)/g) || []
  }
  async checkVersion () {
    if (this.remoteVersions.includes(pkg.version)) {
      log(`本地 version：${pkg.version} 在远程版本中已存在\n请更改后 重新编译！`, 'red')
      return exit()
    }
    if (!/(alpha|beta|rc)/.test(pkg.version) && !isLessThan(this.remoteVersions[this.remoteVersions.length - 1], pkg.version)) {
      log(`如果你打算编译正式版本 版本号必须是增量的\n远程last version：${this.remoteVersions[this.remoteVersions.length - 1]}\n本地 version：${pkg.version}\n请更改后 重新编译！`, 'red')
      return exit()
    }
  }
}()
