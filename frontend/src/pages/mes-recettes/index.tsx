import LayoutNavbar from '@/components/LayoutNavbar';
import MyRecipesList from '@/components/Recipes/MyRecipesList';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

const MyRecipes = () => {
  return (
    <LayoutNavbar>
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-2xl font-semibold">Mes recettes</h1>
        <Link href="/mes-recettes/ajouter">
          <Button variant="secondary">
            <PlusIcon className="mr-2 h-4 w-4" />
            Proposer une recette
          </Button>
        </Link>
      </div>
      <MyRecipesList />
    </LayoutNavbar>
  );
};

export default MyRecipes;
