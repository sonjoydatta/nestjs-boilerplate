import { DynamicModule, Module } from '@nestjs/common';

import { JwtModuleAsyncOptions } from './jwt.interface';
import { JWTConfig, JwtService } from './jwt.service';

@Module({})
export class JwtModule {
	static forRootAsync(options: JwtModuleAsyncOptions): DynamicModule {
		const { isGlobal, useFactory, inject } = options;

		return {
			module: JwtModule,
			global: isGlobal,
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
