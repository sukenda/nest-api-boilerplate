import { IsString, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { v4 as uuidv4 } from 'uuid';
import { ProfileEntity } from '../entity/profile.entity';
import { UserDto } from './user.dto';
import { UserEntity } from '../entity/user.entity';

export class ProfileDto implements Readonly<ProfileDto> {

  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: false })
  @IsString()
  profileName: string;

  @ApiModelProperty({ required: true })
  @IsString()
  imageProfile: string;

  @ApiModelProperty({ required: false })
  @IsString()
  address: string;

  public static from(dto: Partial<ProfileDto>) {
    const it = new ProfileDto();
    it.id = dto.id;
    it.profileName = dto.profileName;
    it.imageProfile = dto.imageProfile;
    it.address = dto.address;
    return it;
  }

  public static fromEntity(entity: ProfileEntity) {
    return this.from({
      id: entity.id,
      profileName: entity.profileName,
      imageProfile: entity.imageProfile,
      address: entity.address,
    });
  }

  public toEntity(userEntity: UserEntity = null) {
    const it = new ProfileEntity();
    it.id = this.id;
    it.profileName = this.profileName;
    it.imageProfile = this.imageProfile;
    it.address = this.address;
    it.createdTime = new Date();
    it.createdBy = userEntity ? userEntity.id : uuidv4();
    it.updatedBy = userEntity ? userEntity.id : uuidv4();
    return it;
  }
}
