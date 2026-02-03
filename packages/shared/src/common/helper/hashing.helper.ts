import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const hashingData = async (data: string): Promise<string> => {
  try {
    return await bcrypt.hash(data, SALT_ROUNDS)
  } catch {
    throw new Error('HASHING_FAILED')
  }
}

export const compareData = async (plain: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(plain, hash)
  } catch {
    throw new Error('COMPARE_FAILED')
  }
}
