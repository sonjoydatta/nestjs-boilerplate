import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Type } from 'class-transformer';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	ValidateIf,
} from 'class-validator';

import { UserRoleEnum } from '../../../common/enums';

export class UserCreateDto {
	@ApiProperty({
		example: faker.person.firstName(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(50)
	@Type(() => String)
	readonly firstName: string;

	@ApiProperty({
		example: faker.person.lastName(),
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(50)
	@Type(() => String)
	readonly lastName: string;

	@ApiProperty({
		example: faker.internet.email(),
		required: true,
	})
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(100)
	@Type(() => String)
	readonly email: string;

	@ApiProperty({
		example: faker.internet.password(),
		required: true,
	})
	@IsNotEmpty()
	@MaxLength(50)
	readonly password: string;

	@ApiProperty({
		example: faker.phone.number('62812#########'),
		required: false,
	})
	@IsString()
	@IsOptional()
	@MinLength(10)
	@MaxLength(14)
	@ValidateIf((e) => e.phoneNumber !== '')
	@Type(() => String)
	readonly phoneNumber?: string;

	@ApiProperty({
		example: faker.helpers.arrayElement(Object.values(UserRoleEnum)),
		required: true,
	})
	@IsEnum(UserRoleEnum)
	@IsNotEmpty()
	@Type(() => String)
	readonly role: UserRoleEnum;

	@ApiProperty({
		example: faker.image.avatar(),
		required: false,
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	readonly avatar?: string;
}
