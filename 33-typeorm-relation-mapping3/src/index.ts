import { AppDataSource } from './data-source'
import { Article } from './entity/Article'
import { Tag } from './entity/Tag'

AppDataSource.initialize()
  .then(async () => {
    const a1 = new Article()
    a1.title = 'aaaa'
    a1.content = 'aaaaaaaaaa'

    const a2 = new Article()
    a2.title = 'bbbbbb'
    a2.content = 'bbbbbbbbbb'

    const t1 = new Tag()
    t1.name = 'ttt1111'

    const t2 = new Tag()
    t2.name = 'ttt2222'

    const t3 = new Tag()
    t3.name = 'ttt33333'

    a1.tags = [t1, t2]
    a2.tags = [t1, t2, t3]

    const entityManager = AppDataSource.manager

    await entityManager.save(t1)
    await entityManager.save(t2)
    await entityManager.save(t3)

    await entityManager.save(a1)
    await entityManager.save(a2)

    /* ----------------------------------- 查询 ----------------------------------- */
    // const articles = await entityManager.find(Article, {
    //   relations: {
    //     tags: true
    //   }
    // })

    // const articles = await entityManager
    //   .getRepository(Article)
    //   .createQueryBuilder('article')
    //   .leftJoinAndSelect('article.tags', 'tag')
    //   .getMany()

    // console.log('🚀 ~ file: index.ts ~ line 42 ~ .then ~ articles', articles)
    // console.log(
    //   '🚀 ~ file: index.ts ~ line 42 ~ .then ~ articles',
    //   articles.map((a) => a.tags)
    // )

    /* ----------------------------------- 查询 ----------------------------------- */

    /* ----------------------------------- 删除 ----------------------------------- */
    const article = await entityManager.findOne(Article, {
      where: {
        id: 2
      },
      relations: {
        tags: true
      }
    })
    article.title = 'ccccc'
    article.tags = article.tags.filter((t) => t.name.includes('ttt1111'))

    // await entityManager.save(article)

    // await entityManager.delete(Tag, 1)
    /* ----------------------------------- 删除 ----------------------------------- */

    const tags = await entityManager.find(Tag, {
      relations: {
        articles: true
      }
    })

    console.log(tags)
  })
  .catch((error) => console.log(error))
