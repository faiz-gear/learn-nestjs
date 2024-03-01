import { In } from 'typeorm'
import { AppDataSource } from './data-source'
import { User } from './entity/User'

AppDataSource.initialize()
  .then(async () => {
    // console.log('Inserting a new user into the database...')
    // const user = new User()
    // user.firstName = 'Timber'
    // user.lastName = 'Saw'
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log('Saved a new user with id: ' + user.id)
    // console.log('Loading users from the database...')
    // const users = await AppDataSource.manager.find(User)
    // console.log('Loaded users: ', users)
    // console.log('Here you can setup and run express / fastify / any other framework.')
    // const user = new User()
    // user.id = 1 // 如果指定id，那么会更新id为1的记录
    // user.firstName = 'Lyle'
    // user.lastName = 'Lu'
    // user.age = 25
    // await AppDataSource.manager.save(user)
    /* ---------------------------------- 批量插入 ---------------------------------- */
    // await AppDataSource.manager.insert(User, [
    //   {
    //     firstName: 'Judy',
    //     lastName: 'James',
    //     age: 19
    //   },
    //   {
    //     firstName: 'Lyle',
    //     lastName: 'Lu',
    //     age: 19
    //   }
    // ])
    /* ---------------------------------- 批量插入 ---------------------------------- */
    /* ---------------------------------- 批量修改 ---------------------------------- */
    // save方法会先select查询，如果有记录则update，没有则insert
    // await AppDataSource.manager.save(User, [
    //   {
    //     id: 5,
    //     firstName: 'Judy',
    //     lastName: 'James',
    //     age: 18
    //   },
    //   {
    //     id: 6,
    //     firstName: 'Lyle',
    //     lastName: 'Lu',
    //     age: 19
    //   }
    // ])
    /* ---------------------------------- 批量修改 ---------------------------------- */
    /* ----------------------------------- 删除 ----------------------------------- */
    // await AppDataSource.manager.delete(User, 1)
    // await AppDataSource.manager.delete(User, [2, 3])
    // const user = new User()
    // user.id = 5
    // remove与delete的区别是，delete直接传id，remove传实体
    // await AppDataSource.manager.remove(User, [user])
    /* ----------------------------------- 删除 ----------------------------------- */
    /* ----------------------------------- 查询 ----------------------------------- */
    // const users = await AppDataSource.manager.find(User)
    // const users = await AppDataSource.manager.findBy(User, {
    //   age: 19
    // })
    // const [users, count] = await AppDataSource.manager.findAndCount(User)
    // const [users, count] = await AppDataSource.manager.findAndCountBy(User, {
    //   age: 19
    // })
    // const users = await AppDataSource.manager.findOne(User, {
    //   select: {
    //     firstName: true,
    //     age: true
    //   },
    //   where: {
    //     id: 6
    //   },
    //   order: {
    //     age: 'ASC'
    //   }
    // })
    // const users = await AppDataSource.manager.find(User, {
    //   select: {
    //     firstName: true,
    //     age: true
    //   },
    //   where: {
    //     id: In([5, 6])
    //   },
    //   order: {
    //     age: 'ASC'
    //   }
    // })
    // const users = await AppDataSource.manager.findOneBy(User, {
    //   id: 6
    // })
    // 没找到会抛出一个EntityNotFoundError
    // const users = await AppDataSource.manager.findOneOrFail(User, {
    //   where: {
    //     id: 111
    //   }
    // })
    /* ----------------------------------- 查询 ----------------------------------- */
    /* --------------------------------- 直接执行sql -------------------------------- */
    // const users = await AppDataSource.manager.query('SELECT * FROM user where age in(?, ?)', [18, 25])
    // 复杂sql使用query builder, 如多表查询join on
    // const queryBuilder = await AppDataSource.manager.createQueryBuilder(User, 'user')
    // const users = await queryBuilder
    //   .select('user.firstName', 'firstName')
    //   .addSelect('user.age', 'age')
    //   .where('user.id = :id', { id: 6 })
    //   .orderBy('user.age', 'ASC')
    //   .getRawMany()
    // console.log('🚀 ~ file: index.ts ~ line 71 ~ .then ~ users', users)
    /* --------------------------------- 直接执行sql -------------------------------- */
    /* ----------------------------------- 事务 ----------------------------------- */
    // await AppDataSource.manager.transaction(async (manager) => {
    //   await manager.save(User, {
    //     id: 4,
    //     firstName: 'eee',
    //     lastName: 'eee',
    //     age: 20
    //   })
    // })
    /* ----------------------------------- 事务 ----------------------------------- */

    /* -------------------------------- 省去多次传入实体类 ------------------------------- */
    const userManager = AppDataSource.manager.getRepository(User)
    const users = await userManager.find()
    console.log('🚀 ~ file: index.ts ~ line 132 ~ .then ~ users', users)
    /* -------------------------------- 省去多次传入实体类 ------------------------------- */
  })
  .catch((error) => console.log(error))
