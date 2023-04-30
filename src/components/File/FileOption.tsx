import React, { useContext, useEffect, useRef } from 'react'
import { createStyles } from 'antd-style'
import { UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { UploaderContext } from '~/contexts'

const FileOption: React.FC = () => {
  const { styles } = useStyles()
  const { register, unRegister, registerDrop, unRegisterDrop } =
    useContext(UploaderContext)!
  const uploadRef = useRef<HTMLElement>(null)

  useEffect(() => {
    register(uploadRef)
    registerDrop(uploadRef)

    return () => {
      unRegister()
      unRegisterDrop
    }
  })

  return (
    <div className={styles.container}>
      <Button
        ref={uploadRef}
        className={styles.upload}
        type='primary'
        icon={<UploadOutlined />}
        shape='round'
      >
        上传
      </Button>
      <button className={styles.button}>新建文件夹</button>
    </div>
  )
}

export default FileOption

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      padding: 5px 10px;
    `,
    upload: css`
      margin-right: 20px;
      font-weight: ${token.fontWeightStrong};
    `,
    button: css`
      cursor: pointer;
      height: 32px;
      border: 1px solid transparent;
      border-radius: 32px;
      padding: 4px 15px;
      padding-inline-start: 16px;
      padding-inline-end: 16px;
      font-weight: ${token.fontWeightStrong};
      color: ${token.colorPrimary};
      background-color: ${token.colorPrimaryBorder};
    `
  }
})
