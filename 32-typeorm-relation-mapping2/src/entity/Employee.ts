import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { Department } from './Department'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50
  })
  name: string

  @JoinColumn({
    name: 'department_id'
  }) // 用于指定外键字段名
  @ManyToOne(() => Department, {
    // cascade: true
  })
  department: Department
}
