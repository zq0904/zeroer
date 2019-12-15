module.exports = {
  "root": true, // ESLint将停止查找父文件夹
  // "parser": "babel-eslint", // 指定解析器 默认使用esprima 对js校验 npm i -D babel-eslint 对ts校验 npm i -D @typescript-eslint/parser
  "parser": "@typescript-eslint/parser", // 对ts校验 npm i -D @typescript-eslint/parser
  "plugins": ["@typescript-eslint", "react"], // npm i -D @typescript-eslint/eslint-plugin
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    'standard', // 标准风格 npm i -D eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended", // npm i -D eslint-plugin-react
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    "ecmaFeatures": { // 启用JSX支持
      "jsx": true
    }
  },
  "settings": { // 指定将在所有插件规则中共享的设置 react 必须设置版本
    "react": {
      "version": "latest"
    },
    "import/ignore": ['\.(scss|less|css)$']
  },
  // ts规则 https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
  'rules': {
    "curly": 0, // if语句必须有花括号
    "comma-dangle": 0, // 禁止使用尾随逗号
    "no-return-assign": 0, // return 赋值语句
    "indent": 0, // 必须禁用基本规则 的缩进 在开启ts的缩进
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/explicit-function-return-type": 0, // 要求函数和类方法的显式返回类型 (有些 是可以使用类型推断 省略的)
    "@typescript-eslint/no-explicit-any": 0, // 禁止使用该any类型
    "@typescript-eslint/explicit-member-accessibility": 0, // 在类属性和方法上需要显式的可访问性修饰符 (不写默认public 更简洁)
    "@typescript-eslint/no-parameter-properties": 0, // 禁止在类构造函数中使用参数属性 (简洁的声明与赋值)
    "no-useless-constructor": 0,
  }
}
