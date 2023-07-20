import { registerAs } from '@nestjs/config';

import { AppConfig } from './config.type';

export default registerAs<AppConfig>('app', () => ({
	env: process.env.NODE_ENV,
	port: process.env.APP_PORT,
	mongoURL: process.env.MONGO_URL,
}));
