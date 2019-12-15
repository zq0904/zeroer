import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './style'

@inject('testStore')
@observer
class Foo extends Component {
  componentDidMount() {
    console.log('Foo组件 componentDidMount', this.props)
  }
  render() {
    return (
      <div className="foo">
        Foo 组件
      </div>
    )
  }
}

export default Foo
