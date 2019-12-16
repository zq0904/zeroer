// 自己构建一个babel预设 不能导出对象 只允许导出函数 否则会收到这个错误
// Error: Plugin/Preset files are not allowed to export objects, only functions
module.exports = () => ({
  "presets": [
    ["@babel/preset-env", {
      // useBuiltIns: 'usage',
      // corejs: 3,
      // false 不会对 import 'core-js' 做任何处理 你引入了就使用 没引入就不使用
      // 'entry' 启用新的插件 去替换import "core-js/stable";和import "regenerator-runtime/runtime"语句，并分别要求不同的core-js基于环境的入口点
      // 'usage' 不需要手动 import 'core-js' 会按需导入用到的es+语法
    }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", { "corejs": false }], // 只是想使用 Helper aliasing
    ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器语法支持 必须在@babel/plugin-proposal-class-properties之前使用
    ["@babel/plugin-proposal-class-properties", { "loose": true }], // class属性支持
    ["@babel/plugin-syntax-dynamic-import"], // import() 语法支持 code-splitting
    ["styled-jsx/babel", { // styled-jsx语法支持
      "plugins": [
        "styled-jsx-plugin-postcss",
        "styled-jsx-plugin-sass",
      ]
    }],
  ]
})
