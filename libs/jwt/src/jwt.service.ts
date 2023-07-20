import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtConfig, JwtPayload, JwtVerifyResult } from './jwt.interface';

export enum TokenTypeEnum {
	ACCESS = 'access',
	REFRESH = 'refresh',
	CONFIRMATION = 'confirmation',
	RESET_PASSWORD = 'resetPassword',
}

export class JWTConfig implements JwtConfig {
	access: { secret: string; expiresIn: string };
	confirmation: { secret: string; expiresIn: string };
	resetPassword: { secret: string; expiresIn: string };
	refresh: { secret: string; expiresIn: string };
}

@Injectable()
export class JwtService {
	constructor(private readonly config: JWTConfig) {}

	async sign(payload: JwtPayload, tokenType: TokenTypeEnum) {
		const { secret, expiresIn } = this.config[tokenType];

		return new Promise<string>((resolve, reject) => {
			jwt.sign({ ...payload, tokenType }, secret, { expiresIn }, (err, token) => {
				if (err || !token) return reject(err);
				return resolve(token);
			});
		});
	}

	async verify(token: string, tokenType: TokenTypeEnum) {
		const { secret } = this.config[tokenType];

		return new Promise<JwtVerifyResult>((resolve, reject) => {
			jwt.verify(token, secret, (err, decoded) => {
				if (err || !decoded) return reject(err);
				return resolve(decoded as JwtVerifyResult);
			});
		});
	}
}
