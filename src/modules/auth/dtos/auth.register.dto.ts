import { OmitType } from '@nestjs/swagger';

import { UserCreateWithPwdDto } from '../../user/dtos/user.create.dto';

export class AuthRegisterDto extends OmitType(UserCreateWithPwdDto, ['role']) {}
