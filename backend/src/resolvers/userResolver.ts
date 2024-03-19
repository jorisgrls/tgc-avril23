import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import {
  LoginUserInput,
  NewUserInput,
  User,
  hashPassword,
  verifyPassword,
} from "../entities/user";
import { ContextType } from "../types";
import jwt from "jsonwebtoken";
import env from "../env";
import { UnauthenticatedError } from "../utils";

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => User)
  async user(@Ctx() ctx: ContextType) {
    if (typeof ctx.currentUser === "undefined") throw UnauthenticatedError();
    return User.findOneOrFail({
      where: { id: ctx?.currentUser?.id },
      relations: ["userProducts", "userProducts.product", "recipes"],
    });
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType) {
    return User.findOneOrFail({
      where: { id: ctx?.currentUser?.id },
    });
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ContextType) {
    ctx.res.clearCookie("token");
    return true;
  }

  @Mutation(() => User)
  async signUp(@Arg("data", { validate: true }) data: NewUserInput) {
    const hashedPassword = await hashPassword(data.password);
    return User.create({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      hashedPassword,
    }).save();
  }

  @Mutation(() => String)
  async login(
    @Arg("data", { validate: true }) data: LoginUserInput,
    @Ctx() ctx: ContextType
  ) {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await verifyPassword(
      user.hashedPassword,
      data.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY, {
      expiresIn: "30d",
    });

    const oneMonth = 30 * 24 * 3600 * 1000;

    ctx.res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      expires: new Date(Date.now() + oneMonth),
      domain: env.NODE_ENV === "production" ? env.COOKIE_DOMAIN : undefined,
    });

    return token;
  }
}

export default UserResolver;
