import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const hashingData = async (data: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const result: unknown = await bcrypt.hash(data, saltRounds);

    if (typeof result !== 'string') {
      throw new Error('Bcrypt hash returned unexpected type');
    }

    return result;
  } catch (_error) {
    throw new InternalServerErrorException('Bcrypt hashing data failed');
  }
};

export const compareData = async (plain: string, hash: string): Promise<boolean> => {
  try {
    console.log(plain, hash);

    return await bcrypt.compare(plain, hash);
  } catch (err) {
    throw new InternalServerErrorException('Password verification failed');
  }
};
