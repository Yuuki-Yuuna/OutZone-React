import React from 'react'
import './Directory.scss'
import { checkFileType } from '@/util/file'
import { Button, Table, Image } from 'antd'
import { UploadOutlined, FolderAddOutlined, FileAddOutlined, ShareAltOutlined, DownloadOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { FileInfomation } from '@/type/File'

const Directory: React.FC = () => {
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
            <EllipsisOutlined className='button' />
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
      <div className='preview'>

      </div>
    </div>
  )
}

export default Directory