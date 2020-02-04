import React, { FC } from 'react'
import { withRouter, NavLink, RouteComponentProps } from 'react-router-dom'
import { InternalProps, ExternalProps } from '@/common/ts'
import { PATH_JOB_CREATE, PATH_JOB_LIST } from '@/router/path'
import './index.scss'

const defaultProps = {
  height: 30
}

interface Props extends RouteComponentProps {
  height?: number;
}

const Header: FC<InternalProps<typeof defaultProps, Props>> = ({ height }) => (
  <div className="header" style={{ height, lineHeight: `${height}px` }}>
    <h4>Header 组件</h4>
    <NavLink to={PATH_JOB_CREATE} activeClassName="on">JobCreate</NavLink>
    <NavLink to={PATH_JOB_LIST} activeClassName="on">JobList</NavLink>
  </div>
)

Header.defaultProps = defaultProps

export default withRouter(Header as FC<ExternalProps<typeof defaultProps, Props>>)
