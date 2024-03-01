import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({
  name: 't_aaa'
})
export class Aaa {
  @PrimaryColumn({
    comment: '主键'
  })
  id: number

  @Column({
    comment: '列A',
    type: 'text',
    name: 'column_a'
  })
  columnA: string

  @Column({
    unique: true,
    nullable: false,
    length: 10,
    type: 'varchar',
    default: 'default'
  })
  columnB: string

  @Column({
    type: 'double'
  })
  columnC: number
}
