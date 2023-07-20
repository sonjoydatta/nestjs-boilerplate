import { HttpException } from '@nestjs/common';

export const wsErrorParser = (error: any, message = 'Something went wrong') => {
	if (error instanceof HttpException) {
		const response = error.getResponse() as { message?: any };
		return response?.message || message;
	}

	return message;
};
