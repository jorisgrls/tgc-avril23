import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Recipe } from "./recipe";
import { UserProduct } from "./userProduct";
import { IsEmail, Length } from "class-validator";
import { hash, verify } from "argon2";

export enum UserRole {
  ADMIN = "ADMIN",
  VISITOR = "VISITOR",
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
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field()
  hashedPassword: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.VISITOR })
  @Field()
  role: UserRole;

  @OneToMany(() => Recipe, (recipe) => recipe.user, { cascade: true })
  @Field(() => [Recipe])
  recipes: Recipe[];

  @OneToMany(() => UserProduct, (userProduct) => userProduct.user, {
    cascade: true,
  })
  @Field(() => [UserProduct])
  userProducts: UserProduct[];
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
  @Length(3, 50)
  firstname: string;

  @Field()
  @Length(3, 50)
  lastname: string;
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
