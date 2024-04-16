import ConfirmAlert from '@/components/confirm-alert'
import { Button } from '@/components/ui/button'
import { unbindBooking } from '@/service/booking'
import { IBookingItemVo, IBookingListVo } from '@/service/hooks/useBookingList'
import { ColumnDef } from '@tanstack/react-table'
import { KeyedMutator } from 'swr'

export const columns: (mutate: KeyedMutator<IBookingListVo>) => ColumnDef<IBookingItemVo>[] = (mutate) => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'user.username',
    header: '预订人'
  },
  {
    accessorKey: 'room.name',
    header: '会议室名称'
  },
  {
    accessorKey: 'room.location',
    header: '会议室位置'
  },
  {
    accessorKey: 'bookingTime',
    header: '预订时间',
    cell: (data) => {
      const { startTime, endTime } = data.row.original

      return `${new Date(startTime).toLocaleString()} ~ ${new Date(endTime).toLocaleString()}`
    }
  },
  {
    accessorKey: 'status',
    header: '状态'
  },

  {
    accessorKey: 'note',
    header: '备注'
  },
  {
    accessorKey: 'createTime',
    header: '创建时间',
    cell: (data) => new Date(data.row.original.createTime).toLocaleString()
  },
  {
    accessorKey: 'action',
    header: '操作',
    cell: (data) => {
      return (
        <>
          <ConfirmAlert
            title={`确认取消预订吗`}
            onConfirm={async () => {
              await unbindBooking(data.row.original.id)
              mutate()
            }}
          >
            <Button variant="link" size="sm" disabled={data.row.original.status !== '申请中'}>
              取消预订
            </Button>
          </ConfirmAlert>
        </>
      )
    }
  }
]
