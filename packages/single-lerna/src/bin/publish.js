const {
  execa,
  commander: { program },
  inquirer,
  log,
  getDEO,
  getVersion,
} = require('@wuba/general-tools')
const { Commands, commandName } = require('../types')

const mustTools = ['node', 'npm', 'git'] // 必要工具
const formalVersions = ['patch', 'minor', 'major'] // 正式版
const testVersions = ['alpha', 'beta', 'rc'] // 测试版
const optionalVersions = formalVersions.concat(testVersions)
const optionalType = optionalVersions.join(' | ')

program
  .command(Commands.publish)
  .description('publish packages in the current project')
  .option(
    '-t, --tag <dist-tag>',
    `publish packages with the specified npm dist-tag (optional: ${optionalType})`,
    (value, dummyPrevious) => {
      if (value !== undefined && !optionalVersions.includes(value)) {
        log(
          `error: parameter ${value} is not in the range of ${optionalType}`,
          'red'
        )
        process.exit(1)
      }
      return value
    }
  )
  .action(async ({ tag }) => {
    // 输出 必要工具 版本号
    const versions = await Promise.all(
      mustTools.map(async (v) => {
        const { stdout } = await execa.command(`${v} --version`, getDEO())
        return `${v}: ${getVersion(stdout)}`
      })
    )
    log(['versions info:', ...versions])
    // 输出 分支 用户名 邮箱
    const [{ stdout: userInfo }, { stdout: branch }] = await Promise.all([
      execa.command('git config --global --list', getDEO()),
      execa.command('git rev-parse --abbrev-ref HEAD', getDEO()),
    ])
    const [, , name, email] = userInfo.match(
      /(^|\n)user.name=([^\n]+)[\s]*user.email=([^\n]+)/
    )
    log([
      '\nuser info:',
      `branch: ${branch}`,
      `name: ${name}`,
      `email: ${email}\n`,
    ])

    if (tag === undefined) {
      const { version } = await inquirer.prompt([
        {
          name: 'version',
          message: '请选择您要发布的版本类型:',
          type: 'list',
          choices: optionalVersions,
        },
      ])
      tag = version
    }

    if (formalVersions.includes(tag)) {
      // 正式版
      await execa.command(
        [
          `lerna publish ${tag}`,
          '--allow-branch master', // 正式版需使用 master 分支
          '--conventional-commits', // 生成CHANGELOG.md文件
          '--conventional-graduate', // 所有预发行版程序包 -> 正式版
        ].join(' '),
        { ...getDEO(), stdio: 'inherit' }
      )
    } else {
      // 测试版
      await execa.command(
        `lerna publish prerelease --preid ${tag} --pre-dist-tag ${tag}`,
        { ...getDEO(), stdio: 'inherit' }
      )
    }
  })
  .on('--help', () => {
    log([
      '\nExamples:',
      `npx ${commandName} ${Commands.publish} // 可选交互式`,
      `npx ${commandName} ${Commands.publish} --tag ${testVersions[1]} // 直接指定 preid dist-tag`,
    ])
  })
