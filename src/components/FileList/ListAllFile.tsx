import ListItem from './ListItem'
import ListItemHeader from './ListItemHeader'
import type { FileItem } from './ListItem'
import { useState } from 'react'
import ListBlank from './ListBlank'

function fileListDataToReactiveData<T extends object>(
  arr: T[]
): (T & { selected: boolean })[] {
  type T_ADD = T & { selected: boolean }
  // 此函数将克隆原数组，并添加 selected 字段
  return arr.map((item) => {
    // prettier-ignore
    (item as T_ADD).selected = false
    return item
  }) as T_ADD[]
}

interface Props {
  fileList: FileItem[]
  onShareItem(item: FileItem): void
  onDownloadItem(item: FileItem): void
  onDeleteItem(item: FileItem): void
  onRenameItem(item: FileItem): void
  onCopyItem(item: FileItem): void
  onMoveItem(item: FileItem): void
  onOpenItem(item: FileItem): void // 此时 item 必为 文件夹
  onClickItem(item: FileItem): void // 点击某一项目触发，用例：显示预览
  onSelectedChange(selectedItems: FileItem[]): void // 用例：显示多选操作栏时需要
}

export default function ListAllFile(props: Props) {
  const [fileList, setFileList] = useState(
    fileListDataToReactiveData(props.fileList)
  )

  if (fileList.length > 0)
    return (
      <>
        <ListItemHeader
          onChange={(isSelectAllFile) => {
            setFileList((fileList) => {
              const after = fileList.map((item) => ({
                ...item,
                selected: isSelectAllFile
              }))
              // 回调中使用变更后state，保证状态一致
              props.onSelectedChange?.(after.filter((item) => item.selected))
              return after
            })
          }}
          selectedItemsCount={fileList.filter((item) => item.selected).length}
        />

        {fileList.map((fileItem) => (
          <ListItem
            key={fileItem.id}
            file={fileItem}
            onDelete={() => props.onDeleteItem(fileItem)}
            onCopy={() => props.onCopyItem(fileItem)}
            onDownload={() => props.onDownloadItem(fileItem)}
            onMove={() => props.onMoveItem(fileItem)}
            onRename={() => props.onRenameItem(fileItem)}
            onShare={() => props.onShareItem(fileItem)}
            onOpen={() => props.onOpenItem(fileItem)}
            isSelected={fileItem.selected}
            // 此select是选中其左侧checkbox
            onSelect={(val) => {
              setFileList((fileList) => {
                // after为变更后state
                const after = fileList.map((item) => {
                  return fileItem.id === item.id
                    ? { ...item, selected: val }
                    : item
                })
                // 回调中使用变更后state，保证状态一致
                props.onSelectedChange?.(after.filter((item) => item.selected))
                return after
              })
            }}
            onClick={() => props.onClickItem(fileItem)}
          />
        ))}
      </>
    )
  else return <ListBlank />
}
