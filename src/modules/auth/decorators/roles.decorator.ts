import { SetMetadata } from '@nestjs/common';

import { UserRoleEnum } from '../../../common/enums';

export const Roles = (...args: (keyof typeof UserRoleEnum)[]) => SetMetadata('roles', args);
