import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FC, memo, useCallback, useRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Separator } from '../ui/separator'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getUpdateInfoCaptcha } from '@/service/user'
import Captcha from '../captcha'

export interface IUpdatePasswordProps extends DialogPrimitive.DialogProps {
  onSuccess?: () => void
}

const formSchema = z.object({
  headPic: z.optional(z.string()),
  nickName: z.optional(z.string()),
  email: z
    .string({
      required_error: '邮箱不能为空'
    })
    .email({
      message: '邮箱格式不正确'
    }),
  captcha: z.string({
    required_error: '验证码不能为空'
  })
})

const UpdateInfo: FC<IUpdatePasswordProps> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headPic: '',
      nickName: '',
      email: ''
    }
  })

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    console.log('🚀 ~ file: index.tsx ~ line 45 ~ onSubmit ~ values', values)
  }, [])

  const uploadAvatarRef = useRef<HTMLInputElement>(null)
  const selectFile = useCallback(() => {
    uploadAvatarRef.current?.click()
  }, [])

  const beforeSend = useCallback(async () => {
    const isValid = await form.trigger('email')
    if (!isValid) return Promise.reject()
    return undefined
  }, [form])
  const getCaptcha = useCallback(async () => await getUpdateInfoCaptcha(), [])

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>个人信息</DialogTitle>
          <DialogDescription>这里是有关于你个人的账户信息</DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-2">
                <FormField
                  control={form.control}
                  name="headPic"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col items-center">
                        <Avatar className="w-20 h-20">
                          <AvatarImage
                            src={field.value || 'https://avatars.githubusercontent.com/u/70053309?v=4'}
                            alt="@faiz-gear"
                          />
                          <AvatarFallback>头像</AvatarFallback>
                        </Avatar>
                        <FormControl>
                          <Input
                            {...field}
                            ref={uploadAvatarRef}
                            placeholder="头像"
                            type="file"
                            className="hidden"
                            onClick={(e) => {
                              console.log('click')
                              e.preventDefault()
                            }}
                          />
                        </FormControl>
                        <div className="flex justify-center">
                          <Button variant="link" onClick={selectFile}>
                            上传头像
                          </Button>
                          <Button variant="link" className="text-destructive" onClick={selectFile}>
                            删除头像
                          </Button>
                        </div>
                      </div>
                      <FormDescription className="text-center">上传一张清晰的jpg或png作为头像吧~</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid  items-center gap-4">
                <FormField
                  control={form.control}
                  name="nickName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>昵称</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="昵称" />
                      </FormControl>
                      <FormDescription>设置一个独一无二的昵称~</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid  items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮箱</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="邮箱" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid  items-center gap-4">
                <Captcha control={form.control} fieldName="captcha" beforeSend={beforeSend} getCaptcha={getCaptcha} />
              </div>
            </div>
            <DialogFooter className="flex !justify-center">
              <Button type="submit" className="w-full">
                保存修改
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

UpdateInfo.displayName = 'UpdateInfo'

export default memo(UpdateInfo)
