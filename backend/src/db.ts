import { DataSource } from 'typeorm';
import { Recipe } from './entities/recipe';
import { Product } from './entities/product';
import { User } from './entities/user';
import env from './env';
import { UserProduct } from './entities/userProduct';
import { RecipeProduct } from './entities/recipeProduct';
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST } = env;

const db = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [Product, Recipe, User, RecipeProduct, UserProduct],
  synchronize: env.NODE_ENV === 'production',
  logging: env.NODE_ENV !== 'test',
});

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities
    .map((entity) => `"${entity.tableName}"`)
    .join(', ');

  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
