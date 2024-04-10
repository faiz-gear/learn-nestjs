import { post } from '../request'
import { ICreateMeetingRoom } from './type'

export const createMeetingRoom = (data: ICreateMeetingRoom) => post('/meeting-room/create', data)

export const deleteMeetingRoom = (id: number) => post('/meeting-room/delete', { id })
