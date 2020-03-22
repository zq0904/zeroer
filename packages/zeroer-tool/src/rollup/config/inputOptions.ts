// @ts-ignore
import { eslint } from 'rollup-plugin-eslint'
// @ts-ignore
import clear from 'rollup-plugin-clear' // 清除目录
import json from '@rollup/plugin-json' // 一个将.json文件转换为ES6模块
import nodeResolve from '@rollup/plugin-node-resolve' // 它使用Node解析算法来定位模块，以便在node_modules
import commonjs from '@rollup/plugin-commonjs' // 将CommonJS模块转换为ES6 rollup默认只支持ES6模块
// import postcss from 'rollup-plugin-postcss' // npm i -D rollup-plugin-postcss less
// import autoprefixer from 'autoprefixer' // 根据browserslist 去添加前缀（必须配置browserslist）
// @ts-ignore
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress' // 构建进度
import { terser } from 'rollup-plugin-terser' // uglify只能压缩es5语法 terser可以压缩es6语法
// @ts-ignore
import browsersync from 'rollup-plugin-browsersync'
import { paths, resolve, isPrd } from '../../utils'
import { BuildVersion } from '../../types'

// TODO从配置文件中获取
const extensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx']

const inputOptions = {
  input: resolve(paths.project.root, 'src/index.ts'),
  // external: ['react', 'react-dom'], // 外控者 import React from 'react' 不会将react打到包里而是直接使用全局就已经存在的React变量
  plugins: [
    eslint({
      throwOnError: true, // 错误 直接抛出 中断打包
      throwOnWarning: true, // 警告 直接抛出 中断打包
      include: extensions.map(suffix => resolve(paths.project.src, '**/*' + suffix)), // 如果设置 src/** 连less都会检测
    }),
    !isPrd && clear({
      targets: [resolve(paths.project.root, BuildVersion.umd)],
      watch: true, // 当rollup在—w模式下重新编译时
    }),
    json(),
    nodeResolve({
      extensions // 也需要加上解析.ts
    }),
    commonjs({ include: '**' }),
    // postcss({
    //   extensions: ['.css', '.scss', '.sass'],
    //   plugins: [autoprefixer],
    //   extract: isPrd, // 提取css
    //   minimize: isPrd, // 压缩css
    // }),
    babel({
      // npm i -S @babel/runtime-corejs3 3这个版本 连.includes .repeat 都能添加 几乎就不存在不能添加的“非实例方法”
      // npm i -D @babel/plugin-transform-runtime
      // 自动添加 “非实例方法”的polyfill 而且还是闭包作用域非全局 很适合库的构建
      runtimeHelpers: true, // transform-runtime
      extensions, // Babel应该转换的文件扩展名数组
    }),
    progress(),
    isPrd && terser(),
    !isPrd && browsersync({ // 也支持代理中间件 https://browsersync.io/docs/options
      server: {
        baseDir: paths.project.root, // www目录
      },
      port: 4321, // 这个端口 只有配置到server平级才好使
      startPath: '/test/', // 自动打开浏览器的访问路径
      files: [ // 需要监视的文件
        resolve(paths.project.src, '**/*.*'),
        resolve(paths.project.root, 'test/**/*.*')
      ]
    }),
  ]
}

export default inputOptions
