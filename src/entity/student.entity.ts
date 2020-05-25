import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'student' })
export class StudentEntity extends BaseEntity {

  @Column({ type: 'varchar', length: 255, nullable: false })
  namaLengkap: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nomorIndukMahasiswa: string;

  @Column({ type: 'text' })
  alamat: string;

}
