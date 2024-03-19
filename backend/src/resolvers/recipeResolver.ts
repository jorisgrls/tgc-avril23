import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";
import { Recipe, RecipeInput, Status } from "../entities/recipe";
import { ContextType } from "../types";
import { UnauthenticatedError } from "../utils";
import { User } from "../entities/user";
import { UserProduct } from "../entities/userProduct";
import { RecipeProduct, RecipeProductInput } from "../entities/recipeProduct";

@Resolver()
class RecipeResolver {
  @Authorized()
  @Query(() => [Recipe])
  async lastRecipes() {
    return Recipe.find({
      order: {
        createdAt: "DESC",
      },
      take: 5,
      where: { status: Status.VALIDATED },
    });
  }

  @Authorized()
  @Query(() => Recipe)
  async recipe(@Arg("id") id: number) {
    return Recipe.findOneOrFail({
      where: { id },
      relations: ["user", "recipeProducts", "recipeProducts.product"],
    });
  }

  @Authorized()
  @Query(() => [Recipe])
  async pendingRecipes() {
    return Recipe.find({
      where: { status: Status.PENDING },
    });
  }

  @Authorized()
  @Query(() => [Recipe])
  async userRecipes(@Ctx() ctx: ContextType) {
    if (typeof ctx.currentUser === "undefined") throw UnauthenticatedError();
    return Recipe.find({
      where: { user: { id: ctx.currentUser.id } },
    });
  }

  @Authorized()
  @Query(() => [Recipe])
  async recipesForUser(@Ctx() ctx: ContextType) {
    if (typeof ctx.currentUser === "undefined") throw UnauthenticatedError();
    const userProducts = await UserProduct.find({
      where: { user: { id: ctx.currentUser.id } },
      relations: ["product"],
    });
    const userProductsIds = userProducts.map((userProduct) => {
      return { id: userProduct.product.id, quantity: userProduct.quantity };
    });
    const allRecipes = await Recipe.find({
      relations: ["recipeProducts", "recipeProducts.product"],
      where: { status: Status.VALIDATED },
    });

    const recipesForUser = allRecipes.filter((recipe) => {
      return recipe.recipeProducts.every((recipeProduct) => {
        const userProduct = userProductsIds.find(
          (up) => up.id === recipeProduct.product.id
        );
        return userProduct && userProduct.quantity >= recipeProduct.quantity;
      });
    });

    return recipesForUser;
  }

  @Authorized()
  @Mutation(() => Recipe)
  async updateRecipeStatus(
    @Arg("id") id: number,
    @Arg("status") status: Status
  ) {
    const recipe = await Recipe.findOneOrFail({ where: { id } });
    recipe.status = status;
    return recipe.save();
  }

  @Authorized()
  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("data", { validate: true }) data: RecipeInput,
    @Arg("products", () => [RecipeProductInput], { validate: true })
    products: RecipeProductInput[],
    @Ctx() ctx: ContextType
  ) {
    if (typeof ctx.currentUser === "undefined") throw UnauthenticatedError();
    const newRecipe = await Recipe.create({
      title: data.title,
      description: data.description,
      image: data.image,
      difficulty: data.difficulty,
      duration: data.duration,
      content: data.content,
      isVegetarian: data.isVegetarian,
      user: { id: ctx.currentUser.id },
    }).save();
    for (const product of products) {
      await RecipeProduct.create({
        quantity: product.quantity,
        product: { id: product.productId },
        recipe: { id: newRecipe.id },
      }).save();
    }
    return newRecipe;
  }
}

export default RecipeResolver;
