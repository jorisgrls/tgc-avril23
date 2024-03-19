import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Recipe } from "./recipe";
import { Product } from "./product";

@Entity()
@ObjectType()
export class RecipeProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.recipeProducts)
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeProducts)
  @Field(() => Recipe)
  recipe: Recipe;
}

@InputType()
export class RecipeProductInput {
  @Field()
  productId: number;

  @Field()
  quantity: number;
}
