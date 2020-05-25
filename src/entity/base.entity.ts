import {
  Column,
  UpdateDateColumn,
  CreateDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'boolean', default: false })
  archived: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date;

  @Column({ type: 'varchar', length: 300})
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedTime: Date;

  @Column({ type: 'varchar', length: 300})
  updatedBy: string;

}
