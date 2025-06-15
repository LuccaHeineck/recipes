'use client';  // <-- Add this at the very top

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import EditRecipeModal from "./EditRecipeModal";
import Image from "next/image";

interface RecipeDetailsProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    description: string;
    instructions: string;
    time: number;
    vegan: boolean;
  };
}

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const res = await fetch(`http://localhost:4000/recipes/${recipe.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete recipe.");
      }

      console.log("Recipe deleted successfully");
      window.location.href = "/"; // redirect to home or recipes list
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <Separator className="my-2" />

      <Image
        src={`/img/${recipe.image}`}
        alt={recipe.title}
        width={800}
        height={600}
        className="w-full h-auto rounded-lg object-cover"
      />

      <p className="text-muted-foreground text-base italic">{recipe.description}</p>
      <p className="text-sm text-gray-600">⏱ {recipe.time} min</p>
      <p className="text-muted-foreground text-md leading-relaxed whitespace-pre-line">
        {recipe.instructions}
      </p>

      {recipe.vegan && (
        <Badge className="bg-green-700 text-white">🌱 Vegan</Badge>
      )}

      <div className="flex justify-end gap-2">
        <EditRecipeModal recipe={recipe} />
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
