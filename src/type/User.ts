export interface LoginUser {
  username: string
  password: string
}

export interface RegisterUser extends LoginUser {
  mailAddress: string
  verificationCode: string
  confirmPassword: string
}

export interface UserInformation {
  id: number
  username: string
  icon: string
  registerTime: string
}