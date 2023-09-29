import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({
    type: 'bigint',
    readonly: true,
    name: 'user_id'
  })
  @Generated('increment')
  id: string

  /** An alias props to create_dt */
  @CreateDateColumn({
    name: 'create_dt'
  })
  createdAt: Date

  @Column({
    type: 'varchar',
    name: 'first_name',
    length: 25,
    nullable: false
  })
  firstName: string

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 25,
    nullable: false
  })
  lastName: string

  @Column({
    type: 'timestamp',
    nullable: false
  })
  birth: Date

  @Column({
    type: 'varchar',
    length: 1,
    nullable: false
  })
  gender: string

  @Column({
    type: 'varchar',
    name: 'idcard_id',
    length: 30
  })
  idcard: string

}
