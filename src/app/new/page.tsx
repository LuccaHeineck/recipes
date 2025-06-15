// app/recipes/new/page.tsx
'use client'

import AddRecipeForm from '@/components/AddRecipeForm';

export default function NewRecipePage() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <p className="mb-6 text-3xl font-bold">Add New Recipe</p>
      <AddRecipeForm />
    </main>
  );
}
