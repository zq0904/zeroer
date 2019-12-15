## 问题 构建编译 styled-jsx -> post-css未生效
## eslint 没加 ts集成
## 缓存问题 https://github.com/jiangjiu/blog-md/issues/49
## zero 命令生成项目模板
## --help帮助命令等

## 多页面应用等
## minimist库 很轻量的参数解析库
```javascript
  const minimist = require('minimist')
  // 终端输入 npx fet-service one --a=1 --b 2 -c 3 -d=4 two
  console.log(process.argv.slice(2)) // [ 'one', '--a=1', '--b', '2', '-c', '3', '-d=4', 'two' ] 原声方法解析 参数格式凌乱
  minimist(process.argv.slice(2)) // { _: [ 'one', 'two' ], a: 1, b: 2, c: 3, d: 4 } 不管是 --a=1 --b 2 -c 3 -d=4 都能统一参数
```