import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loading from '@/components/Loading'

const JobCreate = lazy(() => import('@/pages/JobCreate'))
const JobList = lazy(() => import(/* webpackChunkName: 'Job', webpackPrefetch: true */'@/pages/JobList'))

// Prefetch / Preload modules webpack 4.6.0以上支持
// Prefetch 父块加载完 在浏览器器空闲时间加载 但不会执行 使用的时候直接拿来执行
// Preload 与父块 并行加载 但不会执行 使用的时候直接拿来执行 不会阻塞onload (没有用到的preload资源在 Chrome 的 console 里会在 onload 事件 3s 后发生警告)
// Preload 用于 一些必然使用的资源 如页面必须加载的图片font字体 而不是等到页面加载到页面该资源处去请求相关的文件

const RootRouterView = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route path="/JobCreate" component={JobCreate} />
      <Route path="/JobList" component={JobList} />
    </Switch>
  </Suspense>
)

export default RootRouterView
