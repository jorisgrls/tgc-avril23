import db, { clearDB } from './db';
import { Category } from './entities/category';
import { Tag } from './entities/tag';
import { Ad } from './entities/ad';
import { User, UserRole, hashPassword } from './entities/user';

export default async function main() {
  await db.initialize();
  await clearDB();
  await db.synchronize();

  const informatique = await Category.create({ name: 'informatique' }).save();
  const sport = await Category.create({ name: 'sport' }).save();
  const automobile = await Category.create({ name: 'automobile' }).save();

  const tag1 = await Tag.create({ name: 'tag1' }).save();
  const tag2 = await Tag.create({ name: 'tag2' }).save();
  const tag3 = await Tag.create({ name: 'tag3' }).save();

  const user1 = await User.create({
    email: 'user@test.com',
    nickname: 'user1',
    hashedPassword: await hashPassword('password'),
    avatar:
      'https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg',
  }).save();

  const admin1 = await User.create({
    email: 'admin@test.com',
    nickname: 'admin1',
    hashedPassword: await hashPassword('password'),
    avatar:
      'https://www.shutterstock.com/image-vector/user-icon-vector-600nw-393536320.jpg',
    role: UserRole.ADMIN,
  }).save();

  await Ad.create({
    title: 'Ferrari',
    description: 'description1',
    price: 80000,
    category: automobile,
    tags: [tag1, tag2],
    picture:
      'https://img.leboncoin.fr/api/v1/lbcpb1/images/93/1a/c5/931ac53fb1e84de07b5e6d3993b7498634381c77.jpg?rule=ad-large',
    location: 'Paris',
    owner: user1,
  }).save();

  await Ad.create({
    title: 'Macbook Pro',
    description: 'description1',
    price: 899,
    category: informatique,
    tags: [tag2],
    picture:
      'https://img.leboncoin.fr/api/v1/lbcpb1/images/17/d5/97/17d5972da614683f6d51f38e91ead0365a78b97d.jpg?rule=classified-1200x800-webp',
    location: 'Nantes',
    owner: admin1,
  }).save();

  await Ad.create({
    title: 'Trampoline',
    description: 'description2',
    price: 800,
    category: sport,
    tags: [tag1, tag2, tag3],
    picture:
      'https://img.leboncoin.fr/api/v1/lbcpb1/images/40/be/0f/40be0f14514235010864ebf29537ac358156f509.jpg?rule=classified-1200x800-webp',
    location: 'Bordeaux',
    owner: user1,
  }).save();

  await Ad.create({
    title: 'Renault Laguna (pour pièces)',
    description: 'description1',
    price: 699,
    category: automobile,
    tags: [tag1, tag2],
    picture:
      'https://img.leboncoin.fr/api/v1/lbcpb1/images/03/06/27/030627c1c7027065be1a74aa0306bde282545e5e.jpg?rule=ad-large',
    location: 'Paris',
    owner: user1,
  }).save();

  await Ad.create({
    title: 'Clavier',
    description: 'description1',
    price: 7.6,
    category: informatique,
    tags: [tag2],
    picture:
      'https://img.leboncoin.fr/api/v1/lbcpb1/images/e7/d7/aa/e7d7aa86810bebbc2343820c060d141f9f0e43a0.jpg?rule=ad-large',
    location: 'Roubaix',
    owner: admin1,
  }).save();

  await Ad.create({
    title: 'Ballon de football (en or)',
    description: 'description2',
    price: 800,
    category: sport,
    tags: [tag1, tag2, tag3],
    picture:
      'https://img.leboncoin.fr/api/v1/lbcpb1/images/14/0f/5c/140f5cb711e31bf8641c020e96c24568e65a0c4e.jpg?rule=ad-large',
    location: 'Toulon',
    owner: user1,
  }).save();

  await db.destroy();
  console.log('done !');
}

main();
