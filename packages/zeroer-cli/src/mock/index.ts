import Koa from 'koa'
import koaRouter from 'koa-router'
import detectPort from 'detect-port'
import cors from '@koa/cors'
import inquirer from 'inquirer'
import { log, paths, config, safeLoad, modifyProjectConfig, clearConsole } from '../utils'

// 检测端口
detectPort(config.mock.port)
  .then(async nextPort => {
    if (config.mock.port !== nextPort) {
      const { isUseAnotherPort }: { isUseAnotherPort: boolean } = await inquirer.prompt({
        type: 'confirm',
        name: 'isUseAnotherPort',
        message: `${config.mock.port}端口已经被占用！\n\n您想要在另一个端口上运行应用程序吗?（此操作会修改项目的配置文件）`,
        default: true,
      })
      if (isUseAnotherPort) {
        clearConsole()
        modifyProjectConfig('mock.port', nextPort)
      } else {
        process.exit(1)
      }
      return
    }

    const { default: data } = safeLoad(`${paths.project.src}/mock/data.ts`)
    
    const app = new Koa()
    const router = new koaRouter()

    app.use(cors({
      origin: `http://${config.devServer.host}:${config.devServer.port}`,
      credentials: true,
    }))

    // 注册每个路由
    let html = ''
    for (const url in data) {
      router.all(url, async (ctx, next) => ctx.body = data[url])
      html += `<a href="${url}">${url}</a><br/>`
    }
    router.all('/', ctx => ctx.body = html)

    // 添加路由器中间件
    app.use(router.routes())
    
    app.listen(config.mock.port, () => log(`mock server running to http://${config.mock.host}:${config.mock.port}`, 'blue'))
  })
  .catch(err => log(err, 'red'))
