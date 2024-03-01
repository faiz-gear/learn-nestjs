import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { IdCard } from './IdCard'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age: number

  // 关联IdCard实体，由于是IdCard设置了外键，所以这里不需要设置外键字段, 需要传第二个函数，指定外键是从表的哪个字段， 这样才能在没有外键的一方（User），查询到另一方（IdCard）
  @OneToOne(() => IdCard, (idCard) => idCard.user)
  idCard: IdCard
}
