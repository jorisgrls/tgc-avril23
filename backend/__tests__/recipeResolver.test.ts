import gql from 'graphql-tag';
import { execute } from '../jest.setup';
import { User, UserRole } from '../src/entities/user';
import { Product } from '../src/entities/product';
import { Recipe, Status } from '../src/entities/recipe';
import { RecipeProduct } from '../src/entities/recipeProduct';
import getContext from './helpers/getContext';

//fait un test true
describe('Recipe resolver', () => {
  it('true', async () => {
    expect(true).toBe(true);
  });
});
