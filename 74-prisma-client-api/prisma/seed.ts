import { PrismaClient } from '../generated/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query'
    }
  ]
})

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@gmail.com'
      },
      {
        name: 'Bob',
        email: 'bob@gmail.com'
      },
      {
        name: 'Charlie',
        email: 'charlie@gmail.com'
      },
      { name: 'Dave', email: 'dave@gmail.com' }
    ]
  })
}

main()
