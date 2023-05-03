import { html } from './docs.md'
import './Docs.scss'
import '../../compnents/Navigation/Navigation.scss'
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import { useEffect } from 'react'

export default function Docs() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = '文档 | outZone'
  }, [])

  return (
    <>
      <div className='navigation'>
        <div className='logo'>
          <Image
            onClick={() => navigate('/home')}
            src='/logo.png'
            width={100}
            preview={false}
          ></Image>
          <h1
            style={{
              paddingLeft: '0.7em',
              transform: 'translateY(-10%)',
              color: '#4693e2',
              fontWeight: 'bold'
            }}
          >
            文档
          </h1>
        </div>
        <div className='flex-grow'></div>
      </div>
      <main>
        <div className='docs' dangerouslySetInnerHTML={{ __html: html }}></div>
      </main>
    </>
  )
}
