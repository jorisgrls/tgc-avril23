import db, { clearDB } from './db';
import { Product } from './entities/product';
import { Recipe, Status } from './entities/recipe';
import { RecipeProduct } from './entities/recipeProduct';
import { User, UserRole } from './entities/user';
import { UserProduct } from './entities/userProduct';

export default async function main() {
  await db.initialize();
  await clearDB();
  await db.synchronize();

  // Création des produits
  const tomates = await Product.create({
    name: 'tomates',
    icon: 'https://image.noelshack.com/fichiers/2024/10/4/1709829177-tomate.png',
    unit: 'piece',
  }).save();
  const oignons = await Product.create({
    name: 'oignons',
    icon: 'https://image.noelshack.com/fichiers/2024/10/4/1709829177-oignon.png',
    unit: 'kg',
  }).save();
  const poulet = await Product.create({
    name: 'poulet',
    icon: 'https://image.noelshack.com/fichiers/2024/10/4/1709829177-cuisse-de-poulet.png',
    unit: 'kg',
  }).save();

  // Création des utilisateurs
  const user1 = await User.create({
    email: 'johndoe@gmail.com',
    firstname: 'John',
    lastname: 'Doe',
    hashedPassword: 'password',
    role: UserRole.ADMIN,
  }).save();
  const user2 = await User.create({
    email: 'jorisgrilleres@gmail.com',
    firstname: 'Joris',
    lastname: 'Grilleres',
    hashedPassword: 'password',
    role: UserRole.ADMIN,
  }).save();

  // Création des recettes
  const recipe1 = await Recipe.create({
    title: 'Ratatouille',
    description: 'Une recette de ratatouille',
    image:
      'https://image.noelshack.com/fichiers/2024/10/4/1709811131-pizza.jpg',
    status: Status.PENDING,
    difficulty: '4',
    duration: '30',
    isVegetarian: true,
    user: user1,
    content: 'Faire cuire les légumes',
  }).save();
  const recipe2 = await Recipe.create({
    title: 'Poulet basquaise',
    description: 'Une recette de poulet basquaise',
    image:
      'https://image.noelshack.com/fichiers/2024/10/4/1709811131-pizza.jpg',
    status: Status.VALIDATED,
    difficulty: '3',
    duration: '45',
    isVegetarian: false,
    user: user1,
    content: 'Faire cuire le poulet',
  }).save();
  const recipe3 = await Recipe.create({
    title: 'Lasagne',
    description: 'Recette de lasagne',
    image:
      'https://image.noelshack.com/fichiers/2024/10/4/1709811131-pizza.jpg',
    status: Status.PENDING,
    difficulty: '3',
    duration: '45',
    isVegetarian: false,
    user: user2,
    content: 'Faire revenir le boeuf',
  }).save();

  // Création des produits des recettes
  const recipe1product1 = await RecipeProduct.create({
    quantity: 2,
    product: tomates,
    recipe: recipe1,
  }).save();
  const recipe1product2 = await RecipeProduct.create({
    quantity: 3,
    product: oignons,
    recipe: recipe1,
  }).save();
  const recipe2product1 = await RecipeProduct.create({
    quantity: 10,
    product: tomates,
    recipe: recipe2,
  }).save();
  // Ajout des produits aux recettes
  recipe1.recipeProducts = [recipe1product1, recipe1product2];
  recipe2.recipeProducts = [recipe2product1];

  // Création des produits de l'utilisateur
  await UserProduct.create({
    quantity: 25,
    product: tomates,
    user: user1,
  }).save();
  await UserProduct.create({
    quantity: 25,
    product: oignons,
    user: user1,
  }).save();

  await db.destroy();
  console.log('done !');
}

main();
