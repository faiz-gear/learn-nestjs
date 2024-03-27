import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})

request.interceptors.request.use((res) => {
  if (localStorage.getItem('accessToken')) {
    res.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
  }
  return res
})

request.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err.response)
  }
)

const { get, post, delete: del, put } = request

export { get, post, del, put }
