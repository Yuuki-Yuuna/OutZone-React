import React, { useRef, useState, useEffect, useMemo } from 'react'
import './Directory.scss'
import FileManage from '@/compnents/FileManage/FileManage'
import { Table, Image, Dropdown, Input, message } from 'antd'
import { ShareAltOutlined, DownloadOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, CopyOutlined, DragOutlined, UsergroupAddOutlined, LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { FileInformation } from '@/type/File'
import { useStoreSelector, useStoreDispatch } from '@/store'
import { getFileList } from '@/store/features/fileSlice'
import { checkFileCategory, computedFileSize } from '@/util/file'
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { deleteFiles, downloadFile } from '@/api/file'

const Directory: React.FC = () => {
  let [fold, setFold] = useState(false)//折叠开关
  const rightMenu = useRef<HTMLDivElement>(null)//自定义右键菜单
  let operationType: OperationType = null
  let [selectedDataKeys, setSelectedDataKeys] = useState<React.Key[]>([])//表格选中项key值
  let [selectedData, setSelectedData] = useState<FileInformation | null>(null)//当前选中项
  const fileList = useStoreSelector(state => state.file.fileList)
  const loadingStatus = useStoreSelector(state => state.file.status)
  const dispatch = useStoreDispatch()
  const [search, setSearch] = useSearchParams()
  const path = (search.get('path') ? search.get('path') : '/') as string
  const { category } = useParams()
  const { groupId, uploader } = useOutletContext<ContextType>()
  const filterFileList = useMemo(() => {
    return fileList.filter(file => {
      if (category == 'all') {
        return true
      } else if (file.type) {
        return checkFileCategory(file.type) == category
      }
    })
  }, [category, fileList])

  const pathBack = () => {
    let pathUnits = path.split('/')
    pathUnits = pathUnits.slice(1, pathUnits.length - 1)
    let newPath = ''
    pathUnits.forEach((item) => {
      newPath += '/' + item
    })
    search.set('path', newPath)
    setSearch(search)
    setSelectedDataKeys([])
  }
  const pathTo = (newPath: string) => {
    return () => {
      search.set('path', newPath)
      setSearch(search)
      setSelectedDataKeys([])
    }
  }
  const changeOperation = (type: OperationType) => {
    // //柯里化传参，changeOperation渲染时会被调用多次,不要有多余操作
    return () => operationType = type//别用setState，这个数据不用渲染并且setState(虽然同步但有延迟,看了下原理)会导致修改不及时出bug
  }
  const fileEnter = (fileInfo: FileInformation) => {
    return (event: React.MouseEvent) => {
      event.stopPropagation()//阻止冒泡
      if (fileInfo.directoryType) {
        const newPath = fileInfo.path.slice(0, fileInfo.path.length - 1)
        search.set('path', newPath)
        setSearch(search)
        setSelectedDataKeys([])
      }
    }
  }
  const fileShare = () => {
    console.log('分享', selectedData)
  }
  const fileDownload = (file: FileInformation) => {
    console.log('下载', file)
    downloadFile({
      groupId,
      parentId: file.parentId,
      id: file.id,
      filename: file.name
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  const fileDelete = (file: FileInformation) => {
    console.log('删除', file)
    const destination = path == '/' ? path : path + '/'
    deleteFiles({ destination, groupId, files: [{ ...file, uploadDate: null }] }).then(res => {
      // console.log(res.data)
      if (res.data.code == 200) {
        message.success('删除成功')
        dispatch(getFileList({ groupId, absolutePath: path }))
      } else {
        message.error(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const fileRename = () => {
    console.log('重命名', selectedData)
  }
  const fileCopy = () => {
    console.log('复制', selectedData)
  }
  const fileMove = () => {
    console.log('移动', selectedData)
  }
  const fileGroup = () => {
    console.log('共享', selectedData)
  }
  const fileOpen = () => {
    // console.log('打开', selectedData)
    if (selectedData?.directoryType) {
      let path = selectedData.path
      path = selectedData.directoryType ? path.slice(0, path.length - 1) : path
      console.log(path)
      search.set('path', path)
      setSearch(search)
    }
  }
  const fileSearch = () => {

  }

  useEffect(() => {
    dispatch(getFileList({ groupId, absolutePath: path }))
  }, [path])

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'copy',
      label: (
        <div onClick={changeOperation('copy')}>
          <CopyOutlined />
          <span>复制</span>
        </div>
      )
    },
    {
      key: 'move',
      label: (
        <div onClick={changeOperation('move')}>
          <DragOutlined />
          <span>移动</span>
        </div>
      )
    },
    {
      key: 'share',
      label: (
        <div onClick={changeOperation('group')}>
          <UsergroupAddOutlined />
          <span>共享</span>
        </div>
      )
    }
  ]

  const rowOption = (record: FileInformation, index?: number) => {
    return {
      onClick: () => {
        // console.log(record, index)
        //利用事件冒泡，changeOperationType先触发
        switch (operationType) {
          case 'share': fileShare()
            break
          case 'download': fileDownload(record)
            break
          case 'delete': fileDelete(record)
            break
          case 'rename': fileRename()
            break
          case 'copy': fileCopy()
            break
          case 'move': fileMove()
            break
          case 'group': fileGroup()
            break
          default: setSelectedData(record), setSelectedDataKeys([record.id])
        }
        operationType = null//操作结束后取消操作
      },
      //鼠标右键事件
      onContextMenu: (event: React.MouseEvent) => {
        // console.log(event)
        // console.log(record, index)
        event.preventDefault()
        const element = rightMenu.current!
        element.style.display = 'block'
        element.style.top = event.clientY + 'px'
        element.style.left = event.clientX + 'px'
        window.onclick = () => {
          element.style.display = 'none'//关闭
        }
        setSelectedData(record)//这里延迟满足要求，而且也需要渲染页面，就将就一下吧
        setSelectedDataKeys([record.id])
      },
      //双击行
      onDoubleClick: () => {
        search.set('path', record.path.slice(0, record.path.length - 1))
        setSearch(search)
      },
    }
  }

  const rowSelection = {
    selectedRowKeys: selectedDataKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: FileInformation[]) => {
      setSelectedDataKeys(selectedRowKeys)
      if (selectedRows.length == 1) {
        setSelectedData(selectedRows[0])
      }
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
  }

  const columns: ColumnsType<FileInformation> = [
    {
      title: '文件名',
      dataIndex: 'name',
      render: (text, record) => {
        return (
          <div className='file-selection'>
            <Image src={record.icon} preview={false} width={32} />
            <span className='text' onClick={fileEnter(record)}>{record.directoryType ? text.slice(1, text.length - 1) : text}</span>
          </div>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'uploadDate',
      render: (text) => (
        <div className='date-selection'>
          <span className='info'>{text}</span>
          <div className='button-group'>
            <ShareAltOutlined className='button' title='分享' onClick={changeOperation('share')} />
            <DownloadOutlined className='button' title='下载' onClick={changeOperation('download')} />
            <DeleteOutlined className='button' title='删除' onClick={changeOperation('delete')} />
            <EditOutlined className='button' title='重命名' onClick={changeOperation('rename')} />
            <Dropdown menu={{ items: dropdownItems }} placement='bottom' overlayStyle={{ width: '80px' }}>
              <EllipsisOutlined className='button' />
            </Dropdown>
          </div>
        </div>
      )
    },
    {
      title: '大小',
      dataIndex: 'size',
      render: (text) => <span className='info'>{computedFileSize(text)}</span>
    }
  ]

  return (
    <div className='directory'>
      <div className='content'>
        <FileManage uploader={uploader} />
        <div className='title'>
          {path == '/' ? <h4>{'全部文件'}</h4> : (
            <div className='path'>
              <div className='back' onClick={pathBack}>返回上一级</div>
              <div className='path-unit'>
                <span className='sign'>|</span>
                <span className='text' onClick={pathTo('/')}>全部文件</span>
              </div>
              {path.split('/').filter(item => item).map((item, index, arr) => {
                // console.log(item, index)
                let itemPath = ''
                for (let i = 0; i <= index; i++) {
                  itemPath += '/' + item
                }
                return (
                  <div className='path-unit' key={itemPath} onClick={() => { pathTo(itemPath) }}>
                    <span className='sign' style={{ fontSize: '18px' }}>&gt;</span>
                    <span className='text' style={{ color: index == arr.length - 1 ? '#818999' : '#06a7ff' }}>{item}</span>
                  </div>
                )
              })}
            </div>
          )}
          <span style={{ display: fold ? 'flex' : 'none' }} onClick={() => setFold(false)}>
            <LeftOutlined className='icon' />展开
          </span>
        </div>
        <div className='table'>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            rowSelection={{ ...rowSelection }}
            dataSource={filterFileList}
            pagination={false}
            onRow={rowOption}
            scroll={{ y: 520 }}
            loading={{ indicator: <LoadingOutlined />, spinning: loadingStatus == 'loading', size: 'large' }}
          />
          <div className='right-menu' ref={rightMenu}>
            <div className='menu-item' onClick={fileOpen}>
              <span>打开</span>
            </div>
            <div className='menu-item' onClick={() => fileDownload(selectedData!)}>
              <DownloadOutlined />
              <span>下载</span>
            </div>
            <div className='menu-item' onClick={fileShare}>
              <ShareAltOutlined />
              <span>分享</span>
            </div>
            <div className='menu-item' onClick={fileGroup}>
              <UsergroupAddOutlined />
              <span>共享</span>
            </div>
            <div className='menu-item' onClick={fileCopy}>
              <CopyOutlined />
              <span>复制</span>
            </div>
            <div className='menu-item' onClick={fileMove}>
              <DragOutlined />
              <span>移动</span>
            </div>
            <div className='menu-item' onClick={fileRename}>
              <EditOutlined />
              <span>重命名</span>
            </div>
            <div className='menu-item' onClick={() => fileDelete(selectedData!)}>
              <DeleteOutlined />
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
      <div className='preview' style={{ display: fold ? 'none' : 'block' }}>
        <div className='search-wrapper'>
          <Input.Search placeholder="搜索我的文件" onSearch={fileSearch} />
        </div>
        <div className='title'>
          <h4 style={{ display: selectedDataKeys.length > 1 ? 'block' : 'none' }}>{`共选中${selectedDataKeys.length}个文件`}</h4>
          <h4 style={{ display: selectedDataKeys.length <= 1 ? 'block' : 'none' }}>文件详情</h4>
          <span onClick={() => setFold(true)}><RightOutlined className='icon' />收起</span>
        </div>
        <div className='detail-wrapper'>
          <div className='empty' style={{ display: selectedDataKeys.length ? 'none' : 'block' }}>
            <Image src='/src/assets/img/empty.png' preview={false} width={120}></Image>
            <p>选中文件/文件夹，查看详情</p>
          </div>
          <div className='detail' style={{ display: selectedDataKeys.length ? 'block' : 'none' }}>
            <div className='image-box'>
              <Image src={selectedDataKeys.length == 1 ? selectedData?.icon : '/src/assets/icon/folder.png'} preview={false} width={120} />
            </div>
            <div className='information' style={{ display: selectedDataKeys.length == 1 ? 'block' : 'none' }}>
              <h4>{selectedData?.directoryType ? selectedData.name.slice(1, selectedData.name.length - 1) : selectedData?.name}</h4>
              <ul>
                <li>创建时间：{selectedData?.uploadDate}</li>
                <li>文件大小：{computedFileSize(selectedData?.size)}</li>
                <li>所在目录：{selectedData?.directoryType ? selectedData.path.slice(0, selectedData.path.length - 1) : selectedData?.path}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type OperationType = 'share' | 'download' | 'delete' | 'rename' | 'copy' | 'move' | 'group' | null

interface ContextType {
  uploader: any,
  groupId: number
}

export default Directory