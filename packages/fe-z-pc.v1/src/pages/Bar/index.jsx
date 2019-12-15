import React, { Component } from 'react'
import classnames from 'classnames'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import './style'

import tp from '@/assets/images/logo.svg' // 公共资源
import nowTp from './images/tp.jpg'
import music from '@/assets/media/music.mp3'

@inject('testStore')
@observer
class Bar extends Component {
  @observable
  toggle = false
  @action.bound
  toggleColor = () => this.toggle = !this.toggle
  componentDidMount() {
    console.log('Bar组件 componentDidMount', this.props)
  }
  render() {
    const { testStore } = this.props
    return (
      <div className="bar">
        Bar 组件
        <p>testStore.num 数量：{testStore.num}</p>
        <p>testStore.price 价格：{testStore.price}</p>
        <p>testStore.totalPrice 总价格：{testStore.totalPrice}</p>
        <p><button onClick={testStore.add}>testStore.add</button></p>
        <p><button onClick={testStore.asyncAdd}>testStore.asyncAdd</button></p>
        <p><button onClick={testStore.asyncAddFlow}>testStore.asyncAddFlow</button></p>
        <div className="bg-tp"></div>
        <img src={tp} alt="" width="50" height="50" />
        <img src={nowTp} alt="" width="100" height="100" />
        <audio src={music} controls></audio>
        <span className="iconfont icon-check-circle"></span>
        {/*
          支持 styled-jsx 语法（复杂场景 并不推选使用）
          1.scss 嵌套 编译器的 提示信息会有问题
          2.因为本质是模板字符串 图片引用需要单独调用 require() 有些繁琐
          3.编译不会单独提取css文件 会增加js体积
          vscode 相关需安装
          语法高亮 vscode-styled-jsx
          语法提示 styled-jsx Language Server
        */}
        <p className="p1">
          red&nbsp;
          <span className={classnames(this.toggle ? 'red' : 'white')}>yellow</span>
          <button onClick={this.toggleColor}>toggle color</button>
        </p>
        <style jsx>{`
          .p1 {
            margin: 0;
            padding: 0;
            color: red;
            transform: translate(0);
            background: url(${require('./images/tp.jpg')}) no-repeat 0 0 / 100% 100%;
            .red {
              color: red;
            }
            .white {
              color: white;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Bar
