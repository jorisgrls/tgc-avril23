import BadgeStatus from '@/components/commons/BadgeStatus';
import { StarIcon } from 'lucide-react';

interface RecipeLineProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    status: string;
  };
}
const RecipeLine = ({ recipe }: RecipeLineProps) => {
  return (
    <div className="grid grid-cols-5">
      <p>{recipe.id}</p>
      <p className="line-clamp-1">{recipe.title}</p>
      <p className="line-clamp-1">{recipe.description}</p>
      <div className="flex items-center">
        {Array.from({ length: parseInt(recipe.difficulty, 10) }).map(
          (_, index) => (
            <StarIcon key={index} className="h-5 w-5 text-yellow-500" />
          )
        )}
      </div>
      <BadgeStatus code={recipe.status} />
    </div>
  );
};

export default RecipeLine;
