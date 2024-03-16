import gql from 'graphql-tag';
import { execute } from '../jest.setup';
import { Category } from '../src/entities/category';

describe('Category Resolver', () => {
  it('can return a list of categories', async () => {
    await Category.create({ name: 'automobile' }).save();
    await Category.create({ name: 'sport' }).save();

    const res = await execute(gql`
      query Categories {
        categories {
          id
          name
        }
      }
    `);

    expect(res.data).toMatchInlineSnapshot(`
{
  "categories": [
    {
      "id": 2,
      "name": "sport",
    },
    {
      "id": 1,
      "name": "automobile",
    },
  ],
}
`);
  });
});
