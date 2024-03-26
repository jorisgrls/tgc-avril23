import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetProductsQuery } from '@/graphql/generated/schema';

const IngredientsList = ({ value, onChange, className }: any) => {
  const { data, loading, error } = useGetProductsQuery();
  const [open, setOpen] = useState(false);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  console.log(data?.products);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {value
            ? data?.products.find((ingredient) => ingredient.id == value)?.name
            : 'Sélectionner un ingrédient'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Chercher un ingrédient ..." />
          <CommandEmpty>Aucun produit trouvé</CommandEmpty>
          <CommandGroup>
            {data?.products.map((ingredient) => (
              <CommandItem
                key={ingredient.id}
                value={ingredient.id.toString()}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === ingredient.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {ingredient.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default IngredientsList;
