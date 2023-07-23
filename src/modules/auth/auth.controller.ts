import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dtos/auth.register.dto';
import { AuthSignInDto } from './dtos/auth.signin.dto';
import { AuthVerifyEmailDto } from './dtos/auth.verify-email.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register new user' })
	@Post('register')
	async register(@Body() payload: AuthRegisterDto) {
		return this.authService.register(payload);
	}

	@ApiOperation({ summary: 'Sign in user' })
	@Post('signin')
	async signIn(@Body() payload: AuthSignInDto) {
		return this.authService.signIn(payload);
	}

	@ApiOperation({ summary: 'Verify user email' })
	@Post('verify-email')
	async verifyEmail(@Body() payload: AuthVerifyEmailDto) {
		return this.authService.verifyEmail(payload);
	}
}
