import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './style'

class Header extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired
  }
  static defaultProps = {
    height: 30
  }
  render() {
    return (
      <div className={classnames('header')}>
        Header 组件
        <Link to="/Bar">Bar</Link>
        <Link to="/Foo">Foo</Link>
      </div>
    )
  }
}

export default Header
