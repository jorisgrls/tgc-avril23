import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Length } from 'class-validator';
import { ObjectType, Field, Int, InputType } from 'type-graphql';
import { Ad } from './ad';

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Ad)
  ads: Ad[];
}

@InputType()
export class NewTagInput {
  @Field()
  @Length(2, 30, { message: 'Le nom doit contenir entre 2 et 30 caractères' })
  name: string;
}

@InputType()
export class UpdateTagInput {
  @Field({ nullable: true })
  @Length(2, 30, { message: 'Le nom doit contenir entre 2 et 30 caractères' })
  name?: string;
}
