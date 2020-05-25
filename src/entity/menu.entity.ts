import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'menu' })
export class MenuEntity extends BaseEntity {

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string;

  @ManyToOne(type => MenuEntity, menu => menu.childs, {
    nullable: true,
  })
  parent: MenuEntity;

  @OneToMany(type => MenuEntity, menu => menu.parent)
  childs: Array<MenuEntity>;

}
