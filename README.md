# 使用Lerna管理 zeroer项目
## 安装依赖
```
  npm run install // 初次下载依赖（未使用hoist参数 参见注意事项）
  删除或添加依赖项 // 在相应的包里 npm i <pkg_name> | npm uni <pkg_name>（破坏“软连接”）
```
## 开发流程
```
  进入zeroer-cli项目下执行 npm link
  进入fe-z-pc.v1项目下执行 npm i && npm link zeroer-cli // 参见注意事项
```
## 发布
```
  // 发布正式包 必须是主干才能使用lerna发包
  // 只有发布正式包时 才会生成CHANGELOG文件
  // 测试包 随便发（不需要保证测试包的分支是远程最新 也不会打tag）
  npm run release // 交互式可选
  npm run release --preset alpha 等价于 node scripts/release.js --preset alpha // 发布alpha版
```
## 其他命令
```
  npm run list // 查看当前各个包的版本信息
  npm run commit // 使用commitizen cz-conventional-changelog 以询式的方式去获取所需的commit提交信息
```
- 常用的type类型有
  | type | 描述 |
  | - | - |
  | feat | 新功能 |
  | fix | 修复故障 |
  | improvement | 对当前特性的改进 |
  | docs | 只改变文档 |
  | style | 不影响代码含义的更改(空格、格式、缺少分号等) |
  | refactor | 重构 既不修复bug也不添加特性的代码更改 |
  | perf | 改进性能的代码更改 |
  | test | 添加缺失的测试或修改现有的测试 |
  | build | 影响构建系统或外部依赖项的更改(例如作用域:gulp、broccoli、npm) |
  | chore | 不修改src或测试文件的其他更改 |
  | revert | 返回先前的提交 |
## 注意事项
  - npm link 或（lerna bootstrap | lerna add）的“软连接”复用形式
    + 针对“类ui”包（不涉及 子进程命令加载的） 应该是比较好用的
    + 针对“类cli”包 可以尝试先安装这个cli包（实际上先把依赖装到node_modules下）在使用npm link <pkg_name>
## TODO
```
  2. babel env 8.6+ 更新
  3. 下载模板包及命令 编写
  4. script/release.js execA执行 git commit -m 'chore(release): publish' 报错问题 暂时使用execP代替
  5. npx lerna bootstrap 使用hoist参数 // zeorer-core 中 rollup rollup-plugin-node-resolve模块解析算法有问题 [参见](https://github.com/lerna/lerna/blob/master/doc/hoist.md)
```
