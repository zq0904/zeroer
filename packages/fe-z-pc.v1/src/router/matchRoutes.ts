// 摘自react-router-config 没做任何更改
import { matchPath, Router, match } from 'react-router-dom'
import { RouteConfig } from './renderRoutes'
import { Pathname } from 'history'

type Branch = { route: RouteConfig; match: match }[];
interface MatchRoutes {
  (
    routes: RouteConfig[],
    pathname: Pathname,
    /* 不是Api */branch?: Branch
  ): Branch;
}

const matchRoutes: MatchRoutes = (routes, pathname, branch = []) => {
  routes.some(route => {
    const match: match = route.path ? matchPath(pathname, route)
      : branch.length ? branch[branch.length - 1].match // use parent match
        // @ts-ignore
        : Router.computeRootMatch(pathname) // use default "root" match

    if (match) {
      branch.push({ route, match })
      if (route.routes) {
        matchRoutes(route.routes, pathname, branch)
      }
    }

    return match
  })

  return branch
}

export { matchRoutes }
