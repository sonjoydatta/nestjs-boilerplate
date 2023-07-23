import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthVerifyEmailDto {
	@ApiProperty({
		example: faker.string.alpha(217),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	readonly token: string;
}
