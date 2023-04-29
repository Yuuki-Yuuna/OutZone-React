import React from 'react'
import { createStyles } from 'antd-style'
import FileOption from './FileOption'

const FileList: React.FC = () => {
  const { styles } = useStyles()

  return (
    <div className={styles.container}>
      <FileOption />
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
