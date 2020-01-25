module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  "plugins": [
    ["@babel/plugin-transform-runtime", { "corejs": 3 }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器语法支持 必须在@babel/plugin-proposal-class-properties之前使用
    ["@babel/plugin-proposal-class-properties", { "loose": true }], // class属性支持
    ["@babel/plugin-syntax-dynamic-import"], // import() 语法支持 code-splitting
    // 以后空合并和可选链将会在直接在预设环境中 @babel/preset-env (参考)[https://github.com/babel/babel/issues/10690]
    "@babel/plugin-proposal-nullish-coalescing-operator", // 空合并
    "@babel/plugin-proposal-optional-chaining", // 可选链
    // ["@babel/plugin-proposal-export-default-from"], // export d from './module' (https://github.com/tc39/proposal-export-default-from)
    // ["@babel/plugin-proposal-export-namespace-from"] // export * as all from './module' (https://github.com/tc39/proposal-export-ns-from) // ts 3.8将支持
  ]
}
