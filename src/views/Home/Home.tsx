import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUploader } from 'yuuki-uploader-react'
import { createStyles } from 'antd-style'
import { Layout } from 'antd'
import { useStoreSelector } from '~/store'
import NavBar from '~/components/Home/NavBar/NavBar'
import SideBar from '~/components/Home/SideBar/SideBar'
import FileList from '~/components/File/FileList'
import { UploaderContext } from '~/contexts'
import { baseURL } from '~/util'

const Home: React.FC = () => {
  const { styles } = useStyles()
  const [search] = useSearchParams()

  const destinationPath = search.get('path') || '/'
  const ownerId = useStoreSelector((state) => state.user.userInfo?.uId ?? '')

  const createExtraData = () => ({ destinationPath, ownerType: 0, ownerId })
  const uploader = useUploader({
    target: `${baseURL}/file/upload/file`,
    mergeTarget: `${baseURL}/file/upload/merge`,
    precheckTarget: `${baseURL}/file/upload/preCheck`,
    precheckData: createExtraData,
    mergeData: createExtraData,
    data: createExtraData,
    onFileReady(uploadFile) {
      uploader.upload(uploadFile)
    }
  })

  return (
    <UploaderContext.Provider value={uploader}>
      <Layout className={styles.container}>
        <NavBar />
        <Layout className={styles.layout}>
          <SideBar />
          <Layout.Content className={styles.content}>
            <FileList />
          </Layout.Content>
        </Layout>
      </Layout>
    </UploaderContext.Provider>
  )
}

export default Home

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      min-height: 100vh;
    `,
    layout: css`
      margin-top: 6px;
    `,
    content: css`
      display: flex;
    `
  }
})
