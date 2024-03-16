import { Ad, NewAdInput, UpdateAdInput } from '../entities/ad';
import {
  UnauthenticatedError,
  NotFoundError,
  UnauthaurizedError,
} from '../utils';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Authorized,
  Ctx,
  Int,
} from 'type-graphql';
import { User } from '../entities/user';
import { ContextType } from '../types';
import { ILike, In } from 'typeorm';

@Resolver()
class AdResolver {
  @Query(() => [Ad])
  async ads(
    @Arg('tagsId', { nullable: true }) tagIds?: string,
    @Arg('categoryId', () => Int, { nullable: true }) categoryId?: number,
    @Arg('ownerId', () => Int, { nullable: true }) ownerId?: number,
    @Arg('title', { nullable: true }) title?: string
  ) {
    const ads = await Ad.find({
      relations: { category: true, tags: true, owner: true },
      where: {
        tags: {
          id:
            typeof tagIds === 'string' && tagIds.length > 0
              ? In(tagIds.split(',').map((t) => parseInt(t, 10)))
              : undefined,
        },
        title: title ? ILike(`%${title}%`) : undefined,
        category: {
          id: categoryId,
        },
        owner: {
          id: ownerId,
        },
      },
    });

    return ads;
  }

  @Query(() => Ad)
  async ad(@Arg('adId') adId: number) {
    return Ad.findOne({
      relations: { category: true, owner: true, tags: true },
      where: { id: adId },
    });
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Arg('data', { validate: true }) data: NewAdInput,
    @Ctx() ctx: ContextType
  ) {
    if (typeof ctx.currentUser === 'undefined') throw UnauthenticatedError();

    const owner = await User.findOneOrFail({
      where: { id: ctx?.currentUser?.id },
    });

    const newAd = await Ad.create({ ...data, owner }).save();

    return Ad.findOne({
      relations: { category: true, owner: true, tags: true },
      where: { id: newAd.id },
    });
  }

  @Authorized()
  @Mutation(() => Ad)
  async updateAd(
    @Arg('adId') id: number,
    @Arg('data', { validate: true }) data: UpdateAdInput,
    @Ctx() { currentUser }: ContextType
  ) {
    if (typeof currentUser === 'undefined') throw UnauthenticatedError();
    const adToUpdate = await Ad.findOne({
      where: { id },
      relations: { owner: true, tags: true, category: true },
    });
    if (!adToUpdate) throw NotFoundError();
    if (currentUser.role !== 'admin' && currentUser.id !== adToUpdate.owner.id)
      throw UnauthaurizedError();
    await Object.assign(adToUpdate, data);
    await adToUpdate.save();
    return Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deleteAd(
    @Arg('adId') adId: number,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    if (typeof ctx.currentUser === 'undefined') throw UnauthenticatedError();

    const adToDelete = await Ad.findOne({
      where: { id: adId },
      relations: { owner: true },
    });

    if (!adToDelete) throw NotFoundError();

    if (
      ctx.currentUser.role !== 'admin' &&
      adToDelete?.owner.id !== ctx.currentUser.id
    ) {
      throw new Error('You are not allowed to delete this ad');
    }

    await adToDelete.remove();

    return 'Ad deleted successfully!';
  }
}

export default AdResolver;
