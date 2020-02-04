
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Location } from 'history'

// 这2个类型 放到源文件中 导出 编译器会有警告（可能是由于 类型与值区分不明显的问题 ts3.8 将引入 import type）
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
