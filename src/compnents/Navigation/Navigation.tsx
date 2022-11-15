import React, { useState } from 'react'
import './Navigation.scss'
import { useNavigate } from 'react-router-dom'
import { Image, Avatar, Space, Dropdown, Drawer, Progress, Menu } from 'antd'
import { SwapOutlined, UserOutlined, BellOutlined, FolderOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  let [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = () => {
    setDrawerOpen(true)
  }
  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const dropdownItems: MenuProps['items'] = [
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
  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: '我的文件',
      icon: <FolderOutlined className='icon' />,
      className: 'menu-items'
    },
    {
      key: '2',
      label: '通知管理',
      icon: <BellOutlined className='icon' />,
      className: 'menu-items'
    },
    {
      key: '3',
      label: '退出登录',
      icon: <SwapOutlined className='icon' />,
      className: 'menu-items'
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
        <Dropdown menu={{ items: dropdownItems }} placement="bottom" arrow>
          <h2>{'admin'}</h2>
        </Dropdown>
        <div className='tools'>
          <Space>
            <SwapOutlined className='icon' rotate={-90} />
            <BellOutlined className='icon' />
          </Space>
        </div>
      </div>
      <div className='profile-mobile'>
        <Avatar icon={<UserOutlined />} src={'/src/assets/avatar.jpg'} size={42} onClick={openDrawer} />
      </div>
      <Drawer open={drawerOpen} closable={false} onClose={closeDrawer} width={'80%'} bodyStyle={{ padding: 0 }}>
        <div className='drawer'>
          <div className='drawer-profile'>
            <Avatar icon={<UserOutlined />} src={'/src/assets/avatar.jpg'} size={50} onClick={openDrawer} />
            <div className='drawer-info'>
              <h2>{'admin'}</h2>
              <Progress percent={30} showInfo={false} />
              <div>
                <span style={{ marginRight: '30px' }}>{'20.00G'}/{'2T'}</span>
                <span>{'30.00%'}</span>
              </div>
            </div>
          </div>
          <Menu
            items={menuItems}
          />
        </div>
      </Drawer>
    </div>
  )
}

export default Navigation