import { UserRoleEnum } from '../../common/enums';

export interface RegisterConfirmation {
	id: string;
	role: UserRoleEnum;
	name: string;
	email: string;
}
