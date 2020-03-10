let modules = false
let corejs = false

switch (process.env.BABEL_MODULE) {
  case 'cjs':
    modules = 'cjs'
    corejs = 3
    break
  case 'esm':
    modules = false
    corejs = 3
    break
  case 'esm-streamline':
    modules = false
    corejs = false
    break
  default:
}

module.exports = {
  presets: [
    ['@babel/preset-env', { modules }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs }],
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 装饰器语法支持 必须在@babel/plugin-proposal-class-properties之前使用
    ['@babel/plugin-proposal-class-properties', { loose: true }], // class属性支持
    // ['@babel/plugin-proposal-export-default-from], // export d from './module' (https://github.com/tc39/proposal-export-default-from)
    // ['@babel/plugin-proposal-export-namespace-from] // export * as all from './module' (https://github.com/tc39/proposal-export-ns-from) // ts 3.8将支持
  ]
}
