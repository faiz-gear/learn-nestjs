import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query'
    }
  ]
})

async function main() {
  /* ---------------------------------- 关联创建 ---------------------------------- */
  // await prisma.department.create({
  //   data: {
  //     name: '技术部',
  //     employees: {
  //       // create: [
  //       //   {
  //       //     name: '张三',
  //       //     phone: '12345678901'
  //       //   },
  //       //   {
  //       //     name: '李四',
  //       //     phone: '12345678902'
  //       //   }
  //       // ]
  //       createMany: {
  //         data: [
  //           {
  //             name: '张三',
  //             phone: '12345678901'
  //           },
  //           {
  //             name: '李四',
  //             phone: '12345678902'
  //           }
  //         ]
  //       }
  //     }
  //   }
  // })
  /* ---------------------------------- 关联创建 ---------------------------------- */
  /* ---------------------------------- 关联查询 ---------------------------------- */
  // const department = await prisma.department.findUnique({
  //   where: {
  //     id: 1
  //   },
  //   include: {
  //     // 需要关联的字段
  //     employees: true
  //   }
  // })
  // const department = await prisma.department.findUnique({
  //   where: {
  //     id: 1
  //   },
  //   include: {
  //     // 需要关联的字段
  //     employees: {
  //       where: {
  //         name: '张三'
  //       },
  //       select: {
  //         id: true
  //       }
  //     }
  //   }
  // })
  // console.log('🚀 ~ file: index.ts ~ line 55 ~ main ~ department', department)
  // const employees = await prisma.department
  //   .findUnique({
  //     where: {
  //       id: 1
  //     }
  //   })
  //   .employees({
  //     select: {
  //       id: true,
  //       name: true
  //     }
  //   })
  // console.log('🚀 ~ file: index.ts ~ line 94 ~ main ~ employees', employees)
  /* ---------------------------------- 关联查询 ---------------------------------- */
  /* ---------------------------------- 关联更新 ---------------------------------- */
  // 更新并添加新员工
  // const department = await prisma.department.update({
  //   where: {
  //     id: 1
  //   },
  //   data: {
  //     name: '销售部',
  //     employees: {
  //       create: [
  //         {
  //           name: '小刘',
  //           phone: '13266666666'
  //         }
  //       ]
  //     }
  //   }
  // })
  // 更新部门并关联员工
  // const department = await prisma.department.update({
  //   where: {
  //     id: 1
  //   },
  //   data: {
  //     name: '销售部',
  //     employees: {
  //       connect: [
  //         {
  //           id: 6
  //         }
  //       ]
  //     }
  //   }
  // })
  // 存在就connect，不存在就create
  // const department = await prisma.department.update({
  //   where: {
  //     id: 1
  //   },
  //   data: {
  //     name: '销售部',
  //     employees: {
  //       connectOrCreate: {
  //         where: {
  //           id: 7
  //         },
  //         create: {
  //           name: '小王',
  //           phone: '13266666666'
  //         }
  //       }
  //     }
  //   }
  // })
  // console.log('🚀 ~ file: index.ts ~ line 104 ~ main ~ department', department)
  /* ---------------------------------- 关联更新 ---------------------------------- */
  /* ---------------------------------- 关联更新 ---------------------------------- */
  // await prisma.employee.deleteMany({
  //   where: {
  //     department: {
  //       id: 1
  //     }
  //   }
  // })
  /* ---------------------------------- 关联更新 ---------------------------------- */
}

main()
