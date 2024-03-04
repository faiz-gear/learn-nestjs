import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Article } from './Article'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  name: string

  @ManyToMany(() => Article, (article) => article.tags) // 用于指定多对多关系, 需要指定外键列在哪，这样才能根据外键列的值来查询当前tag的articles
  articles: Article[]
}
