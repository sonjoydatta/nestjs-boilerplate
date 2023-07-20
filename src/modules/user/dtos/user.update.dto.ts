import { OmitType, PartialType } from '@nestjs/swagger';

import { UserCreateDto } from './user.create.dto';

export class UserUpdateDto extends PartialType(OmitType(UserCreateDto, ['password'])) {}
