import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { Product } from "../entities/product";

@Resolver()
class ProductResolver {
  @Authorized()
  @Query(() => [Product])
  async products() {
    return Product.find();
  }

  @Authorized()
  @Mutation(() => String)
  async createExample() {
    return "ok";
  }
}

export default ProductResolver;
