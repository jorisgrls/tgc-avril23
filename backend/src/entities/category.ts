import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';
import { ObjectType, Field, Int, InputType } from 'type-graphql';
import { Ad } from './ad';

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}

@InputType()
export class NewCategoryInput {
  @Field()
  @Length(2, 30, { message: 'Le nom doit contenir entre 2 et 30 caractères' })
  name: string;
}
@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true })
  @Length(2, 30, { message: 'Le nom doit contenir entre 2 et 30 caractères' })
  name?: string;
}
