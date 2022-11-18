import React, { useState } from 'react'
import './Directory.scss'
import { checkFileType } from '@/util/file'
import { Button, Table, Image, Dropdown, Input } from 'antd'
import { UploadOutlined, FolderAddOutlined, FileAddOutlined, ShareAltOutlined, DownloadOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, CopyOutlined, DragOutlined, UsergroupAddOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { FileInfomation } from '@/type/File'

const { Search } = Input

const Directory: React.FC = () => {
  let [fold, setFold] = useState(false)//折叠开关

  const testData: FileInfomation[] = [
    {
      key: '1',
      filename: '我的资源',
      createtime: '2022-11-14 15:50',
      updatetime: '2022-11-14 16:00',
      size: '-',
      isFolder: true,
      directory: '/'
    },
    {
      key: '2',
      filename: '百度云解压',
      createtime: '2022-11-14 15:50',
      updatetime: '2022-11-14 16:00',
      size: '-',
      isFolder: true,
      directory: '/'
    },
    {
      key: '3',
      filename: '压缩文件',
      extendname: 'rar',
      createtime: '2022-11-14 15:50',
      updatetime: '2022-11-14 16:00',
      size: '784M',
      isFolder: false,
      directory: '/'
    },
    {
      key: '4',
      filename: '音乐文件',
      extendname: 'flac',
      createtime: '2022-11-14 15:50',
      updatetime: '2022-11-14 16:00',
      size: '36.2M',
      isFolder: false,
      directory: '/'
    }
  ]

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'copy',
      label: (
        <div>
          <CopyOutlined />
          <span>复制</span>
        </div>
      )
    },
    {
      key: 'move',
      label: (
        <div>
          <DragOutlined />
          <span>移动</span>
        </div>
      )
    },
    {
      key: 'share',
      label: (
        <div>
          <UsergroupAddOutlined />
          <span>共享</span>
        </div>
      )
    }
  ]

  const rowOption = (record: FileInfomation, index?: number) => {
    return {
      onClick: () => {
        console.log(record, index)
      },
      // onDoubleClick: event => { },//双击行
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: FileInfomation[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
  }

  const columns: ColumnsType<FileInfomation> = [
    {
      title: '文件名',
      dataIndex: 'filename',
      render: (text, record) => {
        let fileType = 'other'
        if (record.isFolder) {
          fileType = 'folder'
        } else if (record.extendname) {
          fileType = checkFileType(record.extendname)
        }
        const src = new URL(`../../../assets/icon/${fileType}.png`, import.meta.url).href

        return (
          <div className='file-selection'>
            <Image src={src} preview={false} width={32} />
            <span className='text'>{text}</span>
          </div>
        )
      }
    },
    {
      title: '修改时间',
      dataIndex: 'updatetime',
      render: (text) => (
        <div className='date-selection'>
          <span className='info'>{text}</span>
          <div className='button-group'>
            <ShareAltOutlined className='button' title='分享' />
            <DownloadOutlined className='button' title='下载' />
            <DeleteOutlined className='button' title='删除' />
            <EditOutlined className='button' title='重命名' />
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
      render: (text) => <span className='info'>{text}</span>
    }
  ]

  return (
    <div className='directory'>
      <div className='content'>
        <div className='tools'>
          <Button type="primary" shape='round' icon={<UploadOutlined />} className='upload'><b>上传</b></Button>
          <div className='buttons'>
            <div className='button'>
              <button><FolderAddOutlined className='icon' />新建文件夹</button>
            </div>
            <div className='button'>
              <button><FileAddOutlined className='icon' />新建文本文档</button>
            </div>
          </div>
        </div>
        <div className='title'>
          <h4>{'全部文件'}</h4>
          <span style={{ display: fold ? 'flex' : 'none' }} onClick={() => setFold(false)}>
            <LeftOutlined className='icon' />展开
          </span>
        </div>
        <div className='table'>
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={testData}
            pagination={false}
            onRow={rowOption}
          />
        </div>
      </div>
      <div className='preview' style={{ display: fold ? 'none' : 'block' }}>
        <div className='search-wrapper'>
          <Search placeholder="搜索我的文件" onSearch={() => { }} />
        </div>
        <div className='title'>
            <h4>{'文件详情'}</h4>
            <span onClick={() => setFold(true)}><RightOutlined className='icon' />收起</span>
          </div>
        <div className='detail-wrapper'>
          <div className='empty'>
            <Image src='/src/assets/img/empty.png' preview={false} width={120}></Image>
            <p>选中文件/文件夹，查看详情</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Directory