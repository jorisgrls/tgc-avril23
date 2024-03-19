import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";
import { Recipe, Status } from "../entities/recipe";
import { UserProduct, UserProductInput } from "../entities/userProduct";
import { ContextType } from "../types";
import { UnauthenticatedError } from "../utils";
import { User } from "../entities/user";

@Resolver()
class UserProductResolver {
  @Authorized()
  @Mutation(() => UserProduct)
  async updateUserProduct(
    @Arg("data", { validate: true }) data: UserProductInput,
    @Ctx() ctx: ContextType
  ) {
    if (typeof ctx.currentUser === "undefined") throw UnauthenticatedError();
    const userProduct = await UserProduct.findOneOrFail({
      where: {
        product: { id: data.productId },
        user: { id: ctx.currentUser.id },
      },
      relations: ["product", "user"],
    });
    if (data.quantity === 0) return userProduct.remove();
    userProduct.quantity = data.quantity;
    return userProduct.save();
  }

  @Authorized()
  @Mutation(() => UserProduct)
  async addUserProduct(
    @Arg("data", { validate: true }) data: UserProductInput,
    @Ctx() ctx: ContextType
  ) {
    if (typeof ctx.currentUser === "undefined") throw UnauthenticatedError();
    const userProduct = UserProduct.create({
      user: ctx.currentUser,
      product: { id: data.productId },
      quantity: data.quantity,
    });
    return userProduct.save();
  }
}

export default UserProductResolver;
