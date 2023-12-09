import * as bcrypt from 'bcrypt';
import * as randomstring from 'randomstring';

import { appConfig } from 'src/config';

export const hashResource = async (password: string) => {
  const saltOrRounds = Number(appConfig.jwt.saltOrRounds);
  return await bcrypt.hash(password, saltOrRounds);
};

export const compareResource = async (password: string, hashedResource: string) => {
  return await bcrypt.compare(password, hashedResource);
};

export const generatePassword = async () => {
  const password = randomstring.generate(7);
  const hashedPassword = await hashResource(password);

  return [password, hashedPassword];
};
