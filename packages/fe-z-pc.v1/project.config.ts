/* eslint-disable semi,eol-last */

/*
  项目的配置文件
  1. 使用ts文件作为项目的配置文件 本质是想使用ts的类型校验 但配置文件应该是静态的如.json
  2. 一些情况可能会通过 ast 重写这个文件（更新部分值）所以不要尝试更改默认导出
  3. 如果修改了配置文件的名称 命令 通过-P指定 项目中引用需要手动更改
*/
import pkg from './package.json';
import { ProjectConfig } from 'zeroer-cli';
const matchRes: RegExpMatchArray | null = pkg.name.match(/^(.+)\.(v\d+)$/);
const config: ProjectConfig = {
  // 前端部署资源域名
  domainName: '//fe.zeroer.cc',
  // 项目名字
  name: matchRes?.[1] ?? pkg.name,
  // 项目版本
  version: matchRes?.[2] ?? 'v1',
  'dll-entry': {
    // @babel/polyfill 7.4.0之后 已经不推选使用 (原因：这个软件包没有使人们有可能从提供平滑的迁移路径core-js@2到core-js@3)
    _polyfill: ['core-js/stable', 'regenerator-runtime/runtime'],
    _zero: ['react', 'react-dom', 'react-router-dom', 'prop-types', 'classnames', 'mobx', 'mobx-react', 'axios', 'qs']
  },
  mock: {
    host: '127.0.0.1',
    port: 3001
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 9000,
    // 开发环境代理
    proxy: {
      // 请求路径是以 /api 开头的 会代理到
      '/api': {
        target: 'http://127.0.0.1:3004',
        pathRewrite: {
          // 路径重写规则
          '^/api': ''
        }
      }
    }
  }
};
export default config;