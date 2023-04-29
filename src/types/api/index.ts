import { ResponseError } from '~/util'

export interface ResponseData<T = any> {
  code: number
  msg: string
  data: T
}

export type { ResponseError }
