// 由于性能问题 TypeScript官方决定全面采用ESLint ESLint的TypeScript解析器也成为独立项目 typescript-eslint
// typescript-eslint 的一些ts规则 https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
module.exports = {
  root: true, // ESLint将停止查找父文件夹
  parser: '@typescript-eslint/parser', // 指定解析器 对ts校验 npm i -D @typescript-eslint/parser
  plugins: ['@typescript-eslint', 'react'], // npm i -D @typescript-eslint/eslint-plugin eslint-plugin-react
  env: {
    browser: true, // 浏览器全局变量
    node: true, // Node.js全局变量和Node.js作用域
    commonjs: true, // CommonJS全局变量和CommonJS作用域
    es6: true, // 启用除模块以外的所有ECMAScript 6功能
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended', // npm i -D eslint-plugin-react
  ],
  settings: { // 自动发现React的版本 从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect'
    },
    'import/ignore': ['\.(scss|less|css)$'] // ?
  },
  parserOptions: { // 指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: { // 启用JSX支持
      jsx: true
    }
  },
  rules: {
    'no-empty': 0, // 禁止空块语句 try {} catch(err) {}
    '@typescript-eslint/no-empty-function': 0, // 不允许空函数 noop 一些默认的空函数
    '@typescript-eslint/explicit-function-return-type': 0, // 要求函数和类方法的显式返回类型 (有些 是可以使用类型推断 省略的)
    '@typescript-eslint/no-explicit-any': 0, // 禁止使用该any类型
    // indent: 0, // 如果extends过standard等一些基础规则 必须禁用基本规则的缩进 在开启ts的缩进
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-member-accessibility': 0, // 在类属性和方法上需要显式的可访问性修饰符 (不写默认public 更简洁)
    '@typescript-eslint/no-parameter-properties': 0, // 禁止在类构造函数中使用参数属性 (简洁的声明与赋值)
    // 'no-useless-constructor': 0,
  }
}
