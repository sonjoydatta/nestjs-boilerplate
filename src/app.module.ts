import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

import { JwtModule } from '@libs/jwt';

import { getEnvPath } from './common/helper/env.helper';
import config from './config';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';

const envFilePath = getEnvPath(`${__dirname}/common/envs`);

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: config,
			envFilePath,
		}),

		JwtModule.forFeatureAsync({
			useFactory: async (configService: ConfigService) => configService.get('jwt'),
			inject: [ConfigService],
		}),

		TypegooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('app.mongoURL'),
			}),
			inject: [ConfigService],
		}),

		MailModule,
		AuthModule,
		UserModule,
	],
})
export class AppModule {}
