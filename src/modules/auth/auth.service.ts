import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtPayload, JwtService, TokenTypeEnum } from '@libs/jwt';
import { comparePassword } from '@libs/utils';

import { UserRoleEnum } from '../../common/enums';
import { UserService } from '../user/user.service';
import { AuthRegisterDto } from './dtos/auth.register.dto';
import { AuthSignInDto } from './dtos/auth.signin.dto';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

	async register(payload: AuthRegisterDto) {
		const user = await this.userService.create({ ...payload, role: UserRoleEnum.USER });

		const [accessToken, refreshToken] = await this.generateAuthTokens({
			id: user._id.toString(),
			role: user.role,
		});

		return { ...user, accessToken, refreshToken };
	}

	async signIn({ email, password }: AuthSignInDto) {
		const user = await this.userService.findOneByEmail(email);
		if (!user) throw new BadRequestException('Email or password is incorrect');

		const userId = user._id.toString();

		const hashPassword = await this.userService.findPasswordById(userId);
		const isPasswordMatch = await comparePassword(password, hashPassword);
		if (!isPasswordMatch) throw new BadRequestException('Email or password is incorrect');

		const [accessToken, refreshToken] = await this.generateAuthTokens({
			id: user._id.toString(),
			role: user.role,
		});

		return { ...user, accessToken, refreshToken };
	}

	private async generateAuthTokens(user: JwtPayload) {
		return Promise.all([
			this.jwtService.sign(user, TokenTypeEnum.ACCESS),
			this.jwtService.sign(user, TokenTypeEnum.REFRESH),
		]);
	}
}
