import React, { Component } from 'react'
import { RouteConfigComponentProps } from '@/router'
import { InternalProps } from '@/common/ts'
import { observable, action } from 'mobx'
import { StoreContext } from '@/store'
import { Observer } from 'mobx-react'
import Title from '@/components/Title'
import './index.scss'
import logo from '@/common/images/logo.svg'
import tp from './images/tp.jpg'
import music from '@/common/medias/music.mp3'

const defaultProps = {
  info: '信息'
}

interface JobListProps extends RouteConfigComponentProps {
  info?: string;
}

interface JobListState {
  toggle: boolean;
}

class JobList extends Component<InternalProps<typeof defaultProps, JobListProps>, JobListState> {
  static defaultProps = defaultProps
  // 一但使用类属性语法 会覆盖掉state的默认的只读类型 所以一般在写类属性语法 会强制加上只读类型 提供友好体验
  state: Readonly<JobListState> = {
    toggle: false
  }

  @observable
  toggle = false

  @action.bound
  handleToggle = () => this.toggle = !this.toggle

  componentDidMount () {
    console.log('JobList组件 componentDidMount')
  }

  render () {
    return (
      <StoreContext.Consumer>
        {({ jobListStore }) => (
          <Observer>{() => (
            <div className="job-list">
              <Title>职位列表</Title>
              <h4>JobList 组件</h4>
              <hr/>
              {/* 测试公共资源 */}
              <span className="iconfont icon-check-circle"></span>
              <img src={logo} alt="" style={{ width: 100, height: 100 }} />
              <img src={tp} alt="" style={{ width: 100, height: 100 }} />
              <div className="bg-tp" style={{ width: 100, height: 100 }} />
              <audio src={music} controls />
              <hr/>
              {/* 组件state数据 */}
              <p>{ this.state.toggle ? '显示' : '隐藏' }</p>
              <button onClick={() => this.setState(v => ({ toggle: !v.toggle }))}>toggle</button>
              <hr/>
              {/* 组件mobx数据 */}
              <p>{ this.toggle ? '显示' : '隐藏' }</p>
              <button onClick={this.handleToggle}>toggle</button>
              <hr/>
              {/* 测试store */}
              <p>
                职位id：
                <input type="text"
                  value={jobListStore.jobId}
                  onChange={e => jobListStore.setStore({ jobId: e.target.value })}
                />
              </p>
              <p>
                <button onClick={jobListStore.getJobList2}>获取职位列表数据</button>
              </p>
              <pre>jobListStore.jobList：{JSON.stringify(jobListStore.jobList, null, 2)}</pre>
              <hr/>
              {/* 测试styled-jsx */}
              {/*
                支持 styled-jsx 语法（复杂场景 并不推选使用）
                1.scss 嵌套 编译器的 提示信息会有问题
                2.因为本质是模板字符串 图片引用需要单独调用 require() 有些繁琐
                3.编译不会单独提取css文件 会增加js体积
                vscode 相关需安装
                语法高亮 vscode-styled-jsx
                语法提示 styled-jsx Language Server
              */}
              {/* <p className="p1">
                red&nbsp;
                <span className={classnames(this.toggle ? 'red' : 'white')}>yellow</span>
                <button onClick={this.handleToggle}>toggle color</button>
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
              `}</style> */}
            </div>
          )}</Observer>
        )}
      </StoreContext.Consumer>
    )
  }
}

export default JobList
