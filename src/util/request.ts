import { App } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseData } from '~/types'

// export const baseurl = 'http://localhost:9527/api'
export const baseURL = 'http://192.168.124.12:9527/api'

const instance = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: false
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers.set('token', token)
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const code = error.code
    switch (code) {
      case 'ECONNABORTED':
        return Promise.reject(new ResponseError(code, '请求超时'))
      case 'ERR_NETWORK':
        return Promise.reject(new ResponseError(code, '请求错误'))
      default:
        return Promise.reject(new ResponseError('unknown', '未知错误'))
    }
  }
)

export const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return new Promise<ResponseData<T>>((resolve, reject) => {
      instance
        .get<ResponseData<T>>(url, config)
        .then((res) => {
          const result = checkResponse(res)
          result instanceof ResponseError ? reject(result) : resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return new Promise<ResponseData<T>>((resolve, reject) => {
      instance
        .post(url, data, config)
        .then((res) => {
          const result = checkResponse(res)
          result instanceof ResponseError ? reject(result) : resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const checkResponse = (response: AxiosResponse<ResponseData>) => {
  const result = response.data
  const { code, msg } = result
  if (code >= 200 && code < 300) {
    return response.data
  } else {
    return new ResponseError(code, msg)
  }
}

export class ResponseError extends Error {
  code: number | string

  constructor(code: number | string, msg: string) {
    super(msg)
    this.name = 'ApiError'
    this.code = code
  }
}
