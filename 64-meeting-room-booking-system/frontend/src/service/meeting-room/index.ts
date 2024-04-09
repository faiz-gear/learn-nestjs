import { post } from '../request'
import { ICreateMeetingRoom } from './type'

export const createMeetingRoom = (data: ICreateMeetingRoom) => post('/meeting-room/create', data)
