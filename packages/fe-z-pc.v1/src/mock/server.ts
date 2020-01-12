import path = require('path')
import Koa = require('koa')
import koaRouter = require('koa-router')
import detectPort = require('detect-port')
import cors = require('@koa/cors')
import inquirer = require('inquirer')
import { helpForIn, clearConsole, modifyFileP } from './utiles'
import data from './data'
import { port as defaultPort } from './env'

const app = new Koa()
const router = new koaRouter()

app.use(cors({
  origin: 'http://0.0.0.0:9000',
  credentials: true,
}))

helpForIn(url => {
  router.all(url, async (ctx, next) => ctx.body = data[url])
}, data)

// 添加路由器中间件
app.use(router.routes())
 
const running = (port: number) => app.listen(port, () => {
  if (port === defaultPort) {
    return console.log(`mock server running to ${port} port！`)
  }
  // 应该使用Ast解析替换 这里暂时先使用正则
  modifyFileP(path.resolve(__dirname, './env.ts'), 'port', port)
})

detectPort(defaultPort)
  .then(nextPort => {
    if (defaultPort !== nextPort) return inquirer.prompt({
      type: 'confirm',
      name: 'isUseAnotherPort',
      message: `${defaultPort}端口已经被占用！\n\n您想要在另一个端口上运行应用程序吗?`,
      default: true,
    })
    .then(({ isUseAnotherPort }: { isUseAnotherPort: boolean }) => {
      if (isUseAnotherPort) {
        clearConsole()
        running(nextPort)
      }
    })
    running(defaultPort)
  })
  .catch(err => console.log(err))