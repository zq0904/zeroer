import React from 'react'
import Header from '@/components/Header'

const Layout = ({ children }) => (
  <>
    <Header />
    { children }
  </>
)

export default Layout
