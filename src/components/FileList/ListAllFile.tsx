import ListItem from './ListItem'
import ListItemHeader from './ListItemHeader'
import type { FileItem } from './ListItem'
import { useState } from 'react'

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

// TODO: 此数组仅供测试
const testData = [
  {
    id: '1652221637968588803',
    contentType: 0,
    name: '/test/',
    icon: 'https://file.re1ife.top/icon/const/directory.png',
    size: '0',
    parentDirectoryId: '1652221637968588802',
    absolutePath: '/test/',
    createDate: '2023-04-30T10:53:01',
    updateDate: '2023-04-30T10:53:01'
  },
  {
    id: '1',
    contentType: 1,
    name: 'test',
    icon: 'https://file.re1ife.top/icon/const/other.png',
    size: '1336',
    parentDirectoryId: '1652221637968588802',
    absolutePath: '/',
    createDate: '2023-04-30T10:55:18',
    updateDate: '2023-04-30T10:55:18'
  }
]

interface Props {
  fileList: FileItem[]
  onShareItem(item: FileItem): void
  onDownloadItem(item: FileItem): void
  onDeleteItem(item: FileItem): void
  onRenameItem(item: FileItem): void
  onCopyItem(item: FileItem): void
  onMoveItem(item: FileItem): void
  onClickItem(item: FileItem): void // 点击某一项目触发，用例：显示预览
  onSelectChange(selectedItems: FileItem[]): void // 用例：显示多选操作栏时需要
}

export default function ListAllFile(props: Props) {
  const [fileList, setFileList] = useState(fileListDataToReactiveData(testData))

  return (
    <>
      <ListItemHeader
        onChange={(isSelectAllFile) => {
          setFileList((fileList) =>
            fileList.map((item) => {
              return { ...item, selected: isSelectAllFile }
            })
          )
        }}
      ></ListItemHeader>
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
              props.onSelectChange(fileList.filter((item) => item.selected))
              return after
            })
          }}
          onClick={() => props.onClickItem(fileItem)}
        />
      ))}
    </>
  )
}
