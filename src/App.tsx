import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

const App: React.FC = () => {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App