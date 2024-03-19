import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { User } from "./user";
import { Product } from "./product";
import { Length } from "class-validator";

@Entity()
@ObjectType()
export class UserProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  quantity: number;

  @ManyToOne(() => User, (user) => user.userProducts)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Product, (product) => product.userProducts)
  @Field(() => Product)
  product: Product;
}

@InputType()
export class UserProductInput {
  @Field()
  productId: number;

  @Field()
  quantity: number;
}
