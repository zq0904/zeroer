/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect } from 'react'
import { withRouter, RouteComponentProps, Router, match } from 'react-router-dom'
import { LocationDescriptorObject, Location } from 'history'
import { useMergeState } from '@/common/ts'
import { beforeEach } from './config'
import Spin from '@/components/Spin'

let oldLocation: Location = {
  pathname: '/',
  search: '',
  hash: '',
  state: undefined
}

const Intercept: FC<RouteComponentProps> = props => {
  const [state, setState] = useMergeState({
    isLoading: true,
    isNext: false
  })
  useEffect(() => {
    setState({ isLoading: true, isNext: false })
    beforeEach(props.location, oldLocation, (arg) => {
      if (arg === undefined) {
        oldLocation = props.location
        return setState({ isLoading: false, isNext: true })
      }
      if (arg === false) return setState({ isLoading: false, isNext: false })
      let location: LocationDescriptorObject & { replace?: boolean } = {}
      typeof arg === 'string' ? location.pathname = arg : location = arg
      const { replace, ...args } = location
      props.history[replace ? 'replace' : 'push'](args)
      setState({ isLoading: false })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]) // 绝对不能添加setState
  if (state.isLoading) return <Spin style={{ minHeight: 'calc(100vh - 30px)' }} />
  return state.isNext ? <>{props.children}</> : null
}

export default withRouter(Intercept)
