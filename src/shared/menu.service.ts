import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from '../entity/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {

  constructor(@InjectRepository(MenuEntity) private readonly repository: Repository<MenuEntity>) {
  }

  async doFind(): Promise<MenuEntity[]> {
    return await this.repository.find({ parent: null });
  }

}
