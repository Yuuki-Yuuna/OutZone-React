import React, { Suspense, useRef, useState } from 'react'
import './Home.scss'
import Navigation from '@/compnents/Navigation/Navigation'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { Menu, Progress } from 'antd'
import { FolderOutlined, FileOutlined, FolderOpenOutlined, FileImageOutlined, CustomerServiceOutlined, PlayCircleOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Uploader from 'simple-uploader.js'//这个没有ts包，采用AnyScript编写
import { baseURL } from '@/util/request'
import { getToken } from '@/util/secret'
import { computedMd5 } from '@/util/file'
import { uploadFileMerge, uploadPreCheck } from '@/api/file'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const path = (search.get('path') ? search.get('path') : '/') as string
  const groupId = -1
  const uploader = new Uploader({
    target: baseURL + '/file/upload',
    forceChunkSize: true,
    headers: { token: getToken() },
    //修改传输参数
    processParams: (params: any, file: any) => {
      params.uploadCloudPath = file.relativePath
      params.groupId = groupId
      // console.log(params)
      return params
    }
  })
  let [uploadList, setUploadList] = useState<any>(uploader.files)
  let [isUploading, setIsUploading] = useState(false)

  // 添加单个文件
  uploader.on('fileAdded', (uploadFile: any) => {
    // console.log(uploadFile)
    // console.log('开始计算md5')
    computedMd5(uploadFile.file).then(res => {
      uploadFile.uniqueIdentifier = res
      uploadFile.relativePath = path
      console.log(uploader)
      uploadPreCheck({
        totalSize: uploadFile.size,
        identifier: uploadFile.uniqueIdentifier,
        filename: uploadFile.name,
        totalChunks: uploadFile.chunks.length,
        uploadCloudPath: uploadFile.relativePath,
        groupId: groupId
      }).then(res => {
        const result = res.data
        if(!result.data.isSkip) {
         
        }
        uploader.upload()
        setIsUploading(uploader.isUploading())
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  })
  //单文件上传成功
  uploader.on('fileSuccess', (rootFile: any, file: any) => {
    // console.log('成功', rootFile, file)
    uploadFileMerge({
      totalSize: file.size,
      identifier: file.uniqueIdentifier,
      filename: file.name,
      totalChunks: file.chunks.length,
      uploadCloudPath: file.relativePath,
      groupId: groupId
    }).then(res => {
      if (res.data.code == 200) {
        console.log('文件上传成功')
      } else {
        console.log(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  })

  uploader.on('fileProgress', () => {
    // console.log(uploadList)
    setIsUploading(uploader.isUploading())
    setUploadList([...uploader.files])//解构生成新数组使其地址改变
  })

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
      <Navigation uploader={uploader} uploadList={uploadList} isUploading={isUploading} />
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
            <Outlet context={{ uploader, groupId }} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Home