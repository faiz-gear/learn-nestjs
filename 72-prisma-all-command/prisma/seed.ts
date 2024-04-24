import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query'
    }
  ]
})

// 初始化数据
async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'faiz',
      email: 'faiz@11.com',
      posts: {
        create: [
          {
            title: 'post1',
            content: 'post1 content'
          },
          {
            title: 'post2',
            content: 'post1 content'
          }
        ]
      }
    }
  })
  console.log(user)
}

main()
