import React from 'react'
import { createStyles } from 'antd-style'

const FileDetail: React.FC = () => {
  const { styles } = useStyles()

  return <div className={styles.container}>FileDetail</div>
}

export default FileDetail

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      min-width: 300px;
      height: 200px;
      background-color: gray;
    `
  }
})
