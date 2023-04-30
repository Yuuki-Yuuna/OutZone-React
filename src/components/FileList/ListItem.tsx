import { useStyles } from './styles'
import { useEffect, useRef, useState } from 'react'

import FileNameAndIcon from './ListFileNameAndIcon'
import FileOptionsPannel from './ListFileOptionsPannel'
import FileTimeAndSize from './ListFileTimeAndSize'

interface Props {
  onShare(): void
  onDownload(): void
  onDelete(): void
  onRename(): void
  onCopy(): void
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

  return (
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
  )
}
