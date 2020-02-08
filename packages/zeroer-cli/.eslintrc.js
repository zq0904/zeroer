
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: { // 0关闭 1警告 2错误
    'comma-dangle': [1, 'only-multiline'], // 尾随逗号 允许（但不要求）多行可加可不加 单行不允许
    'no-return-assign': 0, // 函数不应该返回赋值 仅仅是为了更简洁
    'react/prop-types': 0, // 有了ts以后 不强制使用prop-types来校验
    '@typescript-eslint/ban-ts-ignore': 0, // 禁止使用 @ts-ignore
    '@typescript-eslint/no-empty-function': 0, // 不允许空函数 noop 一些默认的空函数
    '@typescript-eslint/explicit-function-return-type': 0, // 要求函数和类方法的显式返回类型 (有些 是可以使用类型推断 省略的)
    '@typescript-eslint/no-explicit-any': 0, // 禁止使用该any类型

    '@typescript-eslint/no-var-requires': 0, // 禁止使用require语句，导入语句除外
    '@typescript-eslint/no-unused-vars': 0, // 已声明 但从未读取其值
  }
}
