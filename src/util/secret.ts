import cryptoJs  from 'crypto-js'

const secretKey = '这个破项目啥时候才完工啊' 

//加解密token,session不加密,local加密
export const getToken = () => {
  let token = sessionStorage.getItem('token')
  if(!token) {
    const localToken = localStorage.getItem('token')
    token = localToken ? cryptoJs.AES.decrypt(localToken, secretKey).toString(cryptoJs.enc.Utf8) : null
  }
  return token
}

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token)
  localStorage.setItem('token', cryptoJs.AES.encrypt(token, secretKey).toString())
}