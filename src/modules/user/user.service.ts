import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import { isValidObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

import { encryptPassword } from '@libs/utils';

import { UserCreateWithPwdDto } from './dtos/user.create.dto';
import { UserUpdateDto } from './dtos/user.update.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserEntity)
		private readonly userModel: ReturnModelType<typeof UserEntity>,
	) {}

	async create({
		firstName,
		lastName,
		email,
		password,
		phoneNumber,
		role,
		avatar,
	}: UserCreateWithPwdDto) {
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

	async updateVerifiedEmail(id: string) {
		if (!isValidObjectId(id)) throw new BadRequestException('User ID is invalid');

		return this.userModel.findByIdAndUpdate(id, { isEmailVerified: true }, { new: true }).lean();
	}

	async findOneById(id: string) {
		if (!isValidObjectId(id)) throw new BadRequestException('User ID is invalid');

		const user = await this.userModel.findById(id).lean();
		if (!user) throw new BadRequestException('User not found');

		return user;
	}

	async findOneByEmail(email: string) {
		const user = await this.userModel.findOne({ email }).lean();
		if (!user) throw new BadRequestException('User not found');

		return user;
	}

	async findPasswordById(id: string) {
		if (!isValidObjectId(id)) throw new BadRequestException('User ID is invalid');

		const user = await this.userModel.findById(id).select('password').lean();
		if (!user) throw new BadRequestException('User not found');

		return user.password;
	}
}
