import { get } from '../request'

export const applyBooking = (id: number) => get('/booking/apply/' + id)

export const rejectBooking = (id: number) => get('/booking/reject/' + id)

export const unbindBooking = (id: number) => get('/booking/unbind/' + id)

export const urgeBooking = (id: number) => get('/booking/urge/' + id)
