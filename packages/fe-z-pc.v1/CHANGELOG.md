# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.1.4](https://github.com/zq0904/zeroer/compare/fe-z-pc.v1@0.1.3...fe-z-pc.v1@0.1.4) (2020-07-16)

**Note:** Version bump only for package fe-z-pc.v1





## [0.1.3](https://github.com/zq0904/zeroer/compare/fe-z-pc.v1@0.1.2...fe-z-pc.v1@0.1.3) (2020-07-13)


### Bug Fixes

* 文案 ([296ccf5](https://github.com/zq0904/zeroer/commit/296ccf5a787f69c9e3229432b865db535343cfc8))





## [0.1.2](https://github.com/zq0904/zeroer/compare/fe-z-pc.v1@0.1.1...fe-z-pc.v1@0.1.2) (2020-06-14)


### Bug Fixes

* axios headers 解析为小写的问题 ([a39fa78](https://github.com/zq0904/zeroer/commit/a39fa78cfdbcc8a936472737a4b1289f73dabc1e))


### Features

* 添加通过key 重载页面但不刷新页面的全局方法 ([855f90f](https://github.com/zq0904/zeroer/commit/855f90fa59e50c1f58e1b358a3fbd293fb0f90f9))





## [0.1.1](https://github.com/zq0904/zeroer/compare/fe-z-pc.v1@0.1.0...fe-z-pc.v1@0.1.1) (2020-05-05)


### Features

* 更新依赖 ([eeb105c](https://github.com/zq0904/zeroer/commit/eeb105c3ea139f8a53d947d709b00f6c55ce6341))





# [0.1.0](https://github.com/zq0904/zeroer/compare/fe-z-pc.v1@0.0.5...fe-z-pc.v1@0.1.0) (2020-05-05)


### Bug Fixes

* mobx-react@6.1.7 ems版const没编译 导致打包的dll文件ie全跪 ([56a3c2b](https://github.com/zq0904/zeroer/commit/56a3c2b0f5c53042a67e1006213c12553026d62c))


### Features

* 更新 ([5fa7120](https://github.com/zq0904/zeroer/commit/5fa7120bab1ede0bf2a4feace4251effb49f04ce))





## [0.0.5](https://github.com/zq0904/zeroer/compare/fe-z-pc.v1@0.0.4...fe-z-pc.v1@0.0.5) (2020-03-22)


### Bug Fixes

* eslint ([e40f04c](https://github.com/zq0904/zeroer/commit/e40f04ca533232643b3cbdd713dd2d1d1bda15d2))
* 项目配置文件 eslint eol-last ([a195175](https://github.com/zq0904/zeroer/commit/a19517507a9e35beadf7e41d06e1fa9227ee94e8))





## 0.0.4 (2020-02-13)


### Bug Fixes

* zeorer-core迁移带来的不能编译等问题 升级了相关包等 ([fb734e6](https://github.com/zq0904/zeroer/commit/fb734e6f1c0766a196cdcae51a4743b316bf9771))
* **zeroer-cli:** ts-node编译node_modules等2个问题 ([9469db4](https://github.com/zq0904/zeroer/commit/9469db47949542e0a7963ea08c03c950aa60e452))


### Features

* **fe-z-pc.v1:** 整理axios 添加mock等 临时提交! ([537fa14](https://github.com/zq0904/zeroer/commit/537fa14c5d2f50a1abff3745b8e92c173af2c245))
* 1. 细化axios 请求get path函数的重载 对react-router-config部分重写 以支持懒加载和beforeEach钩子 ([b8eb9c4](https://github.com/zq0904/zeroer/commit/b8eb9c4d8a50b13c07812a188e43f83950df677d))
* 1.为zeroer-cli添加eslint prettirt 2.整理预设preset 3.使ts-node支持最新的可选链等 ([1e142a2](https://github.com/zq0904/zeroer/commit/1e142a293530f997c64020e72c476025f54cae92))
* 1.删除#!/usr/bin/env node 启用完全的ts实时编译 2.整理命令行参数 3.添加清除.catch参数 4.支持多参并发 但不推选 ([eea2cf8](https://github.com/zq0904/zeroer/commit/eea2cf81264cfb51e6ebccc50466d0210d4110eb))
* 1.对project.config.ts mock/data.ts 类型规范约束及测试 2.修复了public除dll以外的静态资源拷贝 完善ico ([4c627ec](https://github.com/zq0904/zeroer/commit/4c627ecd7d707857410c32529e4e69961da7ce7a))
* 集成eslint ([6e150dd](https://github.com/zq0904/zeroer/commit/6e150dd21423a1d21d261be7acab231e581b88c5))


### Performance Improvements

* 优化server 构建输出 ([42979df](https://github.com/zq0904/zeroer/commit/42979dfc7742b165f0012e63c85eabfbfc33f318))
