import React, { Component } from 'react'
import classNames from 'classnames'
import { name } from '../../package.json'
import './index.scss'

interface ButtonProps {
  type?: 'primary' | 'danger';
  onClick?: () => void;
  children?: React.ReactNode;
  [otherProps: string]: any;
}
interface ButtonState {
  counter: number;
}

class Button extends Component<ButtonProps, ButtonState> {
  static defaultProps = {
    type: 'primary',
    onClick: () => {},
  }
  readonly state = {
    counter: 0
  }
  handleClick = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }))
    this.props.onClick?.()
  }
  render() {
    const { type, children } = this.props
    return (
      <button
        className={classNames(`${name}-btn`, `${name}-btn-${type}`)}
        onClick={this.handleClick}
      >
        {children}
      </button>
    )
  }
}

export { Button }
