'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from './AddRecipesForm.schema';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import RecipeSteps from '../RecipeSteps';
import RecipeIngredients from '../RecipeIngredients';
import { useCreateRecipeMutation } from '@/graphql/generated/schema';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { StarIcon } from 'lucide-react';

const AddRecipesForm = () => {
  const router = useRouter();
  const [addRecipe, { loading }] = useCreateRecipeMutation({
    onCompleted: () => {
      toast.success('Votre demande de recette a bien été envoyée'),
        router.push('/recettes-a-valider');
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      ingredients: [{ id: '1', product: { id: '', quantity: '' } }],
      steps: [{ id: 1, text: '' }],
      image: '',
      difficulty: '1',
      preparationTime: '30',
      isVegetarian: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const steps = values.steps.map((step) => step.text).join('\\n');
    const ingredients = values.ingredients.map((ingredient) => {
      return {
        productId: parseInt(ingredient.product.id, 10),
        quantity: parseInt(ingredient.product.quantity, 10),
      };
    });
    await addRecipe({
      variables: {
        data: {
          title: values.title,
          description: values.description,
          content: steps,
          image: values.image,
          difficulty: values.difficulty,
          duration: values.preparationTime,
          isVegetarian: values.isVegetarian || false,
        },
        products: ingredients,
      },
    });
  };
  return (
    <div>
      <h1 className="pb-2 text-2xl font-semibold border-b mb-6">
        Ajouter une recette
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="flex w-full gap-8">
            <div className="flex flex-col gap-2 w-1/2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Pizza à la sauce tomate"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Découvrez la recette traditionnelle de la pizza avec une sauce tomate maison."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Niveau de difficulté</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Url de l&apos;image</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="https://monimage.com/ma-super-image.jpg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isVegetarian"
                render={({ field }) => (
                  <FormItem className="w-full items-center flex gap-2">
                    <FormLabel>Plat végétarien</FormLabel>
                    <FormControl>
                      <Switch
                        onCheckedChange={field.onChange}
                        checked={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preparationTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Temps de préparation (en min)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-4">
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ingrédients</FormLabel>
                    <FormControl>
                      <RecipeIngredients {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="steps"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Etapes de la recette</FormLabel>
                    <FormControl>
                      <RecipeSteps {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4 w-fit" disabled={loading}>
            Proposer la recette
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddRecipesForm;
