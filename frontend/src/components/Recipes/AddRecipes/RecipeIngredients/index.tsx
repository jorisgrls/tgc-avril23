import { Button } from '@/components/ui/button';
import IngredientsList from './IngredientsList';
import { Input } from '@/components/ui/input';
import { PlusIcon, XCircleIcon } from 'lucide-react';

const RecipeIngredients = ({ ...props }) => {
  const addStep = () => {
    if (
      props.value[props.value.length - 1].product.name !== '' &&
      props.value[props.value.length - 1].product.quantity !== ''
    ) {
      const newId = parseInt(props.value[props.value.length - 1].id) + 1;
      props.onChange([
        ...props.value,
        { id: newId.toString(), product: { id: '', quantity: '' } },
      ]);
    }
  };
  const handleIngredientChangeId = (id: number, newId: string) => {
    props.onChange(
      props.value.map((ingredient: any) =>
        ingredient.id === id
          ? { ...ingredient, product: { ...ingredient.product, id: newId } }
          : ingredient
      )
    );
  };
  const handleIngredientChangeQuantity = (id: number, newQuantity: string) => {
    props.onChange(
      props.value.map((ingredient: any) =>
        ingredient.id === id
          ? {
              ...ingredient,
              product: { ...ingredient.product, quantity: newQuantity },
            }
          : ingredient
      )
    );
  };
  const handleStepDelete = (id: number) => {
    if (props.value.length > 1) {
      props.onChange(
        props.value.filter((ingredient: any) => ingredient.id !== id)
      );
    }
  };

  return (
    <div className="w-full border-2 rounded p-2 space-y-2">
      <div className="space-y-2">
        {props.value.map((ingredient: any) => (
          <div
            key={ingredient.id}
            className="bg-gray-200 p-4 rounded items-center space-y-2"
          >
            <div className="grid grid-cols-7 items-center gap-4">
              <IngredientsList
                onChange={(newValue: string) =>
                  handleIngredientChangeId(ingredient.id, newValue)
                }
                value={ingredient.product.id}
                className="col-span-3"
              />
              <Input
                placeholder="Quantité"
                onChange={(e) =>
                  handleIngredientChangeQuantity(ingredient.id, e.target.value)
                }
                className="col-span-3"
              />
              <XCircleIcon
                className="h-6 w-6 cursor-pointer text-red-600 justify-self-end"
                onClick={() => handleStepDelete(ingredient.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="ghost" size="icon" type="button" onClick={addStep}>
          <PlusIcon className="h-6 w-6 cursor-pointer" />
        </Button>
      </div>
    </div>
  );
};

export default RecipeIngredients;
