/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/use-toast'
import axios, { AxiosRequestConfig } from 'axios'
import { IResponse } from './type'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})

interface PendingTask {
  config: AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value: any) => void
}
let refreshing = false
const queue: PendingTask[] = []

request.interceptors.request.use((config) => {
  console.log('🚀 ~ file: request.ts ~ line 20 ~ request.interceptors.request.use ~ config', config)
  if (localStorage.getItem('accessToken')) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
  }
  return config
})

request.interceptors.response.use(
  async (response) => {
    if (response.data.code === 200 || response.data.code === 201) {
      return response.data
    } else {
      const { data, config } = response

      try {
        if (data.code === 401 && !config.url?.includes('/user/refresh')) {
          // 除了刷新token的请求, 其他接口返回401时, 刷新token
          if (refreshing) {
            // 正在刷新token, 将请求放入队列
            return new Promise((resolve) => {
              queue.push({
                config,
                resolve
              })
            })
          }

          refreshing = true
          const res = await refreshToken()
          refreshing = false

          // 刷新token成功, 重新发起之前的请求
          if (res.status === 200) {
            queue.forEach(({ config, resolve }) => {
              resolve(request(config))
            })
            return request(config)
          }
        }
      } catch (error: any) {
        toast({
          title: '请求发生错误',
          description: error.data || error.message,
          variant: 'destructive'
        })
        return Promise.reject(error)
      }
      toast({
        title: '请求发生错误',
        description: response.data.data,
        variant: 'destructive'
      })
      // 如果刷新token失败, 则跳转到登录页
      if (config.url?.includes('/user/refresh')) {
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }

      throw new Error(response.data.data)
    }
  },
  async (error) => {
    toast({
      title: '请求发生错误',
      description: error.data || error.message,
      variant: 'destructive'
    })
    return Promise.reject(error)
  }
)

const get = <T = any>(url: string, config?: AxiosRequestConfig) => request.get<any, IResponse<T>>(url, config)
const post = <T = any>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request.post<any, IResponse<T>>(url, data, config)
const del = <T = any>(url: string, config?: AxiosRequestConfig) => request.delete<any, IResponse<T>>(url, config)
const put = <T = any>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request.put<any, IResponse<T>>(url, data, config)

async function refreshToken() {
  const res = await request.get('/user/refresh-token', {
    params: {
      refresh_token: localStorage.getItem('refresh_token')
    }
  })
  localStorage.setItem('accessToken', res.data.access_token || '')
  localStorage.setItem('refreshToken', res.data.refresh_token || '')
  return res
}

export { get, post, del, put }
