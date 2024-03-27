import { memo, useCallback, useState } from 'react'
import type { PropsWithChildren, FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { getRegisterCaptcha, register } from '@/service/register'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

interface IRegisterProps {}

const formSchema = z
  .object({
    username: z
      .string({
        required_error: '用户名不能为空'
      })
      .min(2, {
        message: '用户名长度必须大于2个字符'
      }),
    nickName: z
      .string({
        required_error: '昵称不能为空'
      })
      .min(2, {
        message: '昵称长度必须大于2个字符'
      }),
    password: z
      .string({
        required_error: '密码不能为空'
      })
      .min(6, '密码长度必须大于6个字符'),
    confirmPassword: z
      .string({
        required_error: '确认密码不能为空'
      })
      .min(6, '确认密码长度必须大于6个字符'),
    email: z
      .string({
        required_error: '邮箱不能为空'
      })
      .email('邮箱格式不正确'),
    captcha: z.string({
      required_error: '验证码不能为空'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次密码输入不一致',
    path: ['confirmPassword'] // 显示错误信息的字段
  })

const Register: FC<PropsWithChildren<IRegisterProps>> = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      nickName: '',
      password: '',
      confirmPassword: '',
      email: '',
      captcha: ''
    }
  })

  const [remainingTime, setRemainingTime] = useState(0)
  const sendCaptcha = useCallback(async () => {
    await form.trigger()
    if (form.formState.isValid === false) return
    const email = form.getValues('email')
    const res = await getRegisterCaptcha(email)
    if (res.data.code === 200 || res.data.code === 201) {
      toast({
        title: '验证码已发送'
      })

      let time = 60
      setRemainingTime(time)
      const timer = setInterval(() => {
        time--
        setRemainingTime(time)
        if (time === 0) {
          clearInterval(timer)
        }
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    } else {
      toast({
        title: '发送验证码失败',
        description: res.data.data,
        variant: 'destructive'
      })
    }
  }, [form, toast])

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      console.log(values)
      const res = await register(values)
      if (res.data.code === 200 || res.data.code === 201) {
        toast({
          title: '注册成功'
        })
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        toast({
          title: '注册失败',
          description: res.data.data,
          variant: 'destructive'
        })
      }
    },
    [toast, navigate]
  )

  return (
    <div className="flex items-center h-full">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">会议室预订系统-注册</CardTitle>
          <CardDescription>输入您的信息注册账号</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>用户名</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="nickName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>昵称</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>确认密码</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-[2] grid gap-2">
                    <FormField
                      control={form.control}
                      name="captcha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>验证码</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 flex items-end">
                    <Button type="button" disabled={remainingTime !== 0} onClick={sendCaptcha}>
                      {remainingTime === 0 ? '发送验证码' : `${remainingTime}秒后重新发送`}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  创建账号
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                已有账号？
                <a href="#" className="underline">
                  去登录
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default memo(Register)
