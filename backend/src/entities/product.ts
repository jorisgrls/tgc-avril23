import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { Length } from "class-validator";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { RecipeProduct } from "./recipeProduct";
import { UserProduct } from "./userProduct";

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  icon: string;

  @Column()
  @Field()
  unit: string;

  @ManyToMany(() => RecipeProduct, (recipeProduct) => recipeProduct.product)
  recipeProducts: RecipeProduct[];

  @ManyToMany(() => UserProduct, (userProduct) => userProduct.product)
  userProducts: UserProduct[];
}

@InputType()
export class NewProductInput {
  @Field()
  @Length(3, 50)
  name: string;

  @Field()
  @Length(3, 200)
  icon: string;

  @Field()
  @Length(1, 50)
  unit: string;
}
