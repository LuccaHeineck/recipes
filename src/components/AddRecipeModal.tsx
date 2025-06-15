'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AddRecipeForm from './AddRecipeForm';
import { Plus } from 'lucide-react';

export default function AddRecipeModal() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640); // Tailwind's 'sm' breakpoint ~640px
    }

    handleResize(); // check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
		variant="default"
		size={isMobile ? 'icon' : 'default'}
		className={isMobile ? 'p-2 w-12 h-12' : ''}
		>
          {isMobile ? (
			<Plus className="h-8 w-8 min-w-6 min-h-6" />
			) : (
			'Add Recipe'
			)}

        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-xl font-semibold mb-4">Add a New Recipe</DialogTitle>
        <AddRecipeForm />
      </DialogContent>
    </Dialog>
  );
}
