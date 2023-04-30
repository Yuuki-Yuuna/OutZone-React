import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Navigate to='/' />
  },
  {
    path: '/',
    Component: lazy(() => import('~/views/Home/Home'))
  },
  { path: '/intro', Component: lazy(() => import('~/views/Intro/Intro')) }
])

export default router
