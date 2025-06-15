"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { SunMoon } from "lucide-react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint
		}

		handleResize(); // initial check
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Button
			variant="default"
			size={isMobile ? "icon" : "default"}
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className={isMobile ? "p-2 w-12 h-12" : ""}
			aria-label="Toggle theme"
		>
			{isMobile ? (
			<SunMoon className="h-8 w-8 min-w-6 min-h-6" />
			) : (
			'Toggle Theme'
			)}

		</Button>
	);
}
