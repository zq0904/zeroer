/*
  摘自react-router-config
  rootRoutes component 支持懒加载
  增加类vue的 beforeEach拦截钩子
*/
import React from 'react'
import { Switch, Route, RouteComponentProps, SwitchProps } from 'react-router-dom'
import { Location } from 'history'
import Depth from './Depth'

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
  route?: RouteConfig;
}

export interface RouteConfig {
  key?: React.Key;
  location?: Location;
  path?: string | string[];
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean; // 路径是否严格区分大小写
  routes?: RouteConfig[];
  component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType<any>;
  render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
  children?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
}

interface RenderRoutes {
  (routes: RouteConfig[] | undefined, extraProps?: any, switchProps?: SwitchProps): JSX.Element | null;
}

const renderRoutes: RenderRoutes = (routes, extraProps = {}, switchProps = {}) => routes ? (
  <Depth>
    <Switch {...switchProps}>
      {
        routes.map((route, i) => {
          const renderProps: RouteConfig = {}
          const Com = route.component
          if (Com) renderProps.component = (props: RouteConfigComponentProps<any>) => <Com {...props} {...extraProps} route={route} />
          if (route.render) renderProps.render = (props) => route.render!({ ...props, ...extraProps, route }) 
          if (route.children) renderProps.children = (props) => route.children!({ ...props, ...extraProps, route })
          return (
            // Route 同时存在 渲染属性优先级 children > component > render
            // path规则 https://github.com/pillarjs/path-to-regexp/tree/v1.7.0
            <Route
              key={route.key || i}
              location={route.location}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              sensitive={route.sensitive}
              {...renderProps}
            />
          )
        })
      }
    </Switch>
  </Depth>
) : null

export {
  renderRoutes,
}
