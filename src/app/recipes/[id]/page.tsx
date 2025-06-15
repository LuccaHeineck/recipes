import RecipeDetails from "@/components/RecipeDetails";

interface Recipe {
	title: string;
	image: string;
	description: string;
	instructions: string;
	time: number;
	vegan: boolean;
}

export default async function RecipePage({ params }: { params: { id: string } }) {
	const res = await fetch(`http://localhost:4000/recipes/${params.id}`, {
		cache: "no-store", // optional: avoids stale data
	});
	if (!res.ok) {
		throw new Error("Failed to fetch recipe.");
	}

	const recipe: Recipe = await res.json();

	return <RecipeDetails recipe={recipe} />;
}
