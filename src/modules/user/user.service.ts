import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import { isValidObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

import { encryptPassword } from '@libs/utils';

import { UserCreateDto } from './dtos/user.create.dto';
import { UserUpdateDto } from './dtos/user.update.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserEntity)
		private readonly userModel: ReturnModelType<typeof UserEntity>,
	) {}

	async create({ firstName, lastName, email, password, phoneNumber, role, avatar }: UserCreateDto) {
		const users = await this.userModel.find({ $or: [{ email }, { phoneNumber }] }).lean();
		const isExistByEmail = users.some((user) => user.email === email);
		const isExistByPhoneNumber = users.some((user) => user.phoneNumber === phoneNumber);

		if (isExistByEmail) throw new ConflictException('Email already exists');
		if (isExistByPhoneNumber) throw new ConflictException('Phone number already exists');

		const encryptedPassword = password ? await encryptPassword(password) : null;
		const createUserModel = new this.userModel({
			firstName,
			lastName,
			email,
			password: encryptedPassword,
			phoneNumber,
			role,
			avatar,
		});

		const user = (await createUserModel.save()).toJSON();
		return omit(user, ['password']);
	}

	async update(
		id: string,
		{ firstName, lastName, email, phoneNumber, avatar, role }: UserUpdateDto,
	) {
		if (!isValidObjectId(id)) throw new BadRequestException('User ID is invalid');

		const users = await this.userModel
			.find({ _id: { $ne: id }, $or: [{ email }, { phoneNumber }] })
			.lean();
		const isExistByEmail = users.some((user) => user.email === email);
		const isExistByPhoneNumber = users.some((user) => user.phoneNumber === phoneNumber);

		if (isExistByEmail) throw new ConflictException('Email already exists');
		if (isExistByPhoneNumber) throw new ConflictException('Phone number already exists');

		return this.userModel
			.findByIdAndUpdate(
				id,
				{ firstName, lastName, email, phoneNumber, avatar, role },
				{ new: true },
			)
			.lean();
	}

	async findOneByEmail(email: string) {
		return this.userModel.findOne({ email }).lean();
	}

	async findPasswordById(id: string) {
		const user = await this.userModel.findById(id).select('password').lean();
		return user.password;
	}
}
