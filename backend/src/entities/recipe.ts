import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { RecipeProduct } from "./recipeProduct";

export enum Status {
  VALIDATED = "VALIDATED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

@Entity()
@ObjectType()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ type: "text" })
  @Field()
  description: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  @Field()
  status: Status;

  @Column({ default: "" })
  @Field()
  statusReason: string;

  @Column()
  @Field()
  difficulty: string;

  @Column()
  @Field()
  duration: string;

  @Column()
  @Field()
  image: string;

  @Column({ type: "text" })
  @Field()
  content: string;

  @Column()
  @Field()
  isVegetarian: Boolean;

  @ManyToOne(() => User, (user) => user.recipes)
  @Field()
  user: User;

  @OneToMany(() => RecipeProduct, (recipeProduct) => recipeProduct.recipe)
  @Field(() => [RecipeProduct])
  recipeProducts: RecipeProduct[];
}

@InputType()
export class RecipeInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  difficulty: string;

  @Field()
  duration: string;

  @Field()
  image: string;

  @Field()
  content: string;

  @Field()
  isVegetarian: Boolean;
}
