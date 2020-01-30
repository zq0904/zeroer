#!/usr/bin/env node
const path = require('path')
const minimist = require('minimist')
const chalk = require('chalk')
const execa = require('execa')

// 透传命令行参数
const passthroughCommandLineArgs = `--COMMANDLINEARGS ${JSON.stringify(minimist(process.argv.slice(2)))}`

const command = [
  'ts-node',
  `-P ${path.resolve(__dirname, '../tsconfig.json')}`,
  path.resolve(__dirname, '../src/index.ts'),
  passthroughCommandLineArgs,
].join(' ')

execa
  .command(command, {
    preferLocal: true,
    stdio: 'inherit',
  })
  .on('error', err => {
    console.log(chalk.red(`执行命令：${command} 时出错!`))
    console.log(chalk.red(JSON.stringify(err, null, 2)))
  })
