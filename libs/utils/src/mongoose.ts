import { ModelOptions, Prop } from '@typegoose/typegoose';
import {
	ArrayPropOptions,
	BasePropOptions,
	ICustomOptions,
	MapPropOptions,
	PropOptionsForNumber,
	PropOptionsForString,
	VirtualOptions,
} from '@typegoose/typegoose/lib/types';
import mongoose from 'mongoose';

type Props =
	| BasePropOptions
	| ArrayPropOptions
	| MapPropOptions
	| PropOptionsForNumber
	| PropOptionsForString
	| VirtualOptions;
type PropParameters = Props & { required?: never };
type OptionalParameters = Props & { required?: never; default?: never };

type IModelOptions = {
	existingMongoose?: mongoose.Mongoose;
	schemaOptions?: Omit<mongoose.SchemaOptions, 'timestamps' | 'versionKey'>;
	existingConnection?: mongoose.Connection;
	options?: Omit<ICustomOptions, 'customName'>;
};

export const RequiredProp = (options: PropParameters = {}) => {
	return Prop({ ...options, required: true });
};
export const OptionalProp = (defaultValue: any, options: OptionalParameters = {}) => {
	return Prop({ required: false, default: defaultValue, ...options });
};

export const DefaultModelOptions = (
	collectionName: string,
	{ options, schemaOptions, ...rest }: IModelOptions = {},
) => {
	return ModelOptions({
		options: { customName: collectionName, ...options },
		schemaOptions: { timestamps: true, versionKey: false, ...schemaOptions },
		...rest,
	});
};
