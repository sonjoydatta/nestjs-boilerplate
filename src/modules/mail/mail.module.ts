import { join } from 'path';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailService } from './mail.service';

const templateDir = join(__dirname, 'modules/mail/templates');

@Global()
@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				transport: configService.get('mail.transport'),
				defaults: {
					from: `"No Reply" <${configService.get('mail.from')}>`,
				},
				template: {
					dir: templateDir,
					adapter: new HandlebarsAdapter(),
					options: { strict: true },
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
