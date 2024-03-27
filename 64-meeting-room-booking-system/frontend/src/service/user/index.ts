import { get, post } from '../request'
import { TUpdatePassword } from './type'

export const updatePassword = async (data: TUpdatePassword) => {
  return await post('/user/update-password', data)
}

export const getUpdatePasswordCaptcha = async (email: string) => {
  return await get('/user/update-password-captcha', {
    params: { email }
  })
}
