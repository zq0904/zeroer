## rollup ts 构建 库 [插件列表](https://github.com/rollup/awesome)
## 命令
```
  npm run dev // 开发模式 (使用browsersync 支持proxy中间件)
  npm run build // 构建 umd版本 esm版本 声明文件
  npm run build:js // 构建 umd版本 esm版本
  npm run build:types // 构建 声明文件
  npm run check:types // 类型检测 (eslint + vscode 配置好 可以完全忽略)
```
## 构建流程问题 [参考](https://github.com/Microsoft/TypeScript-Babel-Starter#readme)
```
  1.tsc 兼容低版本 编译会将async 编译为Promise版 transform-runtime 并不能保证所有的Promise都被编译
  2.ts在现阶段的作用 仅仅是类型检测 和 生成声明文件
  3.只使用babel处理所有ts文件 tsc只负责 生成声明文件 和 类型检测
```
## 使用
```
  import { Object } from 'zeroer-core'
```
## 注意问题
```
  兼容性 支持IE10及以上 （按需内联了相关的）
  由于保留了模块作用域 牺牲了“部分” tree swing
```
## 新增
```
  数组做差
  getQs
  setQs
  Event 订阅发布模型
  SessionStorage 主要用于 兼容Safari无痕
  LocalStorage 加入过期时间概念

  对 react组件 .tsx .less 支持
```
## 遗留问题
```
  uA 判断的完善 // 移动端未测试

  单元测试 集成部署测试
  覆盖率

  tool工具抽取
```
