import { ContentType } from './file'

export interface LoginInfo {
  username: string
  password: string
}

export interface UserInfo {
  uId: string
  username: string
  icon: string | null
  additionalInformation: {
    rootDirectory: {
      absolutePath: string
      contentType: ContentType
      createDate: string
      icon: string | null
      id: string
      name: string
      parentDirectoryId: string
      size: null
      updateDate: null
    }
  }
}
