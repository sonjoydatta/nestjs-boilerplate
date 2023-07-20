import { TokenTypeEnum } from './jwt.service';

export interface SingleJwt {
	secret: string;
	expiresIn: string;
}

export interface JwtConfig {
	access: SingleJwt;
	confirmation: SingleJwt;
	resetPassword: SingleJwt;
	refresh: SingleJwt;
}

export interface JwtPayload {
	id: string;
	role: string;
}

export interface JwtVerifyResult extends JwtPayload {
	tokenType: TokenTypeEnum;
}

export interface JwtModuleAsyncOptions {
	useFactory?: (...args: any[]) => Promise<JwtConfig> | JwtConfig;
	inject?: any[];
}
