module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  "plugins": [
    ["@babel/plugin-transform-runtime", { "corejs": 3 }],
    // ["@babel/plugin-proposal-object-rest-spread"], // 对象结构 就算不配置这个插件 测试仍然是兼容的
    // ["@babel/plugin-proposal-numeric-separator"],
    ["@babel/plugin-proposal-class-properties", { "loose": true }], // class属性支持
    ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器语法支持
    ["@babel/plugin-syntax-dynamic-import"], // import() 语法支持 code-splitting
    // ["@babel/plugin-proposal-export-default-from"], // export d from './module' (https://github.com/tc39/proposal-export-default-from)
    // ["@babel/plugin-proposal-export-namespace-from"] // export * as all from './module' (https://github.com/tc39/proposal-export-ns-from)
  ]
}