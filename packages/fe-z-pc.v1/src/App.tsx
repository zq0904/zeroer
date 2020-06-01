import React, { StrictMode, Suspense } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { RefreshProvider } from './store/utils'
import Layout from '@/components/Layout'
import Spin from '@/components/Spin'
import { rootRoutes, renderRoutes } from '@/router'

const App = () => (
  <StrictMode>
    <RefreshProvider>
      <Router>
        <Suspense fallback={<Spin style={{ minHeight: 'calc(100vh - 30px)' }} />}>
          <Layout>{renderRoutes(rootRoutes)}</Layout>
        </Suspense>
      </Router>
    </RefreshProvider>
  </StrictMode>
)

export default App
