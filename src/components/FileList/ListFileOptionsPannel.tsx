import {  Dropdown, Space } from 'antd'
import { useStyles } from './styles'
import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  DragOutlined
} from '@ant-design/icons'

export default function FileOptionsPannel({
    onShare,
    onDownload,
    onDelete,
    onRename,
    onCopy,
    onMove
  }: {
    onShare(): void
    onDownload(): void
    onDelete(): void
    onRename(): void
    onCopy(): void
    onMove(): void
  }) {
    const { styles } = useStyles()
  
    return (
      <div className={styles.fileOptionsPannel}>
        <ShareAltOutlined className={styles.fileOptionsIcon} onClick={onShare} />
        <DownloadOutlined
          className={styles.fileOptionsIcon}
          onClick={onDownload}
        />
        <DeleteOutlined className={styles.fileOptionsIcon} onClick={onDelete} />
        <EditOutlined className={styles.fileOptionsIcon} onClick={onRename} />
        <Dropdown
          placement='bottomRight'
          trigger={['click']}
          menu={{
            items: [
              {
                key: '1',
                label: (
                  <Space onClick={onCopy}>
                    <CopyOutlined />
                    复制
                  </Space>
                )
              },
              {
                key: '2',
                label: (
                  <Space onClick={onMove}>
                    <DragOutlined />
                    移动
                  </Space>
                )
              }
            ]
          }}
        >
          <EllipsisOutlined className={styles.fileOptionsIcon} />
        </Dropdown>
      </div>
    )
  }