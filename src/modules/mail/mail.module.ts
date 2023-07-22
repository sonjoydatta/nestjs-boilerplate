import { join } from 'path';
import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailModuleAsyncOptions } from './mail.interface';
import { MailService } from './mail.service';

const templatePath = join(__dirname, 'modules/mail/templates');

@Module({})
export class MailModule {
	static forRootAsync(options: MailModuleAsyncOptions): DynamicModule {
		const { isGlobal, useFactory, inject } = options;

		return {
			module: MailModule,
			global: isGlobal,
			imports: [
				MailerModule.forRootAsync({
					useFactory: async (...args: any[]) => {
						const { transport, from } = await useFactory(...args);

						return {
							transport,
							defaults: { from: `"No Reply" <${from}>` },
							template: {
								dir: templatePath,
								adapter: new HandlebarsAdapter(),
								options: { strict: true },
							},
						};
					},
					inject,
				}),
			],
			providers: [MailService],
			exports: [MailService],
		};
	}
}
