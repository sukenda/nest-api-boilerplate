import { IsString, IsUUID } from 'class-validator';
import { User } from '../model/user.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDto implements Readonly<UserDto> {

  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  username: string;

  @ApiModelProperty({ required: true })
  @IsString()
  password: string;

  @ApiModelProperty({ required: true })
  @IsString()
  email: string;

  @ApiModelProperty({ required: true })
  @IsString()
  profileName: string;

  public static from(dto: Partial<UserDto>) {
    const it = new UserDto();
    it.id = dto.id;
    it.username = dto.username;
    it.password = dto.password;
    it.email = dto.email;
    it.profileName = dto.profileName;
    return it;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      username: entity.username,
      password: entity.password,
      email: entity.email,
      profileName: entity.profileName,
    });
  }

  public toEntity(user: User = null) {
    const it = new User();
    it.id = this.id;
    it.username = this.username;
    it.password = this.password;
    it.email = this.email;
    it.profileName = this.profileName;
    it.createDateTime = new Date();
    it.createdBy = user ? user.id : null;
    it.updatedBy = user ? user.id : null;
    return it;
  }
}
