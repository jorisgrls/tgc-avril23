import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useGetUserRecipesQuery } from '@/graphql/generated/schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import BadgeStatus from '@/components/commons/BadgeStatus';
import { EyeIcon } from 'lucide-react';

const MyRecipesList = () => {
  const { data, loading, error } = useGetUserRecipesQuery();
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  console.log(data);
  return (
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
        {data?.userRecipes.map((recipe) => (
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MyRecipesList;
