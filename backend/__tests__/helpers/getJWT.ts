import jwt from 'jsonwebtoken';
import { User, hashPassword, UserRole } from '../../src/entities/user';
import env from '../../src/env';

export default async function () {
  const user1 = await User.create({
    email: 'johndoe@gmail.com',
    firstname: 'John',
    lastname: 'Doe',
    hashedPassword: await hashPassword('adminadmin'),
    role: UserRole.ADMIN,
  }).save();

  const JWT = await jwt.sign({ userId: user1.id }, env.JWT_PRIVATE_KEY);
  return { user1, JWT };
}
