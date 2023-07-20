import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { GlobalExceptionFilter, GlobalResponseTransformer } from '@libs/utils';

import { AppModule } from './app.module';
import { configSwagger } from './swagger';

async function bootstrap() {
	const logger = new Logger('Startup');

	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors();

	// app.setGlobalPrefix('api/v1');
	configSwagger(app);

	app.disable('x-powered-by');

	const validationPipe = new ValidationPipe({
		whitelist: true,
		stopAtFirstError: true,
		transform: true,
	});

	app.useGlobalPipes(validationPipe);
	app.useGlobalFilters(new GlobalExceptionFilter());
	app.useGlobalInterceptors(new GlobalResponseTransformer());

	const configService = app.get<ConfigService>(ConfigService);
	const port = configService.get<string>('app.port');

	await app.listen(port);
	logger.log(`App started on http://localhost:${port}`);
}
bootstrap();
