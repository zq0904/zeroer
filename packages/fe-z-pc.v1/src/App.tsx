import React, { StrictMode } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Layout from '@/components/Layout'
import RootRouterView from './router'

const App = () => (
  <StrictMode>
    <Router>
      <Layout>
        <RootRouterView />
      </Layout>
    </Router>
  </StrictMode>
)

export default App
