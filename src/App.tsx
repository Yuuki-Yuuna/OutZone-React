import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

const App: React.FC = () => {
  return (
    <Suspense>
      {useRoutes(routes)}
    </Suspense>
  )
}

export default App