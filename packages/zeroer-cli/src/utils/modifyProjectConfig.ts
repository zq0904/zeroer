import fse from 'fs-extra'
import { parse } from '@babel/parser' // 将代码解析为ast语法抽象树
import babelTraverse from '@babel/traverse' // 对ast语法抽象树的 进一步遍历和更新节点
import babelGenerator from '@babel/generator'
import { log } from './log'
import { paths } from './paths'
import { commandLineArgs } from './commandLineArgs'
import { ObjectProperty } from '@babel/types'

const modifyProjectConfig = async (strs: string, val: any) => {
  const res = await fse.readFile(`${paths.project.root}/${commandLineArgs.project}`, 'utf8')

  const ast = parse(res, { plugins: ['typescript'], sourceType: 'module' })

  // export default 命名的默认导出
  let ExportDefaultDeclarationName: null | string = null

  // 递归寻找 并赋值
  const _modify = (arr: string[], properties: ObjectProperty[]): any => {
    const key = arr.shift()
    const isLast = arr.length === 0
    for (const property of properties) {
      let name: null | string = null
      if (property.key.type === 'Identifier') { // 键形如 mock
        name = property.key.name
      } else if (property.key.type === 'Literal') { // 键形如 'dll-entry'
        name = property.key.value
      }
      if (name === key) {
        // @ts-ignore
        return isLast ? property.value.value = val : _modify(arr, property.value.properties)
      }
    }
    return log(`modifyProjectConfig 方法执行失败 在${ExportDefaultDeclarationName}上 不存在${strs}`, 'red')
  }

  babelTraverse(ast, {
    ExportDefaultDeclaration: node => {
      // @ts-ignore
      node.node.declaration.name && (ExportDefaultDeclarationName = node.node.declaration.name)
    }
  })
  if (!ExportDefaultDeclarationName) return log('modifyProjectConfig 方法执行失败 项目不具有 命名的默认导出 ExportDefaultDeclarationName 不存在！', 'red')

  babelTraverse(ast, {
    VariableDeclarator: node => {
      // @ts-ignore
      if (node.node.id.name === ExportDefaultDeclarationName) {
        // @ts-ignore
        _modify(strs.split('.'), node.node.init.properties)
      }
    },
  })

  // 目前配置项 还没有删除;这一选项
  const { code } = babelGenerator(ast)

  fse.outputFile(`${paths.project.root}/${commandLineArgs.project}`, code)
}

export { modifyProjectConfig }
