export const dynamic = "force-dynamic";

import RecipeDetails from "@/components/RecipeDetails";

interface Recipe {
	id: number;
	title: string;
	image: string;
	description: string;
	instructions: string;
	time: number;
	vegan: boolean;
}

interface PageProps {
	params: {
		id: string;
	};
}

export default async function RecipePage({ params }: PageProps) {
	const res = await fetch(`http://localhost:4000/recipes/${params.id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch recipe.");
	}

	const recipe: Recipe = await res.json();

	return <RecipeDetails recipe={recipe} />;
}
