import { watch } from 'rollup'
import run from './run'
import watchOptions from './config/watchOptions'

// @ts-ignore
const watcher = watch(watchOptions)
watcher.on('event', event => run())
run()
