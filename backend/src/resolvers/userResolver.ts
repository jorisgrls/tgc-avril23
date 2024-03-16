import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql';
import {
  NewUserInput,
  User,
  hashPassword,
  LoginUserInput,
  verifyPassword,
  UserRole,
  UpdateUserInput,
} from '../entities/user';
import jwt from 'jsonwebtoken';
import env from '../env';
import { ContextType } from '../types';
import { UnauthenticatedError } from '../utils';

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg('data', { validate: true }) data: NewUserInput) {
    const hashedPassword = await hashPassword(data.password);
    return User.create({
      nickname: data.nickname,
      email: data.email,
      hashedPassword,
    }).save();
  }

  @Mutation(() => String)
  async login(
    @Arg('data', { validate: true }) data: LoginUserInput,
    @Ctx() ctx: ContextType
  ) {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await verifyPassword(
      user.hashedPassword,
      data.password
    );

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY, {
      expiresIn: '30d',
    });

    const oneMonth = 30 * 24 * 3600 * 1000;

    ctx.res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      expires: new Date(Date.now() + oneMonth),
      domain: env.NODE_ENV === 'production' ? env.COOKIE_DOMAIN : undefined,
    });

    return token;
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType) {
    return User.findOneOrFail({
      where: { id: ctx?.currentUser?.id },
      relations: { ads: true },
    });
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ContextType) {
    ctx.res.clearCookie('token');
    return true;
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Ctx() ctx: ContextType,
    @Arg('data', { validate: true }) data: UpdateUserInput
  ) {
    if (!ctx.currentUser) throw UnauthenticatedError();
    Object.assign(
      ctx.currentUser,
      Object.keys(data).reduce((acc: any, prop: any) => {
        if (!!(data as any)[prop]) acc[prop] = (data as any)[prop];
        return acc;
      }, {})
    );
    return ctx.currentUser.save();
  }
}

export default UserResolver;
