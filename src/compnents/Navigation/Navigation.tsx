import React, { useEffect, useRef, useState } from 'react'
import './Navigation.scss'
import { useNavigate } from 'react-router-dom'
import { Image, Avatar, Space, Dropdown, Drawer, Progress, Menu, Badge } from 'antd'
import { SwapOutlined, UserOutlined, BellOutlined, FolderOutlined, ArrowUpOutlined, PauseOutlined, CloseOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { checkFileType, computedFileSize } from '@/util/file'

const Navigation: React.FC<PropsType> = (props) => {
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLSpanElement>(null)
  let [drawerOpen, setDrawerOpen] = useState(false)
  const { uploader, uploadList, setUploadList, isUploading } = props

  const test = () => {
    console.log(uploadList)
  }

  const openDrawer = () => {
    setDrawerOpen(true)
  }
  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const uploadFileCancel = (file: any) => {
    return () => {
      file.cancel()
      setUploadList([...uploader.files])//要渲染
    }
  }

  useEffect(() => {
    if (isUploading) {
      dropdownRef.current?.click()
    }
  }, [isUploading])

  const uploadDropdownRender = () => {
    return (
      <div className='upload'>
        <div className='title'>
          <p>传输列表</p>
          <h2>上传完成（{uploadList.filter((file: any) => file.progress() == 1).length}/{uploadList.length}）</h2>
        </div>
        <div className='content'>
          {uploadList.map((file: any) => {
            // console.log(file)
            const src = new URL(`../../assets/icon/${checkFileType(file.name)}.png`, import.meta.url).href

            return (
              <div className='file' key={file.uniqueIdentifier}>
                <div className='file-info'>
                  <Image src={src} preview={false} width={40} />
                  <div className='data'>
                    <h4>{file.name}</h4>
                    <Progress
                      showInfo={false}
                      percent={file.progress() * 100}
                      strokeWidth={3}
                      strokeColor='#009dff'
                      status={file.currentSpeed > 0 ? 'active' : 'normal'}
                      style={{ display: file.progress() == 1 ? 'none' : 'block' }}
                    />
                    <div className='status'>
                      <div className='size'>{computedFileSize(file.size)}</div>
                      <div className='speed'>{file.progress() == 1 ? '' : computedFileSize(file.currentSpeed) + '/s'}</div>
                    </div>
                  </div>
                </div>
                <div className='buttons'>
                  {file.isComplete() ? <div className='button'><FolderOutlined className='icon' /></div> : (
                    <Space>
                      {file.isUploading() ? <div className='button' onClick={() => file.pause()}><PauseOutlined className='icon' /></div> : <div className='button' onClick={() => file.resume()}><ArrowUpOutlined className='icon' /></div>}
                      <div className='button'><CloseOutlined className='icon' onClick={uploadFileCancel(file)} /></div>
                    </Space>
                  )}
                </div>
              </div>
            )
          })}
          <p className='tips'>- 仅展示本次上传任务 -</p>
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
        <Avatar icon={<UserOutlined />} src={'/src/assets/avatar.jpg'} size={42} onClick={test} />
        <Dropdown menu={{ items: dropdownItems }} placement='bottom' arrow>
          <h2>{'admin'}</h2>
        </Dropdown>
        <div className='tools'>
          <Space>
            <Badge count={uploadList.filter((file: any) => file.progress() < 1).length} size='small'>
              <Dropdown
                dropdownRender={uploadDropdownRender}
                placement='bottomRight'
                trigger={['click']}
                overlayClassName='upload-dropdown'
                align={{ offset: [80, 30] }}
              >
                {/* align属性antd文档未标出，可以修改下拉框位置 */}
                <SwapOutlined ref={dropdownRef} className='icon' rotate={-90} title='传输列表' />
              </Dropdown>
            </Badge>
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

interface PropsType {
  uploader: any
  uploadList: any
  setUploadList: Function
  isUploading: boolean
}

export default Navigation