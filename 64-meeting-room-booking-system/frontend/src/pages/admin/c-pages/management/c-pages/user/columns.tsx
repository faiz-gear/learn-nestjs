import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IUserItemVo, IUserListVo } from '@/service/hooks/useUserList'
import { freezeUser } from '@/service/user'
import { ColumnDef } from '@tanstack/react-table'
import cls from 'classnames'
import { ElementRef, useRef } from 'react'
import { KeyedMutator } from 'swr'

export const columns: (mutate: KeyedMutator<IUserListVo>) => ColumnDef<IUserItemVo>[] = (mutate) => [
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
  },
  {
    accessorKey: 'headPic',
    header: '头像',
    cell: (data) => (
      <Avatar>
        <AvatarImage src={data.row.original.headPic} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    )
  },
  {
    accessorKey: 'email',
    header: '邮箱'
  },
  {
    accessorKey: 'createTime',
    header: '注册时间',
    cell: (data) => new Date(data.row.original.createTime).toLocaleString()
  },
  {
    accessorKey: 'isFrozen',
    header: '状态',
    cell: (data) => (
      <Badge
        variant={data.row.original.isFrozen ? 'destructive' : 'default'}
        className={cls([data.row.original.isFrozen ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'])}
      >
        {data.row.original.isFrozen ? '已冻结' : '正常'}
      </Badge>
    )
  },
  {
    accessorKey: 'action',
    header: '操作',
    cell: (data) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const cancelRef = useRef<ElementRef<typeof AlertDialogCancel>>(null)
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">冻结</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认冻结用户{`-"${data.row.original.username}"`}吗</AlertDialogTitle>
              <AlertDialogDescription>这个操作将会冻结用户，用户将无法登录系统，确定要继续吗？</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel ref={cancelRef}>取消</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await freezeUser(data.row.original.id)
                  cancelRef.current?.click()
                  mutate()
                }}
              >
                确认
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }
  }
]
