import LayoutNavbar from '@/components/LayoutNavbar';
import BadgeStatus from '@/components/commons/BadgeStatus';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useGetPendingRecipesQuery,
  useUpdateRecipeStatusMutation,
} from '@/graphql/generated/schema';
import { BookMarked, CheckIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const RecipesValidation = () => {
  const { data, loading, error } = useGetPendingRecipesQuery();
  const [updateRecipeStatus] = useUpdateRecipeStatusMutation({
    refetchQueries: ['getPendingRecipes'],
  });

  const handleUpdateRecipeStatus = async (id: number, status: string) => {
    await updateRecipeStatus({
      variables: {
        updateRecipeStatusId: id,
        status,
      },
      onCompleted: () => {
        toast.success('Le status de la recette a bien été mis à jour');
      },
    });
  };

  if (loading) return <div>loading...</div>;
  if (error) {
    return <div>error...</div>;
  }
  return (
    <LayoutNavbar>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">
          Recettes en attente de validation
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>TITRE</TableHead>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.pendingRecipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="font-medium">{recipe.id}</TableCell>
                <TableCell>{recipe.title}</TableCell>
                <TableCell>{recipe.description}</TableCell>
                <TableCell>
                  <BadgeStatus code={recipe.status} />
                </TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/recettes/${recipe.id}`}>
                    <Button variant="outline" size="icon">
                      <EyeIcon className="h-5 w-5" />
                    </Button>
                  </Link>
                  {(recipe.status === 'PENDING' ||
                    recipe.status === 'REJECTED') && (
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() =>
                        handleUpdateRecipeStatus(recipe.id, 'VALIDATED')
                      }
                    >
                      <CheckIcon className="h-5 w-5" />
                    </Button>
                  )}
                  {(recipe.status === 'PENDING' ||
                    recipe.status === 'VALIDATED') && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() =>
                        handleUpdateRecipeStatus(recipe.id, 'REJECTED')
                      }
                    >
                      <BookMarked className="h-5 w-5" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </LayoutNavbar>
  );
};

export default RecipesValidation;
