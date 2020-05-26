import { IsArray, IsEmail, IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../entity/user.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { v4 as uuidv4 } from 'uuid';
import { ProfileDto } from './profile.dto';

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

  @ApiModelProperty({ required: false })
  @IsEmail()
  email: string;

  @ApiModelProperty({ required: false })
  @IsArray()
  roles: string[];

  @ApiModelProperty({ required: false })
  @IsString()
  refreshToken: string;

  @ApiModelProperty({ required: false })
  profile: ProfileDto;

  public static from(dto: Partial<UserDto>) {
    const it = new UserDto();
    it.id = dto.id;
    it.username = dto.username;
    it.password = dto.password;
    it.email = dto.email ? dto.email : `${dto.username}@gmail.com`;
    it.roles = dto.roles;
    it.profile = dto.profile ? dto.profile : null;
    return it;
  }

  public static fromEntity(entity: UserEntity) {
    return this.from({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      roles: entity.roles,
      profile: entity.profile ? ProfileDto.fromEntity(entity.profile) : null,
    });
  }

  public toEntity(user: UserEntity = null, roles: string[] = null) {
    const it = new UserEntity();
    it.id = this.id;
    it.username = this.username;
    it.password = this.password;
    it.email = this.email;
    it.profile = this.profile ? this.profile.toEntity() : null;
    it.roles = this.roles ? this.roles : roles ? roles : ['GUEST'];
    it.createdTime = new Date();
    it.createdBy = user ? user.id : uuidv4();
    it.updatedBy = user ? user.id : uuidv4();
    return it;
  }
}
