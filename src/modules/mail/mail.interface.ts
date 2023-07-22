import { UserRoleEnum } from '../../common/enums';
import { MailConfig } from '../../config/config.type';

export interface RegisterConfirmation {
	id: string;
	role: UserRoleEnum;
	name: string;
	email: string;
}

export interface MailModuleAsyncOptions {
	isGlobal?: boolean;
	useFactory?: (...args: any[]) => Promise<MailConfig> | MailConfig;
	inject?: any[];
}
