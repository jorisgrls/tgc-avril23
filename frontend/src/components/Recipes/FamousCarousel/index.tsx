import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import RecipeCard from "../RecipeCard";
import { useGetLastRecipesQuery } from "@/graphql/generated/schema";

const FamousCarousel = () => {
  const { data, loading, error } = useGetLastRecipesQuery();
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-4">
        Les recettes récemment ajoutées
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {data?.lastRecipes.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <RecipeCard showDescription={true} recipe={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FamousCarousel;
