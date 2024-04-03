import { memo, useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { IUserPaginationParams, useUserList } from '@/service/hooks/useUserList'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { IPaginationParams } from '@/service/type'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

type SearchParams = Omit<IUserPaginationParams, keyof IPaginationParams>

function User() {
  const [params, setParams] = useState<SearchParams>({
    username: '',
    nickName: '',
    email: ''
  })
  const { userList } = useUserList({
    pageNo: 1,
    pageSize: 10,
    ...params
  })

  const form = useForm<SearchParams>({
    defaultValues: params
  })

  const submit = () => {
    const values = form.getValues()
    setParams(values)
  }

  return (
    <div className="container mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="flex gap-4 py-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="请输入用户名" className="w-auto" {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="请输入昵称" className="w-auto" {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="请输入邮箱" className="w-auto" {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                </FormItem>
              )}
            />

            <Button type="submit" variant="outline">
              搜索
            </Button>
          </div>
        </form>
      </Form>
      <DataTable columns={columns} data={userList?.users || []} />
    </div>
  )
}

export default memo(User)
