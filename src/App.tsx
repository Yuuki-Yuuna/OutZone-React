import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { setToken } from './util/secret'

const App: React.FC = () => { 

  setToken('eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkNTAyNzI5YmM5Yjc0OWZkOGE5ZjM1NTEyMjk3M2M4NyIsInN1YiI6ImI2YWJhYjg4NmZjMzQ1MmY4YWZmNDJiMTFjYTRkMWM4IiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY2NzkwMTAzLCJleHAiOjE2NjkzODIxMDN9.nqJ_utKhsv4mRsFU6Ab-oRgMFZ91mTJXSvcoGc47qGQ')
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App