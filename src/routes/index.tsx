import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Login = lazy(() => import('@/views/Login/Login'))
const Home = lazy(() => import('@/views/Home/Home'))
const Directory = lazy(() => import('@/views/Home/Directory/Directory'))
const Timeline = lazy(() => import('@/views/Home/Timeline/Timeline'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '',//默认二级路由
        element: <Navigate to={'directory'} />
      },
      {
        path: 'directory',
        element: <Directory />
      },
      {
        path: 'timeline',
        element: <Timeline />
      }
    ]
  }
]


export default routes