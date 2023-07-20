import { registerAs } from '@nestjs/config';

import { MailConfig } from './config.type';

export default registerAs<MailConfig>('mail', () => ({
	transport: {
		host: process.env.MAIL_HOST,
		secure: process.env.MAIL_SECURE === 'true',
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD,
		},
	},
	from: process.env.MAIL_FROM,
}));
