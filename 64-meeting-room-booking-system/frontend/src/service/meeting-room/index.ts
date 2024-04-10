import { del, post } from '../request'
import { ICreateMeetingRoom } from './type'

export const createMeetingRoom = (data: ICreateMeetingRoom) => post('/meeting-room/create', data)

export const deleteMeetingRoom = (id: number) => del('/meeting-room/' + id)
