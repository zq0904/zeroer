# rollup ts 构建 核心库
## [rollup插件列表](https://github.com/rollup/awesome)
## 构建版本说明
```
  umd版本
  cjs版本
  esm版本 // 使用了@babel/runtime-corejs3 内置填充
  esm-streamline版本 // 未使用@babel/runtime-corejs3 内置填充
```
## 命令
```
  npm run dev // 开发模式 (使用browsersync 支持proxy中间件)
  npm run build:all // 构建 umd版本 cjs版本 esm版本 esm-streamline版本
  npm run build:umd // 构建 umd版本
  npm run build:cjs // 构建 cjs版本
  npm run build:esm // 构建 esm版本
  npm run build:esm-streamline // 构建 esm-streamline版本
  npm run lint // 检测eslint错误 和 ts类型错误 (eslint + vscode 配置好 可以完全忽略)
```
## 安装及使用
```
  npm i zeroer-core

  // 直接在script中使用 将暴露全局变量 zeroerCore
  <script src="./node_modules/zeroer-core/umd/index.js"></script>

  // node 中使用
  const { array } = require('zeroer-core')

  // 在支持tree shaking构建器项目中使用 如 rollup、webpack@2+
  // 1.在项目全局导入了全部的polyfill 如 在入口文件 import 'core-js' 且 { useBuiltIns: false } 或者 将polyfill单独打包成dll文件使用（推选）
  import { cookie } from 'zeroer-core/esm-streamline'

  // 2.在项目按需导入polyfill 如 ['@babel/env', { useBuiltIns: 'usage', corejs: 3 }]
  import set from 'zeroer-core/esm/cookie/set'

  import { cookie } from 'zeroer-core/esm' 
  import { cookie } from 'zeroer-core' // 支持tree shaking 取package.json module字段与上面完全等价
```
## 总结
  - ts构建流程问题 [参考](https://github.com/Microsoft/TypeScript-Babel-Starter#readme)
    + tsc 兼容低版本 编译会将async 编译为Promise版 transform-runtime 并不能保证所有的Promise都被编译
    + ts在现阶段的作用 仅仅是类型检测 和 生成声明文件
    + 只使用babel处理所有ts文件 tsc只负责 生成声明文件 和 类型检测
  - tree shaking 问题
  ```
    // 在使用支持tree shaking构建器如 rollup、webpack@2+
    import set from 'zeroer-core/esm/cookie/set' // 推选 理论上最小
    // 会打入
    // 1.set 及 相关依赖
    // 2.不相关依赖中立执行函数
    // 3.不相关依赖中不是esm的模块 如使用['@babel/plugin-transform-runtime', { corejs: 3 }]填充的corejs是cjs模块

    import { set } from 'zeroer-core/esm/cookie' // 原则上与上面等价（但不相关依赖中立执行函数“有可能”比上面多）

    import { cookie } from 'zeroer-core/esm'
    // 会打入
    // 1.cookie 及 相关依赖
    // 2.不相关依赖的立执行函数
    // 3.不相关依赖不是esm的模块 如使用['@babel/plugin-transform-runtime', { corejs: 3 }]填充的corejs是cjs模块（这个特别大 如array就20kb+）
  ```
## TODO
```
  使用脚本 优化npm run build构建命令（设想 约定优于配置 types 只构建一次 cjs esm esm-streamline 都使用这个声明文件 package.json去掉types 默认取所选取版本目录的index.d.ts）
  zeroer-tool工具抽取
  uA 判断的完善 // 移动端未测试
  hook 目录的取舍问题 引入lerna后 我仍希望发正式版的包必须是主干！
  对react组件 .tsx .less 的支持 后期考虑去除（rollup尽量只用于构建纯js的项目 像ui库 最好还是使用webpack去构建）
  单元测试 集成部署测试
  覆盖率测试
```
