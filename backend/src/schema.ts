import { buildSchema } from 'type-graphql';
import UserResolver from './resolvers/userResolver';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import env from './env';
import { User } from './entities/user';
import ProductResolver from './resolvers/productResolver';
import RecipeResolver from './resolvers/recipeResolver';
import UserProductResolver from './resolvers/userProductResolver';

export default buildSchema({
  resolvers: [
    ProductResolver,
    UserResolver,
    RecipeResolver,
    UserProductResolver,
  ],
  authChecker: async ({ root, args, context, info }, roles = []) => {
    const cookies = cookie.parse(context.req.headers.cookie ?? '');

    const token =
      cookies.token ??
      context.req.headers['authorization']?.split('Bearer ')?.[1];

    try {
      const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as any;
      const id = decoded.userId;
      const currentUser = await User.findOneOrFail({ where: { id } });
      context.currentUser = currentUser;
    } catch (err) {
      return false;
    }

    return roles.length === 0 || roles.includes(context?.currentUser?.role);
  },
});
