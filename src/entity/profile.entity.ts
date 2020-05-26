import { Entity, Column, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity {

  @OneToOne(type => UserEntity, user => user.profile, { lazy: true })
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'varchar', length: 255 })
  profileName: string;

  @Column({ type: 'varchar', length: 255 })
  imageProfile: string;

  @Column({ type: 'text' })
  address: string;

}
