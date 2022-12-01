import axios from 'axios'
import { getToken } from './secret'

export const baseURL = 'http://172.23.252.223:8085/api'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers = { ...config.headers, token }
  }
  return config
}, error => {
  Promise.reject(error)
})

instance.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default instance
