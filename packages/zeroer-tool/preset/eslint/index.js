
// 由于性能问题 TypeScript官方决定全面采用ESLint ESLint的TypeScript解析器也成为独立项目 typescript-eslint
// typescript-eslint 的一些ts规则 https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin

module.exports = {
  root: true, // eslint将停止查找父文件夹
  env: {
    browser: true, // 浏览器全局变量
    node: true, // Node.js全局变量和Node.js作用域
    commonjs: true, // CommonJS全局变量和CommonJS作用域
    es6: true, // 启用除模块以外的所有ECMAScript 6功能
  },
  parser: '@typescript-eslint/parser', // 指定解析器 @typescript-eslint/parser
  extends: [
    'standard', // eslint-config-standard 依赖 eslint-plugin-standard eslint-plugin-node eslint-plugin-import eslint-plugin-promise
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'], // @typescript-eslint/eslint-plugin
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: { // 0关闭 1警告 2错误
    'comma-dangle': [1, 'only-multiline'], // 尾随逗号 允许（但不要求）多行可加可不加 单行不允许
    'no-return-assign': 0, // 函数不应该返回赋值 仅仅是为了更简洁
    '@typescript-eslint/ban-ts-ignore': 0, // 禁止使用 @ts-ignore
    '@typescript-eslint/no-empty-function': 0, // 不允许空函数 noop 一些默认的空函数
    '@typescript-eslint/explicit-function-return-type': 0, // 要求函数和类方法的显式返回类型 (有些 是可以使用类型推断 省略的)
    '@typescript-eslint/no-explicit-any': 0, // 禁止使用该any类型
  }
}
