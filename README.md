# 使用Lerna 管理zeroer项目
## 注意事项
  - npm link | lerna 的“软连接”复用形式
    + 针对ui包（不涉及 子进程命令加载的） 应该是比较好用的
    + cli包 要么将这个包发布调试 要么 先安装这个cli（先把依赖装到node_modules下）在使用npm link
## 使用 npm run commit 方便的获取所需的commit信息
  - 常用的type类型有

  | type | 描述 |
  | - | - |
  | feat | 新功能 |
  | fix | 修复故障 |
  | improvement | 对当前特性的改进 |
  | docs | 只改变文档 |
  | style | 不影响代码含义的更改(空格、格式、缺少分号等) |
  | refactor | 既不修复bug也不添加特性的代码更改 |
  | perf | 改进性能的代码更改 |
  | test | 添加缺失的测试或修改现有的测试 |
  | build | 影响构建系统或外部依赖项的更改(例如作用域:gulp、broccoli、npm) |
  | chore | 不修改src或测试文件的其他更改 |
  | revert | 返回先前的提交 |
## TODO
```
  npx lerna bootstrap 不能使用hoist参数 // zeorer-core 中 rollup rollup-plugin-node-resolve模块解析算法有问题 [参见](https://github.com/lerna/lerna/blob/master/doc/hoist.md)
  "ignoreChanges": ["fe-z-pc.v1", "zeroer-core"] 未测试
```
