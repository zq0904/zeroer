console.log(process.env.BABEL_MODULES)

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: process.env.BABEL_MODULES ? process.env.BABEL_MODULES : false }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 装饰器语法支持 必须在@babel/plugin-proposal-class-properties之前使用
    ['@babel/plugin-proposal-class-properties', { loose: true }], // class属性支持
    // ['@babel/plugin-proposal-export-default-from], // export d from './module' (https://github.com/tc39/proposal-export-default-from)
    // ['@babel/plugin-proposal-export-namespace-from] // export * as all from './module' (https://github.com/tc39/proposal-export-ns-from) // ts 3.8将支持
  ]
}
