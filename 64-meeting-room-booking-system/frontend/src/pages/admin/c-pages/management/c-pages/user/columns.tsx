import { IUserItemVo } from '@/service/hooks/useUserList'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<IUserItemVo>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'username',
    header: '用户名'
  },
  {
    accessorKey: 'nickName',
    header: '昵称'
  }
]
