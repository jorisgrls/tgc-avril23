import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./addProductForm.schema";
import IngredientsList from "@/components/Recipes/AddRecipes/RecipeIngredients/IngredientsList";
import { useAddUserProductMutation } from "@/graphql/generated/schema";
interface CreateGroupProps {
  setShowDialog: (value: boolean) => void;
}

const AddProductForm = ({ setShowDialog }: CreateGroupProps) => {
  const [addUserProduct] = useAddUserProductMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      quantity: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addUserProduct({
      variables: {
        data: {
          productId: parseInt(values.product, 10),
          quantity: parseInt(values.quantity, 10),
        },
      },
      refetchQueries: ["getUserProducts"],
    });
    setShowDialog(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <IngredientsList
                    onChange={(newValue: string) => field.onChange(newValue)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input type="text" {...field} placeholder="Quantité" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-fit">
            Ajouter
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
