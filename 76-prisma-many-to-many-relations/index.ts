import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 创建文章并创建分类
  // const createCategory = await prisma.post.create({
  //   data: {
  //     title: 'How to be Bob',
  //     categories: {
  //       create: [
  //         {
  //           assignedBy: 'Bob',
  //           assignedAt: new Date(),
  //           category: {
  //             create: {
  //               name: 'New category'
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   }
  // })
  // console.log('🚀 ~ file: index.ts ~ line 23 ~ main ~ createCategory', createCategory)
  // 创建文章并关联已有分类
  // const assignCategories = await prisma.post.create({
  //   data: {
  //     title: 'How to be Bob1',
  //     categories: {
  //       create: [
  //         {
  //           assignedBy: 'Bob1',
  //           assignedAt: new Date(),
  //           category: {
  //             connect: {
  //               id: 9
  //             }
  //           }
  //         },
  //         {
  //           assignedBy: 'Bob1',
  //           assignedAt: new Date(),
  //           category: {
  //             connect: {
  //               id: 22
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   }
  // })
  // console.log('🚀 ~ file: index.ts ~ line 52 ~ main ~ assignCategories', assignCategories)
  // const assignCategories2 = await prisma.post.create({
  //   data: {
  //     title: 'How to be Bob2',
  //     categories: {
  //       create: [
  //         {
  //           assignedBy: 'Bob2',
  //           assignedAt: new Date(),
  //           category: {
  //             connectOrCreate: {
  //               where: {
  //                 id: 9
  //               },
  //               create: {
  //                 name: 'New category2',
  //                 id: 9
  //               }
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   }
  // })
  // console.log('🚀 ~ file: index.ts ~ line 80 ~ main ~ assignCategories2', assignCategories2)

  // 查询文章属于某个分类
  // const getPosts = await prisma.post.findMany({
  //   where: {
  //     categories: {
  //       some: {
  //         category: {
  //           name: 'New Category2'
  //         }
  //       }
  //     }
  //   }
  // })
  // console.log('🚀 ~ file: index.ts ~ line 91 ~ main ~ getPosts', getPosts)

  // 查询拥有某个文章的分类
  // const getAssignments = await prisma.category.findMany({
  //   where: {
  //     posts: {
  //       some: {
  //         assignedBy: 'Bob',
  //         post: {
  //           title: {
  //             contains: 'Cool stuff'
  //           }
  //         }
  //       }
  //     }
  //   }
  // })
  // console.log('🚀 ~ file: index.ts ~ line 108 ~ main ~ getAssignments', getAssignments)

  // 查询categoriesOnPosts
  const getAssignments = await prisma.categoriesOnPosts.findMany({
    where: {
      assignedBy: 'Bob',
      post: {
        id: {
          in: [9, 1, 10, 12, 22]
        }
      }
    }
  })
  console.log('🚀 ~ file: index.ts ~ line 121 ~ main ~ getAssignments', getAssignments)
}

main()
