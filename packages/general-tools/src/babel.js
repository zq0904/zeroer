const parser = require('@babel/parser') // 字符串 => ast
const { default: traverse } = require('@babel/traverse') // 遍历 ast
const t = require('@babel/types') // 构建、验证和转换AST node 的方法
const { default: template } = require('@babel/template') // 构建、验证和转换AST node 的方法
const { default: generate } = require('@babel/generator') // ast => 字符串

module.exports = {
  parser,
  traverse,
  t,
  template,
  generate,
}
