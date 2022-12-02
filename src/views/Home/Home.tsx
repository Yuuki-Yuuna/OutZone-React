import React, { Suspense, useState } from 'react'
import './Home.scss'
import Navigation from '@/compnents/Navigation/Navigation'
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Menu, Progress, message } from 'antd'
import { FolderOutlined, FileOutlined, FolderOpenOutlined, FileImageOutlined, CustomerServiceOutlined, PlayCircleOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Uploader from 'simple-uploader.js'//这个没有ts包，采用AnyScript编写
import { baseURL } from '@/util/request'
import { getToken } from '@/util/secret'
import { checkFileCategory, computedMd5, getThumbnail, getVideoThumbnail } from '@/util/file'
import { uploadFileMerge, UploadFileMergeParams, uploadPreCheck } from '@/api/file'
import { useStoreDispatch } from '@/store'
import { getFileList } from '@/store/features/fileSlice'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const { category } = useParams()
  const path = (search.get('path') ? search.get('path') : '/') as string
  const uploadPath = path == '/' || category != 'all' ? '/' : path + '/'
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
  let [uploadList, setUploadList] = useState<any>([])//用于渲染的上传列表
  const dispatch = useStoreDispatch()

  // 添加单个文件
  uploader.on('fileAdded', (uploadFile: any) => {
    // console.log(uploadFile)
    // console.log('开始计算md5')
    uploadFile.isReady = false
    uploadFile.timestamp = uploadFile.name + Date.now()
    setUploadList((preUploadList: any) => [...preUploadList, uploadFile])//此时文件未添加
    //异步后执行，此时文件已添加
    computedMd5(uploadFile.file).then(res => {
      uploadFile.uniqueIdentifier = res
      uploadFile.relativePath = uploadPath
      // console.log(uploader)
      uploadPreCheck({
        totalSize: uploadFile.size,
        identifier: uploadFile.uniqueIdentifier,
        filename: uploadFile.name,
        totalChunks: uploadFile.chunks.length,
        uploadCloudPath: uploadFile.relativePath,
        groupId: groupId
      }).then(res => {
        const result = res.data
        if (result.data.isSkip) {
          // console.log(uploadFile)
          uploadFile.cancel()
          uploadFile.isReady = true
          setUploadList((preUploadList: any) => preUploadList.map((item: any) => {
            if (item.uniqueIdentifier == uploadFile.uniqueIdentifier) {
              item._prevProgress = 1//展示的上传进度
              item.completed = true//展示的完成状态
              //上传大小仍然是0，不过不显示就无所谓了
            }
            return item
          }))
          dispatch(getFileList({ groupId, absolutePath: uploadPath }))//刷新列表
        } else {
          console.log('开始上传')
          // 选择文件会导致Home重新加载uploadList值改变，但preUploadList的值不会改变(太魔幻了)
          setUploadList((preUploadList: any) => {
            // console.log(preUploadList)
            const filterList = preUploadList.filter((item: any) => {
              return item.uniqueIdentifier == uploadFile.uniqueIdentifier && item.relativePath == uploadFile.relativePath
            })
            if (filterList.length > 1) {
              message.warn('同一路径不能上传相同文件')
              // console.log('重复文件')
              return preUploadList.filter((item: any) => item.timestamp != uploadFile.timestamp)
            } else {
              // console.log('上传队列', uploadList)//Home重新渲染这里的值已经丢失了
              // console.log('开始上传', uploadFile)
              uploadFile.isReady = true
              uploader.upload()
              // uploadFile.resume()
              return preUploadList
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  })
  //单文件上传成功
  uploader.on('fileSuccess', async (rootFile: any, file: any) => {
    // console.log('成功', rootFile, file)
    const params: UploadFileMergeParams = {
      totalSize: file.size,
      identifier: file.uniqueIdentifier,
      filename: file.name,
      totalChunks: file.chunks.length,
      uploadCloudPath: file.relativePath,
      groupId: groupId,
    }

    try {
      if (checkFileCategory(file.getType()) == 'image') {
        params.icon = await getThumbnail(file.file)
      } else if (checkFileCategory(file.getType()) == 'video') {
        params.icon = await getVideoThumbnail(file.file)
      }
      const res = await uploadFileMerge(params)
      if (res.data.code == 200) {
        console.log('文件上传成功')
        dispatch(getFileList({ groupId, absolutePath: uploadPath, fileType: category }))//刷新列表
      } else {
        message.error(res.data.msg)
        // console.log(res.data.msg)
      }
    } catch (err) {
      console.log(err)
    }
  })

  uploader.on('fileProgress', () => {
    // console.log(uploader.files)//这个有问题一个文件上传中再添加文件不会显示所有文件
    setUploadList((preUploadList: any) => [...preUploadList])//这里可以反复刷新dom
  })

  const changeDisplay: MenuProps['onClick'] = (event) => {
    if (event.key == 'image') {
      navigate('/home/timeline')
    } else {
      navigate(`/home/directory/${event.key}`)
      dispatch(getFileList({ groupId, absolutePath: uploadPath, fileType: event.key }))
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
      <Navigation uploadList={uploadList} setUploadList={setUploadList} />
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