import { Resolver, Query } from 'type-graphql';
import { Tag } from '../entities/tag';

@Resolver()
class TagResolver {
  @Query(() => [Tag])
  async tags() {
    return Tag.find();
  }
}

export default TagResolver;
