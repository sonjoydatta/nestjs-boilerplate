import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
	@ApiProperty({
		example: faker.internet.email(),
		required: true,
	})
	@IsEmail()
	@IsNotEmpty()
	@Type(() => String)
	readonly email: string;

	@ApiProperty({
		description: 'string password',
		example: faker.internet.password(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	readonly password: string;
}
