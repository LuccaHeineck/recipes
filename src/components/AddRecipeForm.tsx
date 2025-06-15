'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Commented out
// import { Loader2 } from "lucide-react"; // Commented out

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [time, setTime] = useState(0);
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [vegan, setVegan] = useState(false);
  // const [loading, setLoading] = useState(false); // Commented out

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newRecipe = { title, image, time, description, instructions, vegan };

    await fetch("http://localhost:4000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });

    window.location.href = "/";
  }

  /*
  async function handleGenerateInstructions() {
    if (!title.trim() || !description.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("../api/generate-instructions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();

      if (res.ok && data.instructions) {
        setInstructions(data.instructions);
      } else {
        alert("Failed to generate instructions");
      }
    } catch (error) {
      console.error(error);
      alert("Error calling API");
    } finally {
      setLoading(false);
    }
  }
  */

  // const canGenerate = title.trim() !== "" && description.trim() !== "";

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        {/* Instructions textarea */}
        <div className="space-y-2 relative">
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea
            id="instructions"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            placeholder="Write the recipe instructions here..."
            className="min-h-[120px] resize-none pr-10"
          />

          {/* 
          {canGenerate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleGenerateInstructions}
                  disabled={loading}
                  className={`absolute top-9 right-2 p-1 rounded-md transition-colors ${
                    loading ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
                  }`}
                  aria-label="Generate instructions"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <span role="img" aria-label="magic wand">🪄</span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate instructions with AI</p>
              </TooltipContent>
            </Tooltip>
          )}
          */}
        </div>

        {/* Image */}
        <div className="space-y-2">
          <Label htmlFor="image">Image Filename</Label>
          <Input id="image" value={image} onChange={e => setImage(e.target.value)} />
        </div>

        {/* Time */}
        <div className="space-y-2">
          <Label htmlFor="time">Time (minutes)</Label>
          <Input
            id="time"
            type="number"
            value={time}
            onChange={e => setTime(Number(e.target.value))}
            className="no-spinner"
          />
        </div>

        {/* Vegan checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox id="vegan" checked={vegan} onCheckedChange={(v) => setVegan(!!v)} />
          <Label htmlFor="vegan">Vegan</Label>
        </div>

        <Button type="submit" className="mt-4">
          Add Recipe
        </Button>
      </form>
  );
}
