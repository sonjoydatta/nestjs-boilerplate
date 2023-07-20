import { OmitType } from '@nestjs/swagger';

import { UserCreateDto } from '../../user/dtos/user.create.dto';

export class AuthRegisterDto extends OmitType(UserCreateDto, ['role']) {}
