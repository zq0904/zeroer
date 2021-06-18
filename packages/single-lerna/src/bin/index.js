#!/usr/bin/env node

const {
  commander: { program },
} = require('@wuba/general-tools')

const { commandName } = require('../types')
const pkg = require('../../package.json')

;(async () => {
  program
    .name(commandName)
    .version(pkg.version, '-v, --version', 'output package version')
    .helpOption('-h, --help', 'display help')

  require('./publish')

  program.parse(process.argv)
})()
