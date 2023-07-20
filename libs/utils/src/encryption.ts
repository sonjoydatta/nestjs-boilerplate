import * as bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);
