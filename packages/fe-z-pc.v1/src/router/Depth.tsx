import React, { FC, createContext, useContext } from 'react'
import Intercept from './Intercept'

const Dep = createContext(0)
const Depth: FC = (props) => {
  // react 不像 vue 很容易拿到组件使用的父级上下文 this.$parent等
  const depth = useContext(Dep)
  return (
    <Dep.Provider value={depth + 1}>
      {
        depth === 0 ? (
          <Intercept>
            { props.children }
          </Intercept>
        )
          : props.children
      }
    </Dep.Provider>
  )
}

export default Depth
