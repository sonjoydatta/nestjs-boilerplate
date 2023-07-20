import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationDto {
	@ApiProperty({
		example: faker.number.int(),
		required: false,
	})
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly page: number;

	@ApiProperty({
		example: faker.number.int(),
		required: false,
	})
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly limit: number;
}
