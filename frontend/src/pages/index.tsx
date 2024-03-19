import LayoutNavbar from "@/components/LayoutNavbar";
import FamousCarousel from "@/components/Recipes/FamousCarousel";
import RecipesList from "@/components/Recipes/RecipesList";

const Accueil = () => {
  return (
    <LayoutNavbar>
      <div className="space-y-10">
        <FamousCarousel />
        <RecipesList />
      </div>
    </LayoutNavbar>
  );
};

export default Accueil;
