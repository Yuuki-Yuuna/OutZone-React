import React, { useEffect } from 'react'
import { createStyles } from 'antd-style'
import { Layout, Image, Switch, Divider, App } from 'antd'
import { changeTheme } from '~/store/features/themeSlice'
import { setUserInfo } from '~/store/features/userSlice'
import { useStoreDispatch } from '~/store'
import IconFont from '~/components/IconFont/IconFont'
import LoginNav from './LoginNav'
import UserNav from './UserNav'
import { getInfo } from '~/api'
import { ResponseError } from '~/types'

const NavBar: React.FC = () => {
  const { styles } = useStyles()
  const dispatch = useStoreDispatch()
  const { message } = App.useApp()

  const isLogin = localStorage.getItem('token') !== null

  const onThemeChange = (checked: boolean) => {
    dispatch(changeTheme(checked ? 'dark' : 'light'))
  }

  useEffect(() => {
    if (isLogin) {
      getInfo()
        .then((res) => {
          dispatch(setUserInfo(res.data))
        })
        .catch((err) => {
          message.error((err as ResponseError).message)
        })
    }
  })

  return (
    <Layout.Header className={styles.container}>
      <Image src='/logo.png' height={'100%'} preview={false} style={{ verticalAlign: 'top' }} />
      <div style={{ flex: 1 }}></div>
      {isLogin ? <UserNav /> : <LoginNav />}
      <Divider type='vertical' />
      <Switch
        checkedChildren={<IconFont type='moon' className={styles.switchIcon} />}
        unCheckedChildren={<IconFont type='sun' className={styles.switchIcon} />}
        onChange={onThemeChange}
      />
    </Layout.Header>
  )
}

export default NavBar

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      display: flex;
      align-items: center;
      padding: 5px 32px;
      line-height: 1;
      box-shadow: 0 3px 10px 0 rgb(0 0 0 / 6%);
      background-color: ${token.colorBgElevated};
    `,
    switchIcon: css`
      font-size: ${token.fontSize}px;
    `
  }
})
