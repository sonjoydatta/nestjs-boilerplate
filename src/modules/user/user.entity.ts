import { DefaultModelOptions, OptionalProp, RequiredProp } from '@libs/utils';

import { UserRoleEnum } from '../../common/enums';

@DefaultModelOptions('users')
export class UserEntity {
	@RequiredProp({ index: true })
	firstName: string;

	@RequiredProp({ index: true })
	lastName: string;

	@RequiredProp({ index: true, unique: true })
	email: string;

	@OptionalProp(null, { select: false })
	password?: string;

	@OptionalProp(null, { index: true })
	phoneNumber?: string;

	@RequiredProp({ index: true, enum: UserRoleEnum, type: String })
	role: UserRoleEnum;

	@OptionalProp(null)
	avatar?: string;

	@OptionalProp(false)
	isEmailVerified?: boolean;
}
