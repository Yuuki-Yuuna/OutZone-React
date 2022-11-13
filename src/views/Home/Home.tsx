import React from 'react'
import './Home.scss'
import Navigation from '@/compnents/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import { Menu } from 'antd'
import { FolderOutlined, FileOutlined, FolderOpenOutlined, FileImageOutlined, CustomerServiceOutlined, PlayCircleOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const Home: React.FC = () => {
  // const test = (a: any, b: any, c: any) => {
  //   console.log(a, b, c)
  // }
  const select = (a: any, b: any) => {
    console.log(a, b)
  }

  const items: MenuProps['items'] = [
    {
      key: 'file',
      label: '我的文件',
      icon: <FolderOutlined />,
      className: 'menu-item',
      children: [
        {
          key: 'all',
          label: '全部',
          icon: <FolderOpenOutlined />
        },
        {
          key: 'document',
          label: '文档',
          icon: <FileOutlined />
        },
        {
          key: 'image',
          label: '图片',
          icon: <FileImageOutlined />
        },
        {
          key: 'audio',
          label: '音频',
          icon: <CustomerServiceOutlined />
        },
        {
          key: 'video',
          label: '视频',
          icon: <PlayCircleOutlined />
        },
        {
          key: 'other',
          label: '其它',
          icon: <EllipsisOutlined />
        }
      ]
    },
    {
      key: 'recycle',
      label: '回收站',
      icon: <DeleteOutlined />,
      className: 'menu-item'
    }
  ]

  return (
    <div className='home'>
      <Navigation />
      <div className='layout'>
        <div className='slider'>
          <Menu
            mode='inline'
            defaultOpenKeys={['file']}
            items={items}
            // onClick={test}
            // onSelect={select}
          />
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home