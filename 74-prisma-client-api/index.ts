import { PrismaClient } from './generated/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query'
    }
  ]
})

async function main() {
  /* ------------------------------- findUnique: 寻找唯一数据，没有返回null ------------------------------- */
  // const user = await prisma.user.findUnique({
  //   where: {
  //     // findUnique需要传入唯一标识符
  //     // id: 1
  //     email: 'alice@gmail.com'
  //   },
  //   // 选择要返回的字段
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true
  //   }
  // })
  /* ------------------------------- findUnique ------------------------------- */

  /* ----------------------------- findUniqueOrThrow: 寻找唯一数据，没有抛出错误 ---------------------------- */
  // const user = await prisma.user.findUniqueOrThrow({
  //   where: {
  //     id: 10
  //   }
  // })
  /* ----------------------------- findUniqueOrThrow ---------------------------- */

  /* ------------------------ findMany: 寻找多个数据，没有返回空数组 ------------------------ */
  // const user = await prisma.user.findMany({
  //   where: {
  //     email: {
  //       contains: 'gmail'
  //     }
  //   },
  //   orderBy: {
  //     name: 'desc'
  //   },
  //   skip: 1,
  //   take: 2,
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true
  //   }
  // })
  /* ------------------------ findMany: 寻找多个数据，没有返回空数组 ------------------------ */
  /* ----------------------- findFirst: 寻找第一个数据，没有返回null ---------------------- */
  // const user = await prisma.user.findFirst({
  //   where: {
  //     email: {
  //       contains: 'gmail'
  //     }
  //   },
  //   orderBy: {
  //     name: 'desc'
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true
  //   }
  // })
  /* ----------------------- findFirst: 寻找第一个数据，没有返回null ---------------------- */

  /* ------------------------------ create: 创建数据 ------------------------------ */
  /* ------------------------------ update: 更新数据, 并返回更新后的结果 ------------------------------ */
  // const user = await prisma.user.update({
  //   where: {
  //     id: 3
  //     // email: {
  //     //   // 会报错，因为email不是唯一标识符， 使用updateMany就不需要唯一标识符
  //     //   contain: 'gmail'
  //     // }
  //   },
  //   data: {
  //     email: 'Bob@qq.com'
  //   }
  // })
  /* ------------------------------ update: 更新数据 ------------------------------ */

  /* ------------------------ upsert: update or insert ------------------------ */
  // const user = await prisma.user.upsert({
  //   where: { id: 11 },
  //   update: { email: 'yy@xx.com' },
  //   create: {
  //     id: 11,
  //     name: 'xxx',
  //     email: 'xxx@xx.com'
  //   }
  // })
  /* ------------------------ upsert: update or insert ------------------------ */

  /* ------------------------------ delete: 删除数据 ------------------------------ */
  /* --------------------------- deleteMany: 删除多个数据 --------------------------- */
  /* ----------------------------- count: 返回记录的数量 ----------------------------- */
  // const user = await prisma.user.count({
  //   where: {
  //     email: {
  //       contains: 'gmail'
  //     }
  //   }
  // })
  /* ----------------------------- count: 返回记录的数量 ----------------------------- */

  /* ----------------------------- aggregate: 统计数据 ---------------------------- */
  // const user = await prisma.user.aggregate({
  //   where: {
  //     email: {
  //       contains: 'gmail'
  //     }
  //   },
  //   _count: {
  //     // id: true,
  //     // email: true
  //     _all: true
  //   },
  //   _avg: {
  //     age: true
  //   },
  //   _sum: {
  //     age: true
  //   },
  //   _min: {
  //     age: true
  //   },
  //   _max: {
  //     age: true
  //   }
  // })
  /* ----------------------------- aggregate: 统计数据 ---------------------------- */

  /* ------------------------------- groupBy: 分组 ------------------------------ */
  const user = await prisma.user.groupBy({
    by: ['email'],
    _count: {
      _all: true
    },
    _sum: {
      age: true
    },
    having: {
      // 过滤条件
      age: {
        _avg: {
          gt: 20
        }
      }
    }
  })
  /* ------------------------------- groupBy: 分组 ------------------------------ */

  console.log('🚀 ~ file: index.ts ~ line 18 ~ main ~ user', user)
}

main()
