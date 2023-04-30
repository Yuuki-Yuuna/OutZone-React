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

export default function ListFile() {
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
          onDelete={() => {}}
          onCopy={() => {}}
          onDownload={() => {}}
          onMove={() => {}}
          onRename={() => {}}
          onShare={() => {}}
          isSelected={fileItem.selected}
          onSelect={(val) => {
            setFileList((fileList) =>
              fileList.map((item) => {
                return fileItem.id === item.id
                  ? { ...item, selected: val }
                  : item
              })
            )
          }}
        />
      ))}
    </>
  )
}
