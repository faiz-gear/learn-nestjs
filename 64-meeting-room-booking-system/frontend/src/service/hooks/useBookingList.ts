import useSWRImmutable from 'swr/immutable'
import { SWRConfiguration } from 'swr'
import { fetcher } from './fetcher'
import { IPaginationParams } from '../type'

export interface IBookingPaginationParams extends IPaginationParams {
  username?: string
  meetingRoomName?: string
  bookingTimeStart?: string
  bookingTimeEnd?: string
  bookingPosition?: string
}

export interface IBookingItemVo {
  id: number
  startTime: string
  endTime: string
  status: string
  note: string
  createTime: string
  updateTime: string
  user: {
    id: number
    nickName: string
    username: string
  }
  room: {
    id: number
    name: string
    capacity: number
    location: string
    equipment: string
    description: string
    isBooked: boolean
    createTime: string
    updateTime: string
  }
}
export interface IBookingListVo {
  totalCount: number
  bookings: IBookingItemVo[]
}

export const useBookingList = (params: IBookingPaginationParams, swrConfig?: SWRConfiguration<IBookingListVo>) => {
  const { data, error, isLoading, mutate } = useSWRImmutable<IBookingListVo>(
    [`/booking/list`, params],
    ([url, params]) => fetcher(url, { params }),
    {
      ...swrConfig,
      errorRetryCount: swrConfig?.errorRetryCount ?? 0
    }
  )

  return {
    bookingList: data,
    isLoading,
    isError: error,
    mutate
  }
}
