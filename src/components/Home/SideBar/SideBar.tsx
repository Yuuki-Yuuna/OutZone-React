import React from 'react'
import { createStyles } from 'antd-style'
import {
  FolderOutlined,
  FolderOpenOutlined,
  FileImageOutlined,
  FileOutlined,
  CustomerServiceOutlined,
  PlayCircleOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  SendOutlined
} from '@ant-design/icons'
import { Layout, Menu, MenuProps, Progress } from 'antd'
import { computedFileSize } from '~/util'

const SideBar: React.FC = () => {
  const { styles } = useStyles()

  const menuItems: MenuProps['items'] = [
    {
      key: 'file',
      label: '我的文件',
      icon: <FolderOutlined />,
      children: [
        {
          key: 'all',
          label: '全部',
          icon: <FolderOpenOutlined />
        },
        {
          key: 'image',
          label: '图片',
          icon: <FileImageOutlined />
        },
        {
          key: 'document',
          label: '文档',
          icon: <FileOutlined />
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
      key: 'share',
      label: '我的分享',
      icon: <SendOutlined />
    },
    {
      key: 'recycle',
      label: '回收站',
      icon: <DeleteOutlined />
    }
  ]

  return (
    <Layout.Sider className={styles.container}>
      <Menu
        mode='inline'
        items={menuItems}
        defaultOpenKeys={['file']}
        defaultSelectedKeys={['all']}
      />
      <div className={styles.capacity}>
        <Progress percent={20} showInfo={false} size='small' />
        <div className={styles.info}>{`${computedFileSize(
          0
        )}/${computedFileSize(2 * 1024 ** 4)}`}</div>
      </div>
    </Layout.Sider>
  )
}

export default SideBar

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      &.ant-layout-sider {
        padding: 5px 0;
        background: ${token.colorBgContainer};
      }
    `,
    capacity: css`
      position: absolute;
      width: 100%;
      bottom: 60px;
      padding: 0 24px;

      & .ant-progress-line {
        margin-bottom: 0;
      }
    `,
    info: css`
      padding: 0 10px;
      color: ${token.colorTextDescription};
    `
  }
})
