import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
	imports: [TypegooseModule.forFeature([UserEntity])],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
