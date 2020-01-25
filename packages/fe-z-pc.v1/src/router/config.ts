import { lazy } from 'react'
import { RouteConfig } from './renderRoutes'
import { PATH_JOB_CREATE, PATH_JOB_LIST } from './path'
import { Path, LocationDescriptorObject, Location } from 'history'
import { matchRoutes } from './matchRoutes'

// Prefetch / Preload modules webpack 4.6.0以上支持
// Prefetch 父块加载完 在浏览器器空闲时间加载 但不会执行 使用的时候直接拿来执行
// Preload 与父块 并行加载 但不会执行 使用的时候直接拿来执行 不会阻塞onload (没有用到的preload资源在 Chrome 的 console 里会在 onload 事件 3s 后发生警告)
// Preload 用于 一些必然使用的资源 如页面必须加载的图片font字体 而不是等到页面加载到页面该资源处去请求相关的文件

const JobCreate = lazy(() => import(/* webpackChunkName: 'JobCreate', webpackPrefetch: true */'@/pages/JobCreate'))
const JobList = lazy(() => import(/* webpackChunkName: 'JobList', webpackPrefetch: true */'@/pages/JobList'))

const rootRoutes: RouteConfig[] = [
  {
    path: PATH_JOB_CREATE,
    component: JobCreate,
    routes: [{
      path: `${PATH_JOB_CREATE}/:id?`,
      render: props => {
        return props.match.params?.id ?? '没有'
      }
    }]
  },
  {
    path: PATH_JOB_LIST,
    component: JobList,
  }
]

interface BeforeEach {
  (
    to: Location,
    from: Location,
    next: (arg?: false | Path | LocationDescriptorObject & { replace?: boolean; }) => void
  ): void;
}

const beforeEach: BeforeEach = (to, from, next) => {
  next()
  // console.log('beforeEach', to, from, matchRoutes(rootRoutes, to.pathname))
  // if (to.pathname === '/') return next()
  // setTimeout(() => {
  //   next({
  //     pathname: '/',
  //     replace: true
  //   })
  // }, 3000)
}

export {
  rootRoutes,
  beforeEach,
}
