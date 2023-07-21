import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { JwtService, TokenTypeEnum } from '@libs/jwt';

import { UserRoleEnum } from '../../../common/enums';

interface IRequestUser {
	id: string;
	role: UserRoleEnum;
}

export interface IRequest extends Request {
	user?: IRequestUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const request: IRequest = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) throw new UnauthorizedException('You are not authorized');

		try {
			const { id, role } = (await this.jwtService.verify(
				token,
				TokenTypeEnum.ACCESS,
			)) as IRequestUser;
			request.user = { id, role };
		} catch {
			throw new UnauthorizedException('You are not authorized');
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
