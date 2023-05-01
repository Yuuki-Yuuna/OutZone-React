import React, { useContext, useEffect, useRef } from 'react'
import { createStyles } from 'antd-style'
import {
  UploadOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  DragOutlined
} from '@ant-design/icons'
import { Button } from 'antd'
import { UploaderContext } from '~/contexts'

const IconWithText = ({
  icon,
  children
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.25em'
    }}
  >
    <div style={{ transform: 'scale(0.75)' }}>{icon}</div>
    <div>{children}</div>
  </div>
)

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

  // TODO: 若有选中任意文件/文件夹，则显示按钮组，否则显示上传按钮
  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <button className={styles.button}>
          <IconWithText icon={<ShareAltOutlined />}> 分享</IconWithText>
        </button>
        <button className={styles.button}>
          <IconWithText icon={<DeleteOutlined />}> 删除</IconWithText>
        </button>
        <button className={styles.button}>
          <IconWithText icon={<DownloadOutlined />}> 下载</IconWithText>
        </button>
        <button className={styles.button}>
          <IconWithText icon={<CopyOutlined />}> 复制</IconWithText>
        </button>
        <button className={styles.button}>
          <IconWithText icon={<DragOutlined />}> 移动</IconWithText>
        </button>
      </div>

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
      margin: 0 20px;
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
    `,
    buttonGroup: css`
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      border-radius: 32px;
      & button:last-child {
        &:after {
          display: none;
        }
      }
      & button {
        border-radius: 0;
        position: relative;
        &:after {
          z-index: 10;
          position: absolute;
          content: '';
          height: 50%;
          transform: translateY(50%);
          border-right: solid 1px ${token.colorPrimary};
          opacity: 0.33;
          top: 0;
          right: 0;
        }
      }
    `
  }
})
