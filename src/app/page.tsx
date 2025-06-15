import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { AvatarFallback } from '@radix-ui/react-avatar';
import Link from "next/link";

interface Recipe {
  title: string,
  image: string,
  time: number,
  description: string,
  vegan: boolean,
  id: string
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')

  //await new Promise((resolve) => setTimeout(resolve, 3000));

  return result.json()
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main className="p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
            <Card key={recipe.id} className='flex flex-col justify-between'>
              <CardHeader className='flex-row gap-4 items-center'>
                <Avatar>
                  <AvatarImage src={`/img/${recipe.image}`} alt="recipe img" />
                  <AvatarFallback>
                    {recipe.title.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription className='mt-2'>{recipe.time} mins to cook</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{recipe.description}</p>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button asChild>
                  <Link href={`/recipes/${recipe.id}`}>View Recipe</Link>
                </Button>
                {recipe.vegan && <Badge className="bg-green-900 text-white" variant="secondary" >Vegan!</Badge>}
              </CardFooter>
            </Card>
        ))}
      </div>
    </main>
  );
}
