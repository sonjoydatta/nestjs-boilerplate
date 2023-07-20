import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [TypegooseModule.forFeature([UserEntity])],
	controllers: [AuthController],
	providers: [AuthService, UserService],
})
export class AuthModule {}
