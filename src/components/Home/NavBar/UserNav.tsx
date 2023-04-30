import React from 'react'
import { createStyles } from 'antd-style'
import { UserOutlined, SwapOutlined, TeamOutlined } from '@ant-design/icons'
import { Space, Avatar } from 'antd'

const UserNav: React.FC = () => {
  const { styles } = useStyles()

  return (
    <Space size='middle'>
      <Avatar icon={<UserOutlined />} src={''} />
      <TeamOutlined title='好友列表' className={styles.option} />
      <SwapOutlined rotate={-90} title='传输列表' className={styles.option} />
    </Space>
  )
}

export default UserNav

const useStyles = createStyles(({ token, css }) => {
  return {
    option: css`
      color: ${token.colorText};
      cursor: pointer;

      &:hover {
        color: ${token.colorPrimaryHover};
      }
    `
  }
})
