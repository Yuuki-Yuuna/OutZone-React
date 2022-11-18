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

  const uploadDropdownRender = () => {
    return (
      <div className='upload'>
        <div className='title'>
          <p>传输列表</p>
          <h2>上传完成（0/0）</h2>
        </div>
        <div className='content'>
          <p className='empty'>- 仅展示本次上传任务 -</p>
        </div>
      </div>
    )
  }
  const dropdownItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人主页'
    },
    {
      key: 'help',
      label: '帮助中心'
    },
    {
      key: 'logout',
      label: '退出登录'
    }
  ]
  const menuItems: MenuProps['items'] = [
    {
      key: 'file',
      label: '我的文件',
      icon: <FolderOutlined className='icon' />,
      className: 'menu-item'
    },
    {
      key: 'notification',
      label: '通知管理',
      icon: <BellOutlined className='icon' />,
      className: 'menu-item'
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <SwapOutlined className='icon' />,
      className: 'menu-item'
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
        <Dropdown menu={{ items: dropdownItems }} placement='bottom' arrow>
          <h2>{'admin'}</h2>
        </Dropdown>
        <div className='tools'>
          <Space>
            <Dropdown
              dropdownRender={uploadDropdownRender}
              placement='bottomRight'
              trigger={['click']}
              overlayClassName='upload-dropdown'
              align={{ offset: [80, 30] }}
            >
              {/* align属性antd文档未标出，可以修改下拉框位置 */}
              <SwapOutlined className='icon' rotate={-90} title='传输列表' />
            </Dropdown>
            <BellOutlined className='icon' title='通知管理' />
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
              <Progress percent={30} showInfo={false} strokeColor='#06a7ff' />
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