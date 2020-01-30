import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// 全局配置 注入插件 store取默认的
import '@/common/styles/index.scss'
import '@/common/fonts/iconfont.css'

ReactDOM.render(<App />, document.getElementById('app'))
 