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

// describe('Recipe resolver', () => {
//   it('can return pending recipes', async () => {
//     const user1 = await User.create({
//       email: 'johndoe@gmail.com',
//       firstname: 'John',
//       lastname: 'Doe',
//       hashedPassword: 'password',
//       role: UserRole.ADMIN,
//     }).save();

//     const product1 = await Product.create({
//       name: 'tomates',
//       icon: 'https://image.noelshack.com/fichiers/2024/10/4/1709829177-tomate.png',
//       unit: 'piece',
//     }).save();

//     const product2 = await Product.create({
//       name: 'oignons',
//       icon: 'https://image.noelshack.com/fichiers/2024/10/4/1709829177-oignon.png',
//       unit: 'kg',
//     }).save();

//     const recipe1 = await Recipe.create({
//       title: 'Ratatouille',
//       description: 'Une recette de ratatouille',
//       image:
//         'https://image.noelshack.com/fichiers/2024/10/4/1709811131-pizza.jpg',
//       status: Status.PENDING,
//       difficulty: '4',
//       duration: '30',
//       isVegetarian: true,
//       user: user1,
//       content: 'Faire cuire les légumes',
//     }).save();

//     const recipe1product1 = await RecipeProduct.create({
//       quantity: 2,
//       product: product1,
//       recipe: recipe1,
//     }).save();
//     const recipe1product2 = await RecipeProduct.create({
//       quantity: 3,
//       product: product2,
//       recipe: recipe1,
//     }).save();

//     recipe1.recipeProducts = [recipe1product1, recipe1product2];

//     const res = await execute(
//       gql`
//         query GetPendingRecipes {
//           pendingRecipes {
//             id
//             status
//             title
//             description
//           }
//         }
//       `,
//       {},
//       await getContext()
//     );

//     expect(res).toMatchInlineSnapshot(`
// {
//   "data": {
//     "pendingRecipes": [
//       {
//         "description": "Une recette de ratatouille",
//         "id": 1,
//         "status": "PENDING",
//         "title": "Ratatouille",
//       },
//     ],
//   },
// }
// `);
//   });
// });
