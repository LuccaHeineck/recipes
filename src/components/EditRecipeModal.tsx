'use client';

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import EditRecipeForm from './EditRecipeForm';

interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  instructions: string;
  time: number;
  vegan: boolean;
}

interface EditRecipeModalProps {
  recipe: Recipe;
}

export default function EditRecipeModal({ recipe }: EditRecipeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-xl font-semibold mb-4">Edit Recipe</DialogTitle>
        <EditRecipeForm recipe={recipe} />
      </DialogContent>
    </Dialog>
  );
}
