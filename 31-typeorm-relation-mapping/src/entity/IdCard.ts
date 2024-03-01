import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50,
    comment: '身份证号码'
  })
  cardName: string

  @JoinColumn() // 用于指定关联的字段
  @OneToOne(() => User, {
    onDelete: 'CASCADE', // 指定级联删除，主表User删除时，从表IdCard也删除
    onUpdate: 'CASCADE', // 指定级联更新，主表User更新时，从表IdCard也更新
    cascade: true // 这里用来设置，是否在操作实体时，级联操作关联的实体。比如，manager.save保存IdCard时，是否级联保存User
  }) // 用于指定关联的实体
  user: User
}
