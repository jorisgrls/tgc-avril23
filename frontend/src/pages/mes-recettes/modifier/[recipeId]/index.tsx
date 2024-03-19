import LayoutNavbar from "@/components/LayoutNavbar";
import UpdateRecipeForm from "@/components/Recipes/AddRecipes/UpdateRecipeForm";

const UpdateRecipe = ({ params }: any) => {
  const id = params.recipeId;
  return (
    <LayoutNavbar>
      <UpdateRecipeForm recipeId={id} />
    </LayoutNavbar>
  );
};

export default UpdateRecipe;
