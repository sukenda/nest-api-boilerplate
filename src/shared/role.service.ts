import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

  constructor(@InjectRepository(RoleEntity) private readonly repository: Repository<RoleEntity>) {
  }

  async doFind(): Promise<RoleEntity[]> {
    return await this.repository.find({ active: true });
  }

  async doFindByCode(code: string): Promise<RoleEntity> {
    return await this.repository.findOne({
      code: code,
    });
  }

}
