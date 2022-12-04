import React, { useEffect, useMemo, useState } from 'react'
import './PictureWall.scss'
import FileTransform from '@/compnents/FileTransform/FileTransform'
import { Spin, Tabs, Image, Checkbox, Dropdown, message } from 'antd'
import { ShareAltOutlined, UsergroupAddOutlined, DownloadOutlined, DeleteOutlined, DragOutlined, CopyOutlined, EllipsisOutlined } from '@ant-design/icons'
import type { TabsProps, MenuProps } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { LoadingOutlined } from '@ant-design/icons'
import { useStoreDispatch, useStoreSelector } from '@/store'
import { getFileList } from '@/store/features/fileSlice'
import type { FileInformation, TransformType } from '@/type/File'
import { deleteFiles, downloadFile } from '@/api/file'

const PictureWall: React.FC = () => {
  const dispatch = useStoreDispatch()
  const fileList = useStoreSelector(state => state.file.fileList)
  const loadingStatus = useStoreSelector(state => state.file.status)
  const [isLoading, setIsloading] = useState(false)
  const groupId = -1
  const pictureList = useMemo(() => {
    const map = new Map<number, FileInformation[]>()
    fileList.forEach(item => {
      const timestamp = item.uploadDate ? Date.parse(item.uploadDate) : 0
      // console.log(timestamp)
      const arr = (map.get(timestamp) ? map.get(timestamp) : []) as FileInformation[]
      map.set(timestamp, [...arr, item])
    })
    const keys: number[] = []
    //迭代器没学过，秀
    for (const key of map.keys()) {
      keys.push((Number)(key))
    }
    keys.sort((a, b) => b - a)
    const list: FileInformation[][] = []
    keys.forEach(key => list.push(map.get(key) as FileInformation[]))
    // console.log(list)
    return list
  }, [fileList])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])//时间轴页面选中项id
  const [selectedData, setSelectedData] = useState<FileInformation[]>([])//时间轴页面选中项
  const [dropDownSelectedData, setDropDownSelectedData] = useState<FileInformation | null>(null)//下拉框选中
  const [transformOpen, setTransformOpen] = useState(false)//移动复制对话框
  const [transformType, setTransformType] = useState<TransformType>(null)
  const [transformFiles, setTransformFiles] = useState<FileInformation[]>([])

  const pictureShare = () => {
    console.log('分享')
  }
  const fileDownload = (files: FileInformation[]) => {
    if (files.length == 1) {
      const file = files[0]
      downloadFile({
        groupId,
        parentId: file.parentId,
        id: file.id,
        filename: file.name
      }).then(res => {
        // console.log(res.data)
        const result = res.data
        if (result.code == 200) {
          const a = document.createElement('a')
          a.href = res.data.data
          a.click()
          message.success('已添加下载~')
        } else {
          message.error(result.msg)
        }
        setDropDownSelectedData(null)
      }).catch(err => {
        console.log(err)
        setDropDownSelectedData(null)
      })
    }
  }
  const fileDelete = (files: FileInformation[]) => {
    setIsloading(true)
    deleteFiles({ destination: '/', groupId, files }).then(res => {
      // console.log(res.data)
      if (res.data.code == 200) {
        message.success('删除成功')
        dispatch(getFileList({ groupId, absolutePath: '/', fileType: 'picture' }))
      } else {
        message.error(res.data.msg)
      }
      setSelectedKeys([])
      setSelectedData([])
      setIsloading(false)
      setDropDownSelectedData(null)
    }).catch(err => {
      console.log(err)
      setIsloading(false)
      setDropDownSelectedData(null)
    })
  }
  //移动复制图片
  const fileTransform = (files: FileInformation[], type: TransformType) => {
    setTransformType(type)
    setTransformFiles(files)
    setTransformOpen(true)
  }

  //选中项变化函数
  const onSelectedChange = (pictures: FileInformation[]) => {
    return (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        setSelectedKeys(selectedKeys.concat(pictures.map(item => item.id).filter(item => !selectedKeys.includes(item))))
        setSelectedData(selectedData.concat(pictures.filter(item => !selectedData.includes(item))))
      } else {
        setSelectedKeys(selectedKeys.filter(key => !pictures.map(item => item.id).includes(key)))
        setSelectedData(selectedData.filter(item => !pictures.includes(item)))
      }
    }
  }

  const onDropdownOpenChange = (file: FileInformation) => {
    return (open: boolean) => {
      if (open) {
        setDropDownSelectedData(file)
      } else {
        setDropDownSelectedData(null)
      }
    }
  }

  useEffect(() => {
    dispatch(getFileList({ groupId, absolutePath: '/', fileType: 'picture' }))
  }, [])

  useEffect(() => {
    setSelectedData([])
    setSelectedKeys([])
  }, [pictureList])

  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
    return selectedKeys.length == 0 ? <DefaultTabBar {...props} style={{ height: 50 }} /> : (
      <div className='picture-manage'>
        <div className='buttons'>
          <div className='button'>
            <button><ShareAltOutlined className='icon' />分享</button>
          </div>
          <div className='button'>
            <button><UsergroupAddOutlined className='icon' />共享</button>
          </div>
          <div className='button'>
            <button onClick={() => fileDownload(selectedData)}><DownloadOutlined className='icon' />下载</button>
          </div>
          <div className='button'>
            <button onClick={() => fileDelete(selectedData)}><DeleteOutlined className='icon' />删除</button>
          </div>
          <div className='button'>
            <button onClick={() => fileTransform(selectedData, 'move')}><DragOutlined className='icon' />移动</button>
          </div>
          <div className='button'>
            <button onClick={() => fileTransform(selectedData, 'copy')}><CopyOutlined className='icon' />复制</button>
          </div>
        </div>
      </div>
    )
  }

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'share',
      label: (
        <div>
          <ShareAltOutlined />
          <span>分享</span>
        </div>
      )
    },
    {
      key: 'download',
      label: (
        <div onClick={() => fileDownload([dropDownSelectedData!])}>
          <DownloadOutlined />
          <span>下载</span>
        </div>
      )
    },
    {
      key: 'delete',
      label: (
        <div onClick={() => fileDelete([dropDownSelectedData!])}>
          <DeleteOutlined />
          <span>删除</span>
        </div>
      )
    },
    {
      key: 'copy',
      label: (
        <div onClick={() => fileTransform([dropDownSelectedData!], 'copy')}>
          <CopyOutlined />
          <span>复制</span>
        </div>
      )
    },
    {
      key: 'move',
      label: (
        <div onClick={() => fileTransform([dropDownSelectedData!], 'move')}>
          <DragOutlined />
          <span>移动</span>
        </div>
      )
    }
  ]

  return (
    <div className='picture-wall'>
      <Spin spinning={loadingStatus == 'loading' || isLoading} indicator={<LoadingOutlined />} size='large'>
        <Tabs
          defaultActiveKey='1'
          renderTabBar={renderTabBar}
          items={[
            {
              label: '时光轴',
              key: '1',
              children: (
                <div className='timeline'>
                  {pictureList.map(pictures => {
                    const picturesIschecked = pictures.filter(item => selectedKeys.includes(item.id)).length == pictures.length

                    return (
                      <div className='picture-row' key={pictures.reduce<string>((pre, item) => pre + item.id, '')}>
                        <div className='row-title'>
                          <Checkbox checked={picturesIschecked} onChange={onSelectedChange(pictures)} />
                          <h4>{pictures[0].uploadDate}</h4>
                        </div>
                        <div className='pictures'>
                          {pictures.map(picture => {
                            const pictureIsChekced = selectedKeys.includes(picture.id)

                            return (
                              <div className='picture' key={picture.id}>
                                <Checkbox className='check-box' checked={pictureIsChekced} onChange={onSelectedChange([picture])} style={{ display: pictureIsChekced ? 'flex' : '' }} />
                                <Dropdown menu={{ items: dropdownItems }} placement='bottom' onOpenChange={onDropdownOpenChange(picture)}>
                                  <EllipsisOutlined className='more' />
                                </Dropdown>
                                <Image src={picture.icon} width={128} height={128} style={{ objectFit: 'cover' }} />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            },
            {
              label: '最近上传',
              key: '2',
              children: (
                <div className='picture-display'>
                  Content of Tab Pane 2
                </div>
              )
            }
          ]}
        />
      </Spin>
      <FileTransform {...{ transformOpen, setTransformOpen, transformType, setTransformType, transformFiles }} />
    </div>
  )
}

export default PictureWall