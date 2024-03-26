import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Label } from '@/components/ui/label'
import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { login } from '@/service/login'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  username: z
    .string({
      required_error: '用户名不能为空'
    })
    .min(2, {
      message: '用户名长度必须大于2个字符'
    }),
  password: z
    .string({
      required_error: '密码不能为空'
    })
    .min(6, '密码长度必须大于6个字符')
})

const Login: FC = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const res = await login(values.username, values.password)

    if (res.data.code === 200 || res.data.code === 201) {
      toast({
        title: '登录成功'
      })
      navigate('/')
    } else {
      toast({
        title: '登录失败',
        description: res.data.data,
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="flex items-center h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">会议室预订系统</CardTitle>
          <CardDescription>输入你的账户密码登录到会议室预订系统</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  {/* <Label htmlFor="username">用户名</Label>
                  <Input id="username" type="username" placeholder="m@example.com" required /> */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户名</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  {/* <div className="flex items-center">
                    <Label htmlFor="password">密码</Label>
                    <a href="#" className="ml-auto inline-block text-sm underline">
                      忘记密码?
                    </a>
                  </div>
                  <Input id="password" type="password" required /> */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center">
                            <span>密码</span>
                            <a href="#" className="ml-auto inline-block text-sm underline">
                              忘记密码?
                            </a>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  登录
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              没有账号?
              <a href="#" className="underline" onClick={() => navigate('/register')}>
                注册
              </a>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
