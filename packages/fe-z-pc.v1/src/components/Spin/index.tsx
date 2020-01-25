import React from 'react'
import classNames from 'classnames'
import './index.scss'

interface Props {
  className?: string;
  [otherProps: string]: any;
}

const Spin: React.FC<Props> = ({ className, children, ...otherProps }) => <div className={classNames('spin-loading', className)} {...otherProps}>{ children }</div>

export default Spin
