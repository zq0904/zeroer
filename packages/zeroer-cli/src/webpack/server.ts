import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import dev from './config/dev'
import { log } from '../utils'

const compiler = Webpack(dev)

// https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js
const server = new WebpackDevServer(compiler, {
  ...dev.devServer,
  stats: 'errors-warnings', // 仅发生错误和警告 输出
})

server.listen(dev.devServer.port, dev.devServer.host, () => {
  // log(`server running to http://${dev.devServer.host}:${dev.devServer.port}`, 'blue')
})
