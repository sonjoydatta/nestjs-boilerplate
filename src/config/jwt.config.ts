import { registerAs } from '@nestjs/config';

import { JwtConfig } from '@libs/jwt';

export default registerAs<JwtConfig>('jwt', () => ({
	access: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
	},
	confirmation: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_CONFIRMATION_EXPIRES_IN,
	},
	resetPassword: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
	},
	refresh: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
	},
}));
