import { Dropdown, Space } from 'antd'
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
      <ShareAltOutlined
        className={styles.fileOptionsIcon}
        onClick={(e) => {
          e.stopPropagation()
          onShare()
        }}
      />
      <DownloadOutlined
        className={styles.fileOptionsIcon}
        onClick={(e) => {
          e.stopPropagation()
          onDownload()
        }}
      />
      <DeleteOutlined
        className={styles.fileOptionsIcon}
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      />
      <EditOutlined
        className={styles.fileOptionsIcon}
        onClick={(e) => {
          e.stopPropagation()
          onRename()
        }}
      />
      <Dropdown
        placement='bottomRight'
        trigger={['click']}
        // 必须阻止冒泡
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        onClick={(e: any) => {
          e.stopPropagation()
        }}
        menu={{
          items: [
            {
              key: '1',
              label: (
                <Space
                  onClick={(e: any) => {
                    e.stopPropagation()
                    onCopy()
                  }}
                >
                  <CopyOutlined />
                  复制
                </Space>
              )
            },
            {
              key: '2',
              label: (
                <Space
                  onClick={(e: any) => {
                    e.stopPropagation()
                    onMove()
                  }}
                >
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
