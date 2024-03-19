import { Button } from '@/components/ui/button';
import { useUpdateUserProductMutation } from '@/graphql/generated/schema';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';

const ProductCard = ({ product }: any) => {
  const [updateUserProduct] = useUpdateUserProductMutation({
    onCompleted: () => {
      console.log('Product updated');
    },
    refetchQueries: [
      'getUserProducts',
      'getPossibleRecipes',
      'getPossibleRecipes',
    ],
  });
  const handleUpdateUserProduct = async (action: string) => {
    console.log(product);
    await updateUserProduct({
      variables: {
        data: {
          productId: product.product.id,
          quantity:
            action === 'add' ? product.quantity + 1 : product.quantity - 1,
        },
      },
    });
  };
  return (
    <div className="border p-4 rounded text-center space-y-2">
      <div className="flex justify-center">
        <Image src={product.product.icon} alt="image" width={30} height={30} />
      </div>
      <h2 className="text-lg font-semibold uppercase">
        {product.product.name}
      </h2>
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => handleUpdateUserProduct('remove')}
        >
          <MinusIcon className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-xl font-bold tracking-tighter">
            {product.quantity}
          </div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            {product.product.unit}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => handleUpdateUserProduct('add')}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
