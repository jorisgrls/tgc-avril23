import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import veggie from '@/assets/veggie.png';
import { StarIcon } from 'lucide-react';

interface RecipeCardProps {
  showDescription?: boolean;
  hoverScale?: boolean;
  recipe: {
    id: number;
    title: string;
    description: string;
    image: string;
    difficulty: string;
    duration: string;
    isVegetarian: boolean;
  };
}

const RecipeCard = ({
  recipe,
  showDescription,
  hoverScale = false,
}: RecipeCardProps) => {
  return (
    <Link href={`/recettes/${recipe.id}`}>
      <Card
        className={`${hoverScale && 'transition duration-500 hover:scale-105'}`}
      >
        <CardHeader className="flex flex-col p-4 justify-center">
          <CardTitle>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <p className="text-3xl font-semibold">{recipe.title}</p>
                {recipe.isVegetarian && (
                  <Image
                    src={veggie}
                    alt="veggie"
                    width={30}
                    height={30}
                    className="w-6 h-6"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {recipe.duration}min
              </span>
              <div className="flex">
                {Array.from({ length: parseInt(recipe.difficulty) }).map(
                  (_, index) => (
                    <StarIcon key={index} className="h-5 w-5 text-yellow-500" />
                  )
                )}
              </div>
            </div>
          </CardTitle>
          {showDescription && (
            <CardDescription>{recipe.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Image
            src={recipe.image}
            alt={`photo de la recette ${recipe.title}`}
            width={400}
            height={400}
            className="rounded-md h-44 w-full object-cover"
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
