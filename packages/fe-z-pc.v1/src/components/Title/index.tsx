import React, { FC, useEffect } from 'react'

const Title: FC<{ children: string }> = ({ children }) => {
  useEffect(() => {
    window.document.title = children
  }, [children])
  return <></>
}

export default Title
