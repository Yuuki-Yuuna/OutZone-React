import React from 'react'
import './Login.scss'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import type { LoginUser } from '@/type/User'

const Login: React.FC = () => {
  const login = (userInfo: LoginUser) => {
    console.log('Success:', userInfo)
  }

  return (
    <div className='login'>
      <div className='login-box'>
        <div className='left'>
          <p className='info' style={{marginTop: '50px'}}>Welcome</p>
          <p className='info'>To</p>
          <p className='info'>OutZone</p>
        </div>
        <div className='right'>
          <h1 className='title'>Login</h1>
          <Form name="登录" onFinish={login} autoComplete="off">
            <Form.Item
              label="账号"
              name="username"
              requiredMark={'optional'}
              rules={[
                {
                  required: true,
                  type: 'string',
                  min: 4,
                  max: 16,
                  message: '账号应在4-16位间',
                },
              ]}
            >
              <Input maxLength={16} /> 
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              requiredMark={'optional'}
              rules={[
                {
                  required: true,
                  type: 'string',
                  min: 6,
                  max: 20,
                  message: '密码应在6-20位间',
                },
              ]}
            >
              <Input.Password maxLength={20} /> 
            </Form.Item>
            <Form.Item className='flex-center'>
              <Button className='button' type="primary" htmlType="submit" shape='round'>登录</Button>
            </Form.Item>
          </Form>
          <Link className='link register-link' to='/register'>注册</Link>
          <Link className='link forget-link' to='/login'>忘记密码</Link>
        </div>
      </div>
    </div>
  )
}

export default Login