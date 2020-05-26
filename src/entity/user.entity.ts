import { Entity, Column, BeforeInsert, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import * as bcrypt from 'bcrypt';
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column('varchar', { array: true })
  roles: string[];

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @OneToOne(type => ProfileEntity, profile => profile.user, { cascade: true, nullable: true })
  profile: ProfileEntity;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

}
