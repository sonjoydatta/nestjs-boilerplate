import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRoleEnum } from '../../../common/enums';
import { IRequest } from './auth.guard';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<(keyof typeof UserRoleEnum)[]>('roles', context.getHandler());
		if (!roles) throw new BadRequestException('Your are not authorized to perform this action');

		try {
			const request: IRequest = context.switchToHttp().getRequest();
			const role = request?.user?.role;
			if (!role) throw new BadRequestException('Your are not authorized to perform this action');

			return this.matchRoles(roles, role);
		} catch (error) {
			throw new BadRequestException('Your are not authorized to perform this action');
		}
	}

	private matchRoles(roles: (keyof typeof UserRoleEnum)[], role: UserRoleEnum) {
		return roles.some((i) => UserRoleEnum[i] === role);
	}
}
