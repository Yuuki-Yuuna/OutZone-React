import React, { useEffect, useRef, useState } from 'react'
import './Navigation.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Image, Avatar, Space, Dropdown, Drawer, Progress, Menu, Badge, message } from 'antd'
import { SwapOutlined, UserOutlined, BellOutlined, FolderOutlined, ArrowUpOutlined, PauseOutlined, CloseOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { checkFileType, computedFileSize } from '@/util/file'
import { useStoreDispatch, useStoreSelector } from '@/store'
import { getUserInformation } from '@/store/features/userSlice'
import { userLogout } from '@/api/user'
import { removeToken } from '@/util/secret'

const Navigation: React.FC<PropsType> = (props) => {
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLSpanElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { uploadList, setUploadList } = props
  const [search, setSearch] = useSearchParams()
  const dispatch = useStoreDispatch()
  const userInfo = useStoreSelector(state => state.user.userInfo)
  const userStatus = useStoreSelector(state => state.user.status)

  const openDrawer = () => {
    setDrawerOpen(true)
  }
  const closeDrawer = () => {
    setDrawerOpen(false)
  }
  const handleOpenChange = (open: boolean) => {
    // console.log('change', open)
    setDropdownOpen(open)
  }
  const uploadFilePause = (file: any) => {
    return () => {
      file.pause()
      setUploadList((preUploadList: any) => [...preUploadList])
    }
  }
  const uploadFileResume = (file: any) => {
    return () => {
      file.resume()
      setUploadList((preUploadList: any) => [...preUploadList])
    }
  }
  const uploadFileCancel = (file: any) => {
    return () => {
      file.cancel()
      setUploadList((preUploadList: any) => preUploadList.filter((item: any) => file.uniqueIdentifier != item.uniqueIdentifier))//要渲染
    }
  }
  const uploadFileToPath = (file: any) => {
    return () => {
      const filePath = file.relativePath == '/' ? '/' : file.relativePath.slice(0, file.relativePath.length - 1)
      search.set('path', filePath)
      setSearch(search)
    }
  }
  const logout = () => {
    userLogout().then(res => {
      const result = res.data
      if (result.code == 200) {
        removeToken()
        message.success('退出登录~')
        navigate('/login', { replace: true })
      } else {
        message.error(result.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    dispatch(getUserInformation())
  }, [])

  useEffect(() => {
    if (userStatus == 'overdue') {
      message.error('登录过期,请重新登录')
      navigate('/login', { replace: true })
    }
  }, [userStatus])

  useEffect(() => {
    if (uploadList.length) {
      setDropdownOpen(true)
    }
  }, [uploadList.length])

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
              <div className='file' key={file.timestamp}>
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
                      {file.isReady ? <div className='speed'>{file.progress() == 1 ? '' : computedFileSize(file.currentSpeed) + '/s'}</div> : <div className='waiting'>等待中</div>}
                    </div>
                  </div>
                </div>
                <div className='buttons'>
                  {file.isComplete() ? <div className='button' onClick={uploadFileToPath(file)}><FolderOutlined className='icon' /></div> : (
                    <Space>
                      {file.isUploading() ? <div className='button' onClick={uploadFilePause(file)}><PauseOutlined className='icon' /></div> : <div className='button' onClick={uploadFileResume(file)} style={{ display: file.isReady ? 'flex' : 'none' }}><ArrowUpOutlined className='icon' /></div>}
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
      key: 'logout',
      label: <div onClick={logout}>退出登录</div>
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
        <Avatar icon={<UserOutlined />} src={userInfo?.icon} size={42} />
        <Dropdown menu={{ items: dropdownItems }} placement='bottom' arrow>
          <h2>{userInfo?.username}</h2>
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
                open={dropdownOpen}
                onOpenChange={handleOpenChange}
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
  uploadList: any
  setUploadList: React.Dispatch<React.SetStateAction<any>>
}

export default Navigation