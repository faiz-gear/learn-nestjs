import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Tag } from './Tag'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
    comment: '文章标题'
  })
  title: string

  @Column({
    type: 'text',
    comment: '文章内容'
  })
  content: string

  @JoinTable({
    name: 'article_tag'
  }) // 用于指定中间表名
  @ManyToMany(() => Tag, (tag) => tag.articles) // 用于指定多对多关系, 需要指定外键列在哪，这样才能根据外键列的值来查询当前article的tags
  tags: Tag[]
}
