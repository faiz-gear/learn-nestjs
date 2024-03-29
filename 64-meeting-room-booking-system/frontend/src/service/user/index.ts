import { get, post } from '../request'
import { TUpdateInfo, TUpdatePassword } from './type'

export const updatePassword = async (data: TUpdatePassword) => {
  return await post('/user/update-password', data)
}

export const getUpdatePasswordCaptcha = async (email: string) => {
  return await get('/user/update-password-captcha', {
    params: { email }
  })
}

export const getInfo = async () => {
  return await get('/user/info')
}

export const updateInfo = async (data: TUpdateInfo) => {
  return await post('/user/update-user', data)
}

export const getUpdateInfoCaptcha = async () => {
  return await get('/user/update-user-captcha')
}

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return await post<string>('/user/upload', formData)
}
