import { memo } from 'react'
import type { PropsWithChildren, FC } from 'react'

interface IMeetingRoomListProps {}

const MeetingRoomList: FC<PropsWithChildren<IMeetingRoomListProps>> = () => {
  return <div>MeetingRoomList</div>
}

export default memo(MeetingRoomList)
