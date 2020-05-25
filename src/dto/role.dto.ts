import { IsString, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { v4 as uuidv4 } from 'uuid';
import { RoleEntity } from '../entity/role.entity';

export class RoleDto implements Readonly<RoleDto> {

  @ApiModelProperty({ required: false })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  name: string;

  @ApiModelProperty({ required: true })
  @IsString()
  code: string;

  public static from(dto: Partial<RoleDto>) {
    const it = new RoleDto();
    it.id = dto.id;
    it.name = dto.name;
    it.code = dto.code;
    return it;
  }

  public static fromEntity(entity: RoleEntity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      code: entity.code,
    });
  }

  public toEntity(role: RoleEntity = null) {
    const it = new RoleEntity();
    it.id = this.id;
    it.name = this.name;
    it.code = this.code;
    it.createdTime = new Date();
    it.createdBy = role ? role.id : uuidv4();
    it.updatedBy = role ? role.id : uuidv4();
    return it;
  }
}
