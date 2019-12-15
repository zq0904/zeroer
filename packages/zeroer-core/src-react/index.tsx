import * as React from 'react'
import classNames from 'classnames'
import { name } from '../package.json'
import './style/index.less'

const tuple = <T extends string[]>(...args: T) => args
const ButtonTypes = tuple('primary', 'danger')
type ButtonType = (typeof ButtonTypes)[number]

interface ButtonProps {
  type?: ButtonType;
  children?: React.ReactNode;
}

interface ButtonState {
  d: boolean;
}

class Button extends React.Component<ButtonProps, ButtonState> {
  static defaultProps = {
    type: 'primary'
  }
  render () {
    const { type, children } = this.props
    return (
      <button className={classNames([`${name}-btn`, `${name}-btn-${type}`])}>{children}</button>
    )
  }
}

export { Button }
