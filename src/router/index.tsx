import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import RouteBefore from './guard/RouteBefore'

const Login = lazy(() => import('@/views/Login/Login'))
const Home = lazy(() => import('@/views/Home/Home'))
const Directory = lazy(() => import('@/views/Home/Directory/Directory'))
const PictureWall = lazy(() => import('@/views/Home/PictureWall/PictureWall'))
const Mobile = lazy(() => import('@/views/Mobile/Mobile'))

export default createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: (
      <RouteBefore to='/home'>
        <Home />
      </RouteBefore>
    ),
    children: [
      {
        path: '',//默认二级路由
        element: <Navigate to='directory/all' />
      },
      {
        path: 'directory/:category',
        element: <Directory />
      },
      {
        path: 'timeline/:category',
        element: <PictureWall />
      }
    ]
  },
  {
    path: '/mobile',
    element: (
      <RouteBefore to='/mobile'>
        <Mobile />
      </RouteBefore>
    )
  }
])