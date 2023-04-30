import { Button, Layout } from 'antd'
import { createStyles, useResponsive } from 'antd-style'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import { Link } from 'react-router-dom'

const { Header, Footer, Content } = Layout

export default function Intro() {
  const { styles, cx, theme } = useStyles()
  const { tablet: isPC } = useResponsive()
  function mobileClass<T>(cls: T) {
    return isPC ? undefined : cls
  }

  return (
    <Layout>
      <header className={cx(styles.header, mobileClass(styles.headerMobile))}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: '1em' }}>
            <div
              className={cx(
                styles.headerLink,
                mobileClass(styles.headerLinkMobile),
                styles.headerLogo
              )}
            >
              <img src='/logo.png' alt='logo' />
            </div>
            <span
              className={cx(
                styles.headerLink,
                mobileClass(styles.headerLinkMobile)
              )}
            >
              首页
            </span>
            <span
              className={cx(
                styles.headerLink,
                mobileClass(styles.headerLinkMobile)
              )}
            >
              中转站
            </span>
            <span
              className={cx(
                styles.headerLink,
                mobileClass(styles.headerLinkMobile)
              )}
            >
              开放平台
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1em' }}>
            <span
              className={cx(
                styles.headerLink,
                mobileClass(styles.headerLinkMobile)
              )}
            >
              登录 / 注册
            </span>
          </div>
        </div>

        <h1
          className={cx(
            styles.headerTitle,
            mobileClass(styles.headerTitleMobile)
          )}
        >
          <span>OutZone -- 终结你的数据存储困难</span>
          {!isPC && (
            <span>
              {/* TODO: 此处图片需要替换 */}
              <img
                style={{ maxWidth: '100%', padding: '0 0.25em' }}
                src='https://s2.loli.net/2023/04/30/JWR2qgdVL7jBwEl.png'
              />
            </span>
          )}
        </h1>
      </header>

      {isPC && (
        <header className={styles.header2}>
          <img
            className={styles.headerImage}
            src='https://s2.loli.net/2023/04/30/JWR2qgdVL7jBwEl.png'
            alt='preview'
          />
        </header>
      )}

      <Content>
        {/* 具体见组件内部 */}
        <SectionOne></SectionOne>
        <SectionTwo></SectionTwo>
      </Content>

      <Footer className={styles.footer}>
        {/* 底部按钮 */}

        <Link to='/'>
          <Button type='primary' shape='round' size='large'>
            开始入站
          </Button>
        </Link>
      </Footer>
    </Layout>
  )
}

const useStyles = createStyles(({ token, css }) => {
  return {
    /* HEADER */
    header: css`
      background: linear-gradient(
        180deg,
        hsl(233deg 100% 70%) 0%,
        hsl(233deg 100% 69%) 11%,
        hsl(233deg 100% 68%) 22%,
        hsl(233deg 100% 66%) 33%,
        hsl(233deg 100% 65%) 44%,
        hsl(233deg 100% 64%) 56%,
        hsl(233deg 100% 62%) 67%,
        hsl(233deg 100% 61%) 78%,
        hsl(233deg 100% 59%) 89%,
        hsl(233deg 100% 57%) 100%
      );
      color: #fff;
      padding: 0;
      height: 55vh;
    `,
    headerMobile: css`
      height: 100vh;
    `,
    header2: css`
      height: 45vh;
      color: #fff;
      transform: translateY(-30vh);
      display: flex;
      justify-content: center;
    `,
    headerLogo: css`
      padding: 1em 0 1em 1em;
      &:hover {
        background: none;
      }
    `,
    headerLink: css`
      padding: 2em 3em;
      transiton: all 0.15s;
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    `,
    headerLinkMobile: css`
      padding: 0.75em;
      margin: auto;
      border-radius: 0.25em;
    `,
    headerTitle: css`
      font-weight: normal;
      font-size: 2.25em;
      text-align: center;
      padding: 0.5em 0;
    `,
    headerTitleMobile: css`
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      align-items: center;
      justify-content: center;
    `,
    headerImage: css`
      background: #eee;
      margin: 1em;
      max-width: 100%;
      /* width: 80%; */
      height: 30em;
      object-fit: contain;
      /* TODO */
    `,
    footer: css`
      background: #e8f0f9;
      display: flex;
      justify-content: center;
      align-items: center;
    `
  }
})
