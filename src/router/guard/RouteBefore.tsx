import { getToken } from '@/util/secret'
import React from 'react'
import { Navigate } from 'react-router-dom'

const RouteBefore: React.FC<GuardProps> = (props) => {
  const { to, children } = props
  const width = window.innerWidth//查询屏幕宽度

  //简易路由守卫
  if(!getToken()) {
    return <Navigate to='/login' replace />
  }

  if (to == '/home') {
    return width >= 750 ? <>{children}</> : <Navigate to='/mobile' replace />
  } else if (to =='/mobile') {
    return width < 750 ? <>{children}</> : <Navigate to='/home' replace />
  }

  return <>{children}</>
}

interface GuardProps {
  to: string
  children: JSX.Element
}

export default RouteBefore