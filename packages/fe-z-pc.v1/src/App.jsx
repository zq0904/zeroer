import React, { StrictMode } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'
import RouterView from './router'

const App = () => (
  <StrictMode>
    <Router>
      <Layout>
        <RouterView />
      </Layout>
    </Router>
  </StrictMode>
)

export default App
