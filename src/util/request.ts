import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api.re1ife.top',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if(token) {
    config.headers!.token = token
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
