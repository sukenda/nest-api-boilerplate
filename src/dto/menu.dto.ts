import { IsString, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { v4 as uuidv4 } from 'uuid';
import { MenuEntity } from '../entity/menu.entity';

export class MenuDto implements Readonly<MenuDto> {

  @ApiModelProperty({ required: false })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  name: string;

  @ApiModelProperty({ required: true })
  @IsString()
  url: string;

  @ApiModelProperty({ required: false })
  @IsString()
  icon: string;

  public static from(dto: Partial<MenuDto>) {
    const it = new MenuDto();
    it.id = dto.id;
    it.name = dto.name;
    it.url = dto.url;
    return it;
  }

  public static fromEntity(entity: MenuEntity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      url: entity.url,
    });
  }

  public toEntity(menu: MenuEntity = null) {
    const it = new MenuEntity();
    it.id = this.id;
    it.name = this.name;
    it.url = this.url;
    it.createdTime = new Date();
    it.createdBy = menu ? menu.id : uuidv4();
    it.updatedBy = menu ? menu.id : uuidv4();
    return it;
  }
}
