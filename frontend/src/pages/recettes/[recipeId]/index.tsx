'use client';

import { useGetRecipeDetailsQuery } from '@/graphql/generated/schema';
import { makePlural } from '@/helpers/recipe/makePlural';
import { uppercaseFirstLetter } from '@/helpers/recipe/uppercaseFirstLetter';
import Image from 'next/image';
import { useRouter } from 'next/router';
import veggie from '@/assets/veggie.png';
import useUserStore from '@/store/user.store';
import LayoutNavbar from '@/components/LayoutNavbar';
import { ClockIcon, FireExtinguisherIcon, StarIcon } from 'lucide-react';

const ReceipeDetails = () => {
  const user = useUserStore((state) => state);

  const router = useRouter();

  const { recipeId } = router.query;

  const { data, loading, error } = useGetRecipeDetailsQuery({
    variables: {
      recipeId: typeof recipeId === 'string' ? parseInt(recipeId, 10) : 0,
    },
    skip: typeof recipeId === 'undefined',
  });
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (
    data?.recipe.status === 'PENDING' &&
    user?.role !== 'ADMIN' &&
    user?.id !== data?.recipe.user.id
  ) {
    return (
      <div className="flex justify-center items-center h-96">
        <div>
          <h1 className="text-2xl font-semibold text-center">
            Un peu de patience ...
          </h1>
          <h2 className="text-lg">Cette recette n'est pas encore disponible</h2>
        </div>
      </div>
    );
  }
  const contentRecipe = data?.recipe.content
    .split('\\n')
    .map((step) => step.trim());
  return (
    <LayoutNavbar>
      <div className="flex gap-4">
        <div className="border rounded p-8 max-w-4xl space-y-8 flex-1">
          <header className="space-y-4">
            <div>
              <div className="flex gap-2">
                <h1 className="text-4xl font-semibold">
                  {data?.recipe.title}{' '}
                  <span className="text-lg font-medium">
                    par {data?.recipe.user.lastname}{' '}
                    {data?.recipe.user.firstname}
                  </span>
                </h1>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-5 w-5" />
                  <h2>Temps de préparation : {data?.recipe.duration}min</h2>
                </div>
                <div className="flex items-center gap-1">
                  <FireExtinguisherIcon className="h-5 w-5" />
                  <div className="flex gap-2 items-center">
                    <h2>Difficulté :</h2>
                    <div className="flex">
                      {Array.from({
                        length: 5,
                      }).map((_, index) => (
                        <StarIcon
                          key={index}
                          className="h-5 w-5 text-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p>{data?.recipe.description}</p>
          </header>
          <div className="grid grid-cols-2 gap-4">
            <aside className="border rounded p-4 space-y-2">
              <h3 className="font-medium">INGREDIENTS</h3>
              <ul>
                {data?.recipe.recipeProducts.map((ingredient) => (
                  <li key={ingredient.id}>
                    - {uppercaseFirstLetter(ingredient.product.name)} :{' '}
                    {ingredient.quantity}{' '}
                    {makePlural(ingredient.product.unit, ingredient.quantity)}
                  </li>
                ))}
              </ul>
            </aside>
            <main className="border rounded p-4 space-y-2">
              <h3 className="font-medium">RECETTE</h3>
              <ol>
                {contentRecipe?.map((step, index) => (
                  <li key={index}>{index + 1 + ') ' + step}</li>
                ))}
              </ol>
            </main>
          </div>
        </div>
        <div>
          <Image
            src={
              data?.recipe.image ||
              'https://image.noelshack.com/fichiers/2024/10/4/1709811131-pizza.jpg'
            }
            alt="image de la recette"
            height={400}
            width={400}
            className="rounded-md"
          />
        </div>
      </div>
    </LayoutNavbar>
  );
};

export default ReceipeDetails;
