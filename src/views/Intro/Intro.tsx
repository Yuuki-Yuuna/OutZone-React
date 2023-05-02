import { Button, Layout } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import './Intro.scss'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'

const { Header, Footer, Content } = Layout

export default function Intro() {
  const navigate = useNavigate()

  return (
    <Layout className='intro'>
      <header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: '1em' }}>
            {/* <div className='header-logo'>
              <img src='/logo.svg' alt='logo' width={32} />
            </div> */}
            {/* <span className='header-link'>首页</span> */}
            {/* <span className='header-link'>中转站</span> */}
            {/* <span className='header-link'>开放平台</span> */}
          </div>
          <div style={{ display: 'flex', gap: '1em' }}>
            <span className='header-link' onClick={() => navigate('/login')}>
              登录 / 注册
            </span>
          </div>
        </div>

        <h1 className='header-title'>
          <span>OutZone -- 终结你的数据存储困难</span>
          <img className='header-image' src='https://s2.loli.net/2023/04/30/JWR2qgdVL7jBwEl.png' />
        </h1>
      </header>

      <Content>
        {/* 具体见组件内部 */}
        <SectionOne></SectionOne>
        <SectionTwo></SectionTwo>
      </Content>

      <Footer className='footer'>
        <Link to='/'>
          <Button type='primary' shape='round' size='large'>
            开始入站
          </Button>
        </Link>
      </Footer>
    </Layout>
  )
}
