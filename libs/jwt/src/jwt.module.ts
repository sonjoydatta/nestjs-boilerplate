import { DynamicModule, Global, Module } from '@nestjs/common';

import { JwtModuleAsyncOptions } from './jwt.interface';
import { JWTConfig, JwtService } from './jwt.service';

@Global()
@Module({})
export class JwtModule {
	static forFeatureAsync(options: JwtModuleAsyncOptions): DynamicModule {
		const { inject, useFactory } = options;

		return {
			module: JwtModule,
			providers: [
				{
					provide: JWTConfig,
					useFactory,
					inject,
				},
				JwtService,
			],
			exports: [JwtService],
		};
	}
}
