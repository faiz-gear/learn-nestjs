import { post } from '../request'

export const login = (username: string, password: string) => {
  return post('/user/login', { username, password })
}
