import { useGetUserProductsQuery } from "@/graphql/generated/schema";
import ProductCard from "../ProductCard";

const ProductsList = () => {
  const { loading, error, data } = useGetUserProductsQuery();
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  return (
    <div className="grid grid-cols-5 gap-4">
      {data?.user.userProducts.map((element) => (
        <ProductCard key={element.id} product={element} />
      ))}
    </div>
  );
};

export default ProductsList;
