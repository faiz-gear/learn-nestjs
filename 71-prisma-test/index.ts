import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout', // Emit log to stdout
      level: 'query' // Log query
    }
  ]
})

async function main() {
  await prisma.user.create({
    data: {
      name: 'faiz',
      email: '111@qq.com'
    }
  })

  await prisma.user.create({
    data: {
      name: 'faiz',
      email: '222@qq.com'
    }
  })

  const allUsers = await prisma.user.findMany()

  console.log(allUsers)
}

async function main2() {
  const user = await prisma.user.create({
    data: {
      name: 'gear',
      email: '333@qq.com',
      posts: {
        create: [
          { title: 'post1', content: 'post1 content' },
          { title: 'post2', content: 'post2 content' }
        ]
      }
    }
  })

  console.log(user)
}

async function main3() {
  await prisma.post.update({
    where: {
      id: 2
    },
    data: {
      content: 'post2 content updated'
    }
  })
}

async function main4() {
  await prisma.post.delete({
    where: {
      id: 1
    }
  })
}

main4()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
