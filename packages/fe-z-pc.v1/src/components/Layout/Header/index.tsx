import React, { Component } from 'react'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import './index.scss'

interface HeaderProps extends RouteComponentProps {
  height?: number
}

class Header extends Component<HeaderProps> {
  static defaultProps = {
    height: 30
  }
  render() {
    const { height } = this.props
    return (
      <div className="header" style={{ height, lineHeight: `${height}px` }}>
        <h4>Header 组件</h4>
        <Link to="/JobCreate">JobCreate</Link>
        <Link to="/JobList">JobList</Link>
      </div>
    )
  }
}

export default withRouter(Header)
