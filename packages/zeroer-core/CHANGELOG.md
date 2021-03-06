# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.2](https://github.com/zq0904/zeroer/compare/zeroer-core@1.1.1...zeroer-core@1.1.2) (2020-07-16)


### Bug Fixes

* 严谨的判断 ([b886503](https://github.com/zq0904/zeroer/commit/b886503f64355452b0b5a0a6f1cd0749d149a78f))
* 修改compose类型 ([4c0a7aa](https://github.com/zq0904/zeroer/commit/4c0a7aa1542d5fb00254010f60ceda9b9165f9a2))
* 添加err提示 ([3af36a1](https://github.com/zq0904/zeroer/commit/3af36a1f2aeba8d0acb2eac3bcb6e87babd73b43))
* 添加泛型 ([9c0123a](https://github.com/zq0904/zeroer/commit/9c0123a216800ed28f6430230ea6ce6e083451ff))


### Features

* 设置成功返回true 失败返回false ([06e6754](https://github.com/zq0904/zeroer/commit/06e6754f68569a27038d31d2c5aa87c1716699fd))





## [1.1.1](https://github.com/zq0904/zeroer/compare/zeroer-core@1.1.0...zeroer-core@1.1.1) (2020-07-13)


### Bug Fixes

* eslint ([8ff9505](https://github.com/zq0904/zeroer/commit/8ff950542b5d82891989f0abfc6d15d829e6a7bc))
* parse key 与 val 中包括=引发的问题 ([d641c30](https://github.com/zq0904/zeroer/commit/d641c30f9e416f4ac9fb2006078dab5829c96ea1))
* 类型重载修复 ([f883dc5](https://github.com/zq0904/zeroer/commit/f883dc5cc1025b4a84635258c19e5dc5e0b2b030))





# [1.1.0](https://github.com/zq0904/zeroer/compare/zeroer-core@1.0.0...zeroer-core@1.1.0) (2020-05-05)


### Bug Fixes

* ip ([a786e6e](https://github.com/zq0904/zeroer/commit/a786e6e176acef38abb9d187d3e33d94ae8dd412))
* 修改throttle默认值 16ms 参考60fps ([b53b4c6](https://github.com/zq0904/zeroer/commit/b53b4c61908f0ac5d4b5f38602bb667460e24903))


### Features

* 修改 throttle JSDoc 例子 ([60775bc](https://github.com/zq0904/zeroer/commit/60775bc819a3547a9b14dc6b28aa2792c3bf5a53))
* 更新包 ([b6abd4e](https://github.com/zq0904/zeroer/commit/b6abd4e004e8e2b1862eb323683e2721b30e437a))





# [1.0.0](https://github.com/zq0904/zeroer/compare/zeroer-core@0.0.1...zeroer-core@1.0.0) (2020-03-22)


### Bug Fixes

* eslint修改 ([628217a](https://github.com/zq0904/zeroer/commit/628217a7003920c57b6e3d0de9b3304deba7e8a6))
* 为减少立执行函数 临时将ua改成函数试 ([bcc11c8](https://github.com/zq0904/zeroer/commit/bcc11c8ed201bbf784279b9bb84d822583817e35))


### Features

* 1. @babel/preset-env@7.8.7 内置了 动态导入import、空合并、可选链 2. 更新babel相关 ([a1d9e57](https://github.com/zq0904/zeroer/commit/a1d9e57fca9f66974f265bf67a43ee8569df1216))
* 1. 更改目录结构 为完全的模块化作准备 2. 优化编译esm cjs等流程 ([8c9a866](https://github.com/zq0904/zeroer/commit/8c9a866eaede5b80d7417a0e38848e85d51acb23))
* 1.使用JSDoc 添加注释及示例 2.添加compose函数合并 3.整理部分文档 ([c328e5d](https://github.com/zq0904/zeroer/commit/c328e5d2e6576a19c95b445487f6c64b1399ba4b))
* zeroer-tool babel抽取 ([437b06e](https://github.com/zq0904/zeroer/commit/437b06e5db8a014da4449ca1b6f091a6a4013d09))
* zeroer-tool eslint抽取 ([03cf9fd](https://github.com/zq0904/zeroer/commit/03cf9fd28588e3ae2650890aaa9219631b25633d))
* zeroer-tool抽取 ([5e3db9a](https://github.com/zq0904/zeroer/commit/5e3db9ab85347ac74189e249569386cbfbd07ee0))
* 新增pipe函数合并 ([1c73b45](https://github.com/zq0904/zeroer/commit/1c73b45c274e089750c5aa4099a9c91d188898dc))
* 添加exclude 以忽略只发出声明文件 的报错 ([9806e46](https://github.com/zq0904/zeroer/commit/9806e4697af21e8ef8a77af2efd5ab3d78db169a))
* 添加zeroer-core配置文件 ([5325562](https://github.com/zq0904/zeroer/commit/5325562018961376fe769487ea1d334ab825e8ef))
* 重大变更 更改导出对象变量名 ([91b4252](https://github.com/zq0904/zeroer/commit/91b42521f8f85481400e10afc6ba4f817182b0cf))





## 0.0.1 (2020-02-13)


### Bug Fixes

* zeorer-core迁移带来的不能编译等问题 升级了相关包等 ([fb734e6](https://github.com/zq0904/zeroer/commit/fb734e6f1c0766a196cdcae51a4743b316bf9771))


### Features

* 1. 细化axios 请求get path函数的重载 对react-router-config部分重写 以支持懒加载和beforeEach钩子 ([b8eb9c4](https://github.com/zq0904/zeroer/commit/b8eb9c4d8a50b13c07812a188e43f83950df677d))
* 集成eslint ([6e150dd](https://github.com/zq0904/zeroer/commit/6e150dd21423a1d21d261be7acab231e581b88c5))
