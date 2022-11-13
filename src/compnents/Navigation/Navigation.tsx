import React from 'react'
import './Navigation.scss'
import { useNavigate } from 'react-router-dom'
import { Image, Avatar, Space, Dropdown } from 'antd'
import { SwapOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const Navigation: React.FC = () => {
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <h2>admin</h2>
    },
    {
      key: '2',
      label: <div>个人主页</div>
    },
    {
      key: '3',
      label: <div>帮助中心</div>
    },
    {
      key: '4',
      label: <div>退出登录</div>
    }
  ]

  return (
    <div className='navigation'>
      <div className='logo' onClick={() => navigate('/home')}>
        <Image src='/src/assets/logo.svg' width={60} preview={false}></Image>
        <h1>LOGO</h1>
      </div>
      <div className='flex-grow'></div>
      <div className='profile'>
        <Avatar icon={<UserOutlined />} src={'/src/assets/avatar.jpg'} size={42} />
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <h2>{'admin'}</h2>
        </Dropdown>
      </div>
      <div className='tools'>
        <Space>
          <SwapOutlined className='icon' rotate={-90} />
          <BellOutlined className='icon' />
        </Space>
      </div>
    </div>
  )
}

export default Navigation