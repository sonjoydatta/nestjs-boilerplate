import { JwtConfig } from '@libs/jwt';

export interface AppConfig {
	env: string;
	port: string;
	mongoURL: string;
}

export interface MailConfig {
	transport: {
		host: string;
		secure: boolean;
		auth: { user: string; pass: string };
	};
	from: string;
}

export type AllConfigType = {
	app: AppConfig;
	jwt: JwtConfig;
	mail: MailConfig;
};
