import React, { useEffect, useMemo, useState } from 'react'
import './FileTransform.scss'
import { Image, List, message, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import type { FileInformation, TransformType } from '@/type/File'
import { useStoreDispatch } from '@/store'
import { getFileList } from '@/store/features/fileSlice'
import { copyFiles, getNowFileList, moveFiles } from '@/api/file'
import { useParams, useSearchParams } from 'react-router-dom'

const FileTransform: React.FC<PropsType> = (props) => {
  const [search] = useSearchParams()
  const { category } = useParams()
  const path = (search.get('path') ? search.get('path') : '/') as string
  const { transformOpen, setTransformOpen, transformType, setTransformType, transformFiles } = props
  const [transformLoading, setTransformLoading] = useState(false)
  const dispatch = useStoreDispatch()
  const [folderList, setFolderList] = useState<FileInformation[]>([])
  const groupId = -1
  const [transformPath, setTransformPath] = useState('/')//移动复制专用路径
  const uploadPath = useMemo(() => transformPath == '/' ? transformPath : transformPath + '/', [transformPath])

  const pathBack = () => {
    let pathUnits = transformPath.split('/')
    pathUnits = pathUnits.slice(1, pathUnits.length - 1)
    let newPath = ''
    pathUnits.forEach((item) => {
      newPath += '/' + item
    })
    setTransformPath(newPath)
  }
  const pathTo = (newPath: string) => {
    return () => {
      setTransformPath(newPath)
    }
  }
  const onTransformOk = async () => {
    try {
      setTransformLoading(true)
      const params = { destination: uploadPath, groupId, files: transformFiles }
      const res = transformType == 'copy' ? await copyFiles(params) : await moveFiles(params)
      const result = res.data
      if (result.code == 200) {
        message.success(transformType == 'copy' ? '复制成功' : '移动成功')
      } else {
        message.error(result.msg)
      }
    } catch (err) {
      console.log(err)
    }
    setTransformPath('/')
    setTransformType(null)
    setTransformLoading(false)
    setTransformOpen(false)
    dispatch(getFileList({ absolutePath: path == '/' ? path : path + '/', groupId, fileType: category }))
  }
  const onTransformCancel = () => {
    if (!transformLoading) {
      setTransformOpen(false)
      setTransformType(null)
      setTransformPath('/')
    }
  }
  const folderEnter = (folder: FileInformation) => {
    return () => {
      setTransformPath(folder.path.slice(0, folder.path.length - 1))
    }
  }

  useEffect(() => {
    setTransformLoading(true)
    getNowFileList({ groupId, absolutePath: uploadPath }).then(res => {
      const result = res.data
      console.log(result)
      if (result.code == 200) {
        setFolderList(result.data.filter(item => item.directoryType))
      } else {
        message.error(result.msg)
      }
      setTransformLoading(false)
    }).catch(err => {
      console.log(err)
      setTransformLoading(false)
    })
  }, [transformPath, transformOpen])

  const itemRender = (item: FileInformation) => {
    return (
      <div className='list-item' onClick={folderEnter(item)}>
        <div className='file-infomation'>
          <Image src={item.icon} preview={false} width={32} />
          <span className='text'>{item.name.slice(1, item.name.length - 1)}</span>
        </div>
      </div>
    )
  }

  return (
    <Modal
      wrapClassName='file-transform'
      open={transformOpen}
      onCancel={onTransformCancel}
      onOk={onTransformOk}
      centered
      title={<h4 className='title'>{transformType == 'copy' ? '复制到' : '移动到'}</h4>}
      width={720}
      okButtonProps={{ type: 'primary', shape: 'round', className: 'ok-button' }}
      cancelButtonProps={{ shape: 'round', className: 'cancel-button' }}
      okText={transformType == 'copy' ? '复制至此' : '移动至此'}
      cancelText='取消'
    >
      {transformPath == '/' ? <div className='path'><h5>全部文件</h5></div> : (
        <div className='path'>
          <div className='back' onClick={pathBack}>返回上一级</div>
          <div className='path-unit'>
            <span className='sign'>|</span>
            <span className='text' onClick={pathTo('/')}>全部文件</span>
          </div>
          {transformPath.split('/').filter(item => item).map((item, index, arr) => {
            // console.log(item, index)
            if (arr.length > 3 && index < arr.length - 3) {
              return index ? '' : (
                <div className='path-unit' key='...'>
                  <span className='sign' style={{ fontSize: '18px' }}>&gt;</span>
                  <span className='text' style={{ color: '#818999', fontSize: '16px' }}>...</span>
                </div>
              )
            }
            let itemPath = ''
            for (let i = 0; i <= index; i++) {
              itemPath += '/' + arr[i]
            }
            // console.log(itemPath)
            return (
              <div className='path-unit' key={itemPath}>
                <span className='sign' style={{ fontSize: '18px' }}>&gt;</span>
                <span className='text' style={{ color: index == arr.length - 1 ? '#818999' : '#06a7ff' }} onClick={pathTo(itemPath)}>{item}</span>
              </div>
            )
          })}
        </div>
      )}
      <List
        dataSource={folderList}
        renderItem={itemRender}
        loading={{ indicator: <LoadingOutlined />, spinning: transformLoading, size: 'large' }}
      />
    </Modal>
  )
}

interface PropsType {
  transformOpen: boolean
  setTransformOpen: React.Dispatch<React.SetStateAction<boolean>>
  transformType: TransformType
  setTransformType: React.Dispatch<React.SetStateAction<TransformType>>
  transformFiles: FileInformation[]
}

export default FileTransform