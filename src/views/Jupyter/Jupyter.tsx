import '../../compnents/Navigation/Navigation.scss'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import JupyterList from './List'

const Jupyter: React.FC<{}> = (props) => {
  const navigate = useNavigate()

  return (
    <div className='forHeight'>
      <div className='navigation'>
        <div className='logo' onClick={() => navigate('/home')}>
          <Image src='/logo.png' width={100} preview={false}></Image>
          <h1 style={{ paddingLeft: '1em' }}>云平台</h1>
        </div>
        <div className='flex-grow'></div>
      </div>
      <div className='container'>
        <main>
          <JupyterList></JupyterList>
        </main>
      </div>
    </div>
  )
}

export default Jupyter
