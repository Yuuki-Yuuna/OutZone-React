import request from '@/util/request'
import type { LoginUser, RegisterUser, UserInformation } from '@/type/User'

export const userLogin = (params: LoginUser) => {
  return request.post<UserLoginData>('/user/login', params)
}

export const userLogout = () => {
  return request.get<ResponseData>('/user/logout')
}

//发送验证码到邮箱
export const getRegisterCode = (params: GetRegisterCodeParams) => {
  return request.post<ResponseData>('/user/registerCode', params)
}

export const userRegister = (params: RegisterUser) => {
  return request.post<ResponseData>('/user/register', params)
}

export const getUserInfo = () => {
  return request.get<GetUserInfoData>('/user/getUserInfo')
}

export interface GetRegisterCodeParams {
  username: string
  mailAddress: string
}

export interface UserLoginData extends ResponseData {
  data: {
    token: string
  }
}

export interface GetUserInfoData extends ResponseData {
  data: UserInformation
}

interface ResponseData {
  code: number
  msg: string
}