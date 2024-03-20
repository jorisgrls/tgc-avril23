import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import RecipeCard from '../RecipeCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useGetPossibleRecipesQuery } from '@/graphql/generated/schema';
import { useState } from 'react';
import { AlignJustify, FlipVertical, StarIcon } from 'lucide-react';

const RecipesList = () => {
  const [difficulty, setDifficulty] = useState('5');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const { data, loading, error } = useGetPossibleRecipesQuery();
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  const toggleVegetarianFilter = () => {
    setIsVegetarian(!isVegetarian);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
  };

  const filteredRecipes = data?.recipesForUser.filter((recipe) => {
    if (isVegetarian && !recipe.isVegetarian) {
      return false;
    }
    console.log(recipe.difficulty, difficulty);
    if (parseInt(recipe.difficulty, 10) > parseInt(difficulty, 10)) {
      return false;
    }
    return true;
  });
  return (
    <div>
      <div className="flex items-center justify-between border-b mb-6">
        <h1 className="text-2xl font-semibold mb-4">
          Les recettes que je peux faire
        </h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="icon">
              <AlignJustify className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filtres</h4>
                <p className="text-sm text-muted-foreground">
                  Filtrez par rapport à vos envies
                </p>
              </div>
              <div className="grid gap-3">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Végétarien</Label>
                  <Switch
                    id="airplane-mode"
                    checked={isVegetarian}
                    onCheckedChange={toggleVegetarianFilter}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="difficulty">Difficulté</Label>
                  <Select
                    value={difficulty}
                    onValueChange={handleDifficultyChange}
                  >
                    <SelectTrigger className="w-full col-span-2">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">
                          {Array.from({ length: 1 }).map((_, index) => (
                            <StarIcon
                              key={index}
                              className="h-5 w-5 text-yellow-500"
                            />
                          ))}
                        </SelectItem>
                        <SelectItem value="2">
                          <div className="flex">
                            {Array.from({ length: 2 }).map((_, index) => (
                              <StarIcon
                                key={index}
                                className="h-5 w-5 text-yellow-500"
                              />
                            ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="3">
                          <div className="flex">
                            {Array.from({ length: 3 }).map((_, index) => (
                              <StarIcon
                                key={index}
                                className="h-5 w-5 text-yellow-500"
                              />
                            ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="4">
                          <div className="flex">
                            {Array.from({ length: 4 }).map((_, index) => (
                              <StarIcon
                                key={index}
                                className="h-5 w-5 text-yellow-500"
                              />
                            ))}
                          </div>
                        </SelectItem>
                        <SelectItem value="5">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <StarIcon
                                key={index}
                                className="h-5 w-5 text-yellow-500"
                              />
                            ))}
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {filteredRecipes?.length === 0 ? (
        <div>
          <p className="text-xl text-gray-500 text-center w-full">
            Aucune recette trouvée
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {filteredRecipes?.map((recipe) => (
            <RecipeCard
              showDescription={false}
              hoverScale={true}
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesList;
