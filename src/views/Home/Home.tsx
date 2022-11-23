import React, { Suspense } from 'react'
import './Home.scss'
import Navigation from '@/compnents/Navigation/Navigation'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, Progress } from 'antd'
import { FolderOutlined, FileOutlined, FolderOpenOutlined, FileImageOutlined, CustomerServiceOutlined, PlayCircleOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const Home: React.FC = () => {
  const navigate = useNavigate()
  
  const changeDisplay: MenuProps['onClick'] = (event) => {
    if (event.key == 'image') {
      navigate('/home/timeline')
    } else {
      navigate(`/home/directory/${event.key}`)
    }
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
            onClick={changeDisplay}
          />
          <div className='progress'>
            <Progress percent={18} showInfo={false} strokeColor='#06a7ff' />
            <div className='info'>379.2G/2055G</div>
          </div>
        </div>
        <div className='content'>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Home