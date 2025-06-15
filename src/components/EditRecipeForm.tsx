'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  instructions: string;
  time: number;
  vegan: boolean;
}

interface EditRecipeFormProps {
  recipe: Recipe;
}

export default function EditRecipeForm({ recipe }: EditRecipeFormProps) {
  const [id, setId] = useState(recipe.id);
  const [title, setTitle] = useState(recipe.title);
  const [image, setImage] = useState(recipe.image);
  const [description, setDescription] = useState(recipe.description);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [time, setTime] = useState(recipe.time);
  const [vegan, setVegan] = useState(recipe.vegan);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const updatedRecipe = { title, image, description, instructions, time, vegan };

  try {
    const res = await fetch(`http://localhost:4000/recipes/${id}`, {
      method: 'PUT', // or 'PATCH' depending on your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    });

    if (!res.ok) {
      throw new Error('Failed to update recipe.');
    }

    window.location.href = `/recipes/${id}`;
  } catch (error) {
    console.error('Error updating recipe:', error);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image filename</Label>
        <Input id="image" value={image} onChange={e => setImage(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <textarea
          id="instructions"
          className="w-full rounded-md border border-gray-300 p-2 resize-none"
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time (minutes)</Label>
        <Input
          id="time"
          type="number"
          value={time}
          onChange={e => setTime(Number(e.target.value))}
          min={0}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="vegan"
          checked={vegan}
          onChange={e => setVegan((e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="vegan">Vegan</Label>
      </div>

      <Button type="submit" className="mt-4">
        Save Changes
      </Button>
    </form>
  );
}
