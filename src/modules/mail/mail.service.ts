import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { JwtService, TokenTypeEnum } from '@libs/jwt';

import { RegisterConfirmation } from './mail.interface';

@Injectable()
export class MailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async sendRegisterConfirmation({ id, role, name, email }: RegisterConfirmation) {
		const token = await this.jwtService.sign({ id, role }, TokenTypeEnum.CONFIRMATION);

		const clientURL = this.configService.get('app.clientURL');
		const link = `${clientURL}/auth/confirmation/${token}`;

		this.mailerService.sendMail({
			to: email,
			subject: 'Confirm your email',
			template: './register_confirmation',
			context: { name, link },
		});
	}
}
