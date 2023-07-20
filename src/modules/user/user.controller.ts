import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserUpdateDto } from './dtos/user.update.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth('bearer')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Create new user - (ADMIN)' })
	@UseGuards(RoleGuard)
	@Roles('ADMIN')
	@Post()
	async create(@Body() payload: UserCreateDto) {
		return this.userService.create(payload);
	}

	@ApiOperation({ summary: 'Update user by id - (ADMIN)' })
	@UseGuards(RoleGuard)
	@Roles('ADMIN')
	@Patch(':id')
	async update(@Param('id') id: string, @Body() payload: UserUpdateDto) {
		return this.userService.update(id, payload);
	}
}
