import React from 'react'
import { useUploader } from 'yuuki-uploader-react'
import { createStyles } from 'antd-style'
import { App, Layout } from 'antd'
import NavBar from '~/components/Home/NavBar/NavBar'
import SideBar from '~/components/Home/SideBar/SideBar'
import FileList from '~/components/File/FileList'
import { UploaderContext } from '~/contexts'
import { ResponseError, baseURL } from '~/util'
import { getInfo } from '~/api'

const Home: React.FC = () => {
  const { styles } = useStyles()
  const { message } = App.useApp()

  const uploader = useUploader({
    target: `${baseURL}/file/upload/file`,
    mergeTarget: `${baseURL}/file/upload/merge`,
    precheckTarget: `${baseURL}/file/upload/preCheck`,
    headers: {
      token: localStorage.getItem('token') || ''
    },
    async onFileReady(uploadFile) {
      try {
        const res = await getInfo()
        const { data } = res
        const extraData = {
          destinationPath: data.additionalInformation.rootDirectory.id,
          ownerType: 0,
          ownerId: data.uId
        }
        uploadFile.raw.extraData = {
          mergeData: { ...extraData, icon: '' },
          precheckData: extraData,
          data: extraData
        }
        console.log(uploadFile)
        uploader.upload(uploadFile)
      } catch (err) {
        message.error((err as ResponseError).message)
        uploader.removeFile(uploadFile)
      }
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
