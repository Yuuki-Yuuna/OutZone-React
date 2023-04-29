import { createContext } from 'react'
import { Uploader } from 'yuuki-uploader-react'

export enum OwnerType {
  group,
  user
}

export const UploaderContext = createContext<Uploader | null>(null)
