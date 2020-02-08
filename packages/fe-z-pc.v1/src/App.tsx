import React, { StrictMode, Suspense } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Layout from '@/components/Layout'
import Spin from '@/components/Spin'
import { rootRoutes, renderRoutes } from '@/router'

const App = () => (
  <StrictMode>
    <Router>
      <Suspense fallback={<Spin style={{ minHeight: 'calc(100vh - 30px)' }} />}>
        <Layout>{renderRoutes(rootRoutes)}</Layout>
      </Suspense>
    </Router>
  </StrictMode>
)

export default App
