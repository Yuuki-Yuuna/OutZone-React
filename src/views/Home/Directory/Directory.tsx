import React, { useRef, useState, useEffect, useMemo } from 'react'
import './Directory.scss'
import FileManage from '@/compnents/FileManage/FileManage'
import { Table, Image, Dropdown, Input, message, Button } from 'antd'
import { ShareAltOutlined, DownloadOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, CopyOutlined, DragOutlined, UsergroupAddOutlined, LeftOutlined, RightOutlined, LoadingOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { FileInformation } from '@/type/File'
import { useStoreSelector, useStoreDispatch } from '@/store'
import { getFileList } from '@/store/features/fileSlice'
import { computedFileSize } from '@/util/file'
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { deleteFiles, downloadFile, renameDirectory, renameFile } from '@/api/file'

const Directory: React.FC = () => {
  let [fold, setFold] = useState(false)//折叠开关
  const rightMenu = useRef<HTMLDivElement>(null)//自定义右键菜单
  let operationType: OperationType = null
  let [selectedDataKeys, setSelectedDataKeys] = useState<React.Key[]>([])//表格选中项key值
  let [selectedDataRows, setSelectedDataRows] = useState<FileInformation[]>([])//当前选中项数组
  const fileList = useStoreSelector(state => state.file.fileList)
  const loadingStatus = useStoreSelector(state => state.file.status)
  let [isLoading, setIsloading] = useState(false)//加载状态由isLoading和loadingStatus共同组成
  const dispatch = useStoreDispatch()
  const [search, setSearch] = useSearchParams()
  const { category } = useParams()
  const path = (search.get('path') ? search.get('path') : '/') as string
  const uploadPath = path == '/' || category != 'all' ? '/' : path + '/'//上传路径有'/'
  const { groupId, uploader } = useOutletContext<ContextType>()
  let [editingData, setEditingData] = useState<FileInformation | null>(null)//处于编辑状态的数据
  let [editingName, setEditingName] = useState('')
  let [firstEdit, setFirstEdit] = useState(true)//是否第一次编辑

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
  const fileEnter = (file: FileInformation) => {
    return (event: React.MouseEvent) => {
      event.stopPropagation()//阻止冒泡
      if (file.directoryType) {
        const newPath = file.path.slice(0, file.path.length - 1)
        search.set('path', newPath)
        setSearch(search)
      }
    }
  }
  const fileShare = () => {
    console.log('分享')
  }
  const fileDownload = (files: FileInformation[]) => {
    console.log('下载', files)
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
        } else {
          message.error(result.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
  const fileDelete = (files: FileInformation[]) => {
    // console.log('删除', files)
    deleteFiles({ destination: uploadPath, groupId, files }).then(res => {
      // console.log(res.data)
      if (res.data.code == 200) {
        message.success('删除成功')
        dispatch(getFileList({ groupId, absolutePath: uploadPath, fileType: category }))
      } else {
        message.error(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const fileRename = (file: FileInformation) => {
    // console.log('重命名', file)
    setEditingData(file)
    setEditingName(file.directoryType ? file.name.slice(1, file.name.length - 1) : file.name)
    setFirstEdit(true)
  }
  const fileCopy = () => {
    console.log('复制')
  }
  const fileMove = () => {
    console.log('移动')
  }
  const fileGroup = () => {
    console.log('共享')
  }
  const fileOpen = () => {
    // console.log('打开', selectedData)
    if (selectedDataRows[0]?.directoryType) {
      let newPath = selectedDataRows[0].path
      newPath = selectedDataRows[0].directoryType ? newPath.slice(0, newPath.length - 1) : newPath
      console.log(newPath)
      search.set('path', newPath)
      setSearch(search)
    }
  }
  const fileSearch = () => {

  }
  const fileRenameCheck = async (event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      if (editingData) {
        setIsloading(true)
        const params = { groupId, id: editingData.id, newName: editingData.directoryType ? '/' + editingName + '/' : editingName }
        const res = editingData.directoryType ? await renameDirectory(params) : await renameFile(params)
        const result = res.data
        if (result.code == 200) {
          message.success('重命名成功~')
          dispatch(getFileList({ groupId, absolutePath: uploadPath, fileType: category }))
        } else {
          message.error(result.msg)
        }
        setEditingData(null)
        setIsloading(false)
        setSelectedDataKeys([])
        setSelectedDataRows([])
      }
    } catch (err) {
      console.log(err)
    }
  }
  const fileRenameCancel = (event: React.MouseEvent) => {
    event.stopPropagation()
    setEditingData(null)
  }
  const onEditFocus = (event: React.FocusEvent) => {
    // console.log(event)
    const target = event.target as HTMLInputElement
    // console.log(target.id)
    //注意id转string不要打三个等
    if (target.id == editingData?.id && firstEdit) {
      const slices = target.value.split('.')
      if (slices.length == 1) {
        target.setSelectionRange(0, target.value.length)
      } else {
        target.setSelectionRange(0, target.value.length - slices[slices.length - 1].length - 1)
      }
      setFirstEdit(false)
    }
  }
  const onFilenameChange = (event: React.ChangeEvent) => {
    const input = event.target as HTMLInputElement
    setEditingName(input.value)
  }

  useEffect(() => {
    dispatch(getFileList({ groupId, absolutePath: uploadPath, fileType: category }))
    setSelectedDataKeys([])
    setEditingData(null)
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
          case 'download': fileDownload([record])
            break
          case 'delete': fileDelete([record])
            break
          case 'rename': fileRename(record)
            break
          case 'copy': fileCopy()
            break
          case 'move': fileMove()
            break
          case 'group': fileGroup()
            break
          default: setSelectedDataRows([record]), setSelectedDataKeys([record.id])
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
        if (!selectedDataKeys.includes(record.id)) {
          setSelectedDataRows([record])//这里延迟满足要求，而且也需要渲染页面，就将就一下吧
          setSelectedDataKeys([record.id])
        }
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
      setSelectedDataRows(selectedRows)
      if (selectedRows.length == 0) {
        rightMenu.current!.style.display = 'none'
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
            <Image src={record.icon} preview={false} width={32} height={32} style={{ borderRadius: '6px', objectFit: 'cover' }} />
            {editingData?.id == record.id ? (
              <span className='input'>
                <Input autoFocus={true} id={record.id.toString()} onFocus={onEditFocus} value={editingName} onChange={onFilenameChange} maxLength={50} />
                <span className='button-group'>
                  <Button className='button' type='primary' icon={<CheckOutlined />} onClick={fileRenameCheck}></Button>
                  <Button className='button' type='primary' icon={<CloseOutlined />} onClick={fileRenameCancel}></Button>
                </span>
              </span>
            ) : <span className='text' onClick={fileEnter(record)}>{record.directoryType ? text.slice(1, text.length - 1) : text}</span>}
          </div>
        )
      },
      width: '60%'
    },
    {
      title: '创建时间',
      dataIndex: 'uploadDate',
      render: (text, record) => (
        <div className='date-selection'>
          <span className='info'>{text}</span>
          <div className='button-group' style={{ display: editingData?.id == record.id ? 'none' : '' }}>
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
      render: (text) => <span className='info'>{computedFileSize(text)}</span>,
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
          <span style={{ display: fold ? 'flex' : 'none' }} onClick={() => setFold(false)}>
            <LeftOutlined className='icon' />展开
          </span>
        </div>
        <div className='table'>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            rowSelection={{ ...rowSelection }}
            dataSource={fileList}
            pagination={false}
            onRow={rowOption}
            scroll={{ y: 520 }}
            loading={{ indicator: <LoadingOutlined />, spinning: loadingStatus == 'loading' || isLoading, size: 'large' }}
          />
          <div className='right-menu' ref={rightMenu}>
            <div className='menu-item' onClick={fileOpen} style={{ display: selectedDataKeys.length <= 1 ? 'block' : 'none' }}>
              <span>打开</span>
            </div>
            <div className='menu-item' onClick={() => fileDownload(selectedDataRows)}>
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
            <div className='menu-item' onClick={() => fileRename(selectedDataRows[0])} style={{ display: selectedDataKeys.length <= 1 ? 'block' : 'none' }}>
              <EditOutlined />
              <span>重命名</span>
            </div>
            <div className='menu-item' onClick={() => fileDelete(selectedDataRows)}>
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
            <Image src={new URL('../../../assets/img/empty.png', import.meta.url).href} preview={false}></Image>
            <p>选中文件/文件夹，查看详情</p>
          </div>
          <div className='detail' style={{ display: selectedDataKeys.length ? 'block' : 'none' }}>
            <div className='image-box'>
              <Image src={selectedDataKeys.length == 1 ? selectedDataRows[0].icon : new URL('../../../assets/icon/folder.png', import.meta.url).href} preview={false} style={{ borderRadius: '9.5px' }} />
            </div>
            <div className='information' style={{ display: selectedDataKeys.length == 1 ? 'block' : 'none' }}>
              <h4>{selectedDataRows[0]?.directoryType ? selectedDataRows[0]?.name.slice(1, selectedDataRows[0].name.length - 1) : selectedDataRows[0]?.name}</h4>
              <ul>
                <li>创建时间：{selectedDataRows[0]?.uploadDate}</li>
                <li>文件大小：{computedFileSize(selectedDataRows[0]?.size)}</li>
                <li>所在目录：{selectedDataRows[0]?.path == '/' ? selectedDataRows[0]?.path : selectedDataRows[0]?.path.slice(0, selectedDataRows[0].path.length - 1)}</li>
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