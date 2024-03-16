import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Length, IsEmail, IsUrl } from 'class-validator';
import { ObjectType, Field, Int, InputType } from 'type-graphql';
import { Ad } from './ad';
import { hash, verify } from 'argon2';

export enum UserRole {
  ADMIN = 'admin',
  VISITOR = 'visitor',
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  nickname: string;

  @Column({
    default:
      'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png',
  })
  @Field()
  avatar: string;

  @Column()
  hashedPassword: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.VISITOR })
  @Field()
  role: UserRole;

  @Field(() => [Ad])
  @OneToMany(() => Ad, (ad) => ad.owner)
  ads: Ad[];
}

@InputType()
export class NewUserInput {
  @Field()
  @IsEmail()
  @Length(3, 100)
  email: string;

  @Field()
  @Length(8, 50)
  password: string;

  @Field()
  @Length(3, 100)
  nickname: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @Length(3, 100)
  nickname: string;

  @Field({ nullable: true })
  @IsUrl()
  @Length(3, 255)
  avatar: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail()
  @Length(3, 100)
  email: string;

  @Field()
  @Length(8, 50)
  password: string;
}

export async function hashPassword(password: string) {
  return hash(password);
}

export async function verifyPassword(hashedPassword: string, password: string) {
  return verify(hashedPassword, password);
}
