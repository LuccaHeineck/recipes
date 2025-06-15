'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, SunMoon } from "lucide-react";

export default function NavBar() {
	return (
		<nav className="flex justify-between items-center p-4 border-b">
			<Link href="/">
				<h1 className="text-lg sm:text-xl font-semibold cursor-pointer">My Recipes</h1>
			</Link>

			<div className="flex gap-2">
				{/* Mobile Button to open modal */}
				<Button
					variant="outline"
					size="icon"
					onClick={() => {
						window.dispatchEvent(new Event("open-add-recipe-modal"));
					}}
					className="sm:hidden"
				>
					<Plus className="h-5 w-5" />
				</Button>

				{/* Desktop trigger is in AddRecipeModal */}
				{/* Theme Toggle Button */}
				<Button variant="ghost" size="icon">
					<SunMoon className="h-5 w-5" />
				</Button>
			</div>
		</nav>
	);
}
