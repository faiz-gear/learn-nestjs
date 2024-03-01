import { AppDataSource } from './data-source'
import { IdCard } from './entity/IdCard'
import { User } from './entity/User'

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...')
    const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25

    const idCard = new IdCard()
    idCard.cardName = '123456789'
    idCard.user = user

    // await AppDataSource.manager.save(user) // IdCard中的user字段设置了级联保存，所以这里不需要再保存user
    // await AppDataSource.manager.save(idCard)
    // const Users = await AppDataSource.manager.find(User)

    /* ------------- relation配置实现 关联查询 ------------ */
    /**
     * Card_user`.`id`=`IdCard`.`userId`
🚀 ~ file: index.ts ~ line 21 ~ AppDataSource.initialize ~ users [
  IdCard {
    id: 1,
    cardName: '123456789',
    user: User { id: 1, firstName: 'Timber', lastName: 'Saw', age: 25 }
  }
]
     */
    // const idCards = await AppDataSource.manager.find(IdCard, {
    //   relations: {
    //     user: true // 这里设置了关联查询，会查询出IdCard关联的User
    //   }
    // })
    /* ------------- relation配置实现 关联查询 ------------ */

    /* ------------- Repository创建QueryBuilder， leftJoinAndSelect关联查询 ------------ */
    // const idCardsQb = AppDataSource.manager.getRepository(IdCard).createQueryBuilder('idCard')
    /**
     * SELECT `idCard`.`id` AS `idCard_id`, `idCard`.`cardName` AS `idCard_cardName`, `idCard`.`userId` AS `idCard_userId`, `user`.`id` AS `user_id`, `user`.`firstName` AS `user_firstName`, `user`.`lastName` AS `user_lastName`, `user`.`age` AS `user_age` FROM `id_card` `idCard` LEFT JOIN `user` `user` ON `user`.`id`=`idCard`.`userId`
     */
    // const idCards = await idCardsQb.leftJoinAndSelect('idCard.user', 'user').getMany()
    /* ------------- Repository创建QueryBuilder， leftJoinAndSelect关联查询 ------------ */

    /* ----------- EntityManager创建QueryBuilder， leftJoinAndSelect关联查询 ----------- */
    // const idCardsQb = AppDataSource.manager.createQueryBuilder(IdCard, 'idCard')
    // const idCards = await idCardsQb.leftJoinAndSelect('idCard.user', 'user').getMany()
    /* ----------- EntityManager创建QueryBuilder， leftJoinAndSelect关联查询 ----------- */

    // console.log('🚀 ~ file: index.ts ~ line 21 ~ AppDataSource.initialize ~ idCards', idCards)

    /* ------------------------------ user访问idCard ------------------------------ */
    const users = await AppDataSource.manager.find(User, {
      relations: {
        idCard: true
      }
    })
    console.log('🚀 ~ file: index.ts ~ line 60 ~ .then ~ users', users)
    /* ------------------------------ user访问idCard ------------------------------ */
  })
  .catch((error) => console.log(error))
