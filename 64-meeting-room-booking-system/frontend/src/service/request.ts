import axios, { AxiosRequestConfig } from 'axios'

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

request.interceptors.request.use((res) => {
  if (localStorage.getItem('accessToken')) {
    res.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
  }
  return res
})

request.interceptors.response.use(
  (response) => {
    if (response.data.code === 200 || response.data.code === 201) {
      return response
    } else {
      return Promise.reject(response.data.data)
    }
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error)
    }
    const { data, config } = error.response

    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve
        })
      })
    }

    if (data.code === 401 && !config.url.includes('/user/refresh')) {
      refreshing = true

      const res = await refreshToken()

      refreshing = false

      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(request(config))
        })

        return request(config)
      } else {
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }
    } else {
      return Promise.reject(error.response)
    }
  }
)

const { get, post, delete: del, put } = request

async function refreshToken() {
  const res = await get('/user/refresh', {
    params: {
      refresh_token: localStorage.getItem('refresh_token')
    }
  })
  localStorage.setItem('accessToken', res.data.access_token || '')
  localStorage.setItem('refreshToken', res.data.refresh_token || '')
  return res
}

export { get, post, del, put }
