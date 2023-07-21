import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configSwagger = (app: INestApplication) => {
	const options = new DocumentBuilder()
		.setTitle('NestJS Boilerplate')
		.setDescription('NestJS Boilerplate API Documentation')
		.setVersion('1.0')
		.addBearerAuth({
			description: 'Client JWT Token',
			type: 'http',
			name: 'Authorization',
			bearerFormat: 'JWT',
		})
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('/', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
			syntaxHighlight: {
				activate: true,
				theme: 'obsidian',
			},
			docExpansion: 'none',
			displayRequestDuration: true,
			defaultModelExpandDepth: 8,
			defaultModelsExpandDepth: 8,
		},
		customSiteTitle: 'NestJS Boilerplate API Documentation',
	});
};
