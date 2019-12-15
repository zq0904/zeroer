import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import store from './store' // 开启全局的严格模式 一定要放到所有组件上面
import { Provider } from 'mobx-react'
import App from './App'

// 全局配置 注入插件 store 等
import '@/assets/css/index'
import '@/assets/fonts/iconfont.css'

ReactDOM.render(
  <Provider {...store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
