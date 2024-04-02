import useSWRImmutable from 'swr/immutable'
import { SWRConfiguration } from 'swr'
import { get } from '../request'
import { AxiosRequestConfig } from 'axios'

interface IUserInfoVo {
  createTime: Date
  email: string
  headPic: string
  id: number
  isFrozen: boolean
  nickName: string
  phoneNumber: string
  username: string
  isAdmin: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (...args: any[]) => get(...(args as [url: string, config: AxiosRequestConfig])).then((res) => res.data)

export const useUserInfo = (swrConfig?: SWRConfiguration<IUserInfoVo>) => {
  const { data, error, isLoading, mutate } = useSWRImmutable<IUserInfoVo>(`/user/info`, fetcher, {
    ...swrConfig,
    errorRetryCount: swrConfig?.errorRetryCount ?? 0
  })

  return {
    userInfo: data,
    isLoading,
    isError: error,
    mutate
  }
}
