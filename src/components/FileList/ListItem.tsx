import { useStyles } from './styles'
import { useEffect, useRef, useState } from 'react'

import FileNameAndIcon from './ListFileNameAndIcon'
import FileOptionsPannel from './ListFileOptionsPannel'
import FileTimeAndSize from './ListFileTimeAndSize'
import { Dropdown, MenuProps, Space } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  DragOutlined
} from '@ant-design/icons'

interface Props {
  onShare(): void
  onDownload(): void
  onDelete(): void
  onRename(): void
  onCopy(): void
  onOpen(): void
  onMove(): void
  isSelected: boolean
  onSelect(value: boolean): void
  onClick(): void
  file: FileItem
}

export interface FileItem {
  id: string
  contentType: number
  name: string
  icon: string
  size: string
  parentDirectoryId: string
  absolutePath: string
  createDate: string
  updateDate: string
}

export default function ListItem({
  file,
  isSelected,
  onSelect,
  onShare,
  onDownload,
  onDelete,
  onRename,
  onCopy,
  onMove,
  onOpen,
  onClick
}: Props) {
  const { styles, cx } = useStyles()

  // 是否鼠标悬浮于当前列表项
  const [isHover, setHover] = useState(false)
  const listItemRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const e = listItemRef.current
    const onMouseEnter = () => setHover(true)
    const onMouseLeave = () => setHover(false)
    e?.addEventListener('mouseenter', onMouseEnter)
    e?.addEventListener('mouseleave', onMouseLeave)
    return () => {
      e?.removeEventListener('mouseenter', onMouseEnter)
      e?.removeEventListener('mouseleave', onMouseLeave)
    }
  })

  let contextMenuItems: MenuProps['items'] = [
    {
      label: (
        <Space onClick={onDownload}>
          <DownloadOutlined />
          下载
        </Space>
      ),
      key: '2'
    },
    {
      label: (
        <Space onClick={onShare}>
          <ShareAltOutlined />
          分享
        </Space>
      ),
      key: '3'
    },
    {
      type: 'divider'
    },
    {
      label: (
        <Space onClick={onCopy}>
          <CopyOutlined />
          复制
        </Space>
      ),
      key: '4'
    },
    {
      label: (
        <Space onClick={onMove}>
          <DragOutlined />
          移动
        </Space>
      ),
      key: '5'
    },
    {
      label: (
        <Space onClick={onRename}>
          <EditOutlined />
          重命名
        </Space>
      ),
      key: '6'
    },
    {
      type: 'divider'
    },
    {
      label: (
        <Space onClick={onDelete}>
          <DeleteOutlined />
          删除
        </Space>
      ),
      key: '7'
    }
  ]
  if (file.contentType === 0) {
    contextMenuItems = [
      {
        label: <Space onClick={onOpen}>打开</Space>,
        key: '1'
      },
      ...contextMenuItems
    ] as any
  }

  return (
    <Dropdown
      menu={{
        items: contextMenuItems
      }}
      trigger={['contextMenu']}
    >
      <div
        onClick={onClick}
        className={cx(
          styles.listItem,
          isSelected ? styles.listItemSelected : undefined
        )}
        ref={listItemRef}
      >
        <div className={styles.listItemFlexOne}>
          <FileNameAndIcon
            name={file.name}
            icon={'TODO'}
            isSelected={isSelected}
            onSelect={onSelect}
          ></FileNameAndIcon>
        </div>
        <div className={styles.listItemFlexTwo}>
          <div style={{ opacity: isHover ? '1' : '0', transition: 'all 0.3s' }}>
            <FileOptionsPannel
              {...{
                onShare,
                onDownload,
                onDelete,
                onRename,
                onCopy,
                onMove
              }}
            ></FileOptionsPannel>
          </div>
        </div>
        <div className={styles.listItemFlexThree}>
          <FileTimeAndSize
            createDate={file.createDate}
            size={file.size}
          ></FileTimeAndSize>
        </div>
      </div>
    </Dropdown>
  )
}
