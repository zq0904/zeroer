import { eslint } from 'rollup-plugin-eslint'
import clear from 'rollup-plugin-clear' // 清除目录
import json from '@rollup/plugin-json' // 一个将.json文件转换为ES6模块
import resolve from '@rollup/plugin-node-resolve' // 它使用Node解析算法来定位模块，以便在node_modules
import commonjs from '@rollup/plugin-commonjs' // 将CommonJS模块转换为ES6 rollup默认只支持ES6模块
import postcss from 'rollup-plugin-postcss' // npm i -D rollup-plugin-postcss less
import autoprefixer from 'autoprefixer' // 根据browserslist 去添加前缀（必须配置browserslist）
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress' // 构建进度
import banner from 'rollup-plugin-banner' // banner
import { terser } from 'rollup-plugin-terser' // uglify只能压缩es5语法 terser可以压缩es6语法
import browsersync from 'rollup-plugin-browsersync'
import { main as mainPath, module as modulepath, version, name } from './package.json'

const isProduction = process.env.NODE_ENV === 'production'
const extensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx']

const output = [{
  file: mainPath,
  format: 'umd', // 可选值 amd cjs esm iife umd
  name: 'Zero', // (如果是iife/umd格式 则必填) 全局导出的变量名
  globals: { // 配合外控者依赖的全局变量
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  sourcemap: !isProduction
}]

if (isProduction && modulepath) output.push({
  file: modulepath,
  format: 'esm',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
})

const rollupConfig = {
  input: './src/index.ts',
  external: ['react', 'react-dom'], // 外控者 import React from 'react' 不会将react打到包里而是直接使用全局就已经存在的React变量
  output,
  plugins: [
    eslint({
      throwOnError: true, // 错误 直接抛出 中断打包
      throwOnWarning: true, // 警告 直接抛出 中断打包
      include: extensions.map(suffix => 'src/**/*' + suffix), // 如果设置 src/** 连less都会检测
    }),
    clear({
      targets: ['umd', 'esm'],
      watch: !isProduction, // 当rollup在—w模式下重新编译时
    }),
    json(),
    resolve({
      extensions // 也需要加上解析.ts
    }),
    commonjs({ include: '**' }),
    postcss({
      extensions: ['.css', '.scss', '.sass'],
      plugins: [autoprefixer],
      extract: isProduction, // 提取css
      minimize: isProduction, // 压缩css
    }),
    babel({
      // npm i -S @babel/runtime-corejs3 3这个版本 连.includes .repeat 都能添加 几乎就不存在不能添加的“非实例方法”
      // npm i -D @babel/plugin-transform-runtime
      // 自动添加 “非实例方法”的polyfill 而且还是闭包作用域非全局 很适合库的构建
      runtimeHelpers: true, // transform-runtime
      extensions // Babel应该转换的文件扩展名数组
    }),
    progress(),
    isProduction && terser(),
    isProduction && banner(`${name} v${version} Date: ${new Date()}`), // 压缩的过程会删除注释 banner在压缩后添加 (banner中版本号还有一个重要的作用是check程序会校验版本号是否一致)
    !isProduction && browsersync({ // 也支持代理中间件 https://browsersync.io/docs/options
      server: {
        baseDir: './', // www目录
      },
      port: 4321, // 这个端口 只有配置到server平级才好使
      startPath: '/test/', // 自动打开浏览器的访问路径
      files: ['src/**/*.*', 'test/**/*.*'] // 需要监视的文件
    }),
  ]
}

export default rollupConfig
