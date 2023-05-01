import React from 'react'
import { createStyles } from 'antd-style'
import FileOption from './FileOption'
import FileListComponent from '../FileList/ListAllFile'

// TODO: 此数组仅供测试
const testFileList = [
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

const FileList: React.FC = () => {
  const { styles } = useStyles()

  // TODO: 此组件暂时测试
  return (
    <div className={styles.container}>
      <FileOption />
      <FileListComponent
        fileList={testFileList}
        onClickItem={(item) => console.log('onClickItem', item)}
        onCopyItem={(item) => console.log('onCopyItem', item)}
        onDeleteItem={(item) => console.log('onDeleteItem', item)}
        onDownloadItem={(item) => console.log('onDownloadItem', item)}
        onMoveItem={(item) => console.log('onMoveItem', item)}
        onOpenItem={(item) => console.log('onOpenItem', item)}
        onRenameItem={(item) => console.log('onRenameItem', item)}
        onShareItem={(item) => console.log('onShareItem', item)}
        onSelectedChange={(item) => console.log('onSelectedChange', item)}
      />
    </div>
  )
}

export default FileList

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      flex: 1;
      min-width: 600px;
    `
  }
})
