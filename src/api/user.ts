import request from '@/util/request'
import type { LoginUser } from '@/type/User'

export const userLogin = (params: LoginUser) => {
  return request.post('/api/user/login', params)
}