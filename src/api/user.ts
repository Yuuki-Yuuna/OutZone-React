import { request } from '~/util'
import { LoginInfo, UserInfo } from '~/types'

export const userLogin = (userInfo: LoginInfo) => {
  return request.post<{ token: string }>('/sso/login/login', userInfo)
}

export const getInfo = () => {
  return request.get<UserInfo>('/user/userinfo/user')
}

export const sendReisterCode = () => {
  return request.get('/sendReisterCode')
}
