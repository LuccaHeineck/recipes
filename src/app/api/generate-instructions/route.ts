// app/api/generate-instructions/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

console.log("aAAAAAAAAAAAAAAA")
console.log("OpenAI key:", process.env.OPENAI_API_KEY ? "loaded" : "missing");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface RequestBody {
  title: string;
  description: string;
}

export async function POST(req: NextRequest) {
  try {
    console.log("OpenAI key:", process.env.OPENAI_API_KEY ? "loaded" : "missing");

    console.log("aAAAAAAAAAAAAAAA")
    const { title, description }: RequestBody = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const prompt = `Write detailed cooking instructions for a recipe titled "${title}" with the following description: ${description}.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or your preferred model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const instructions = completion.choices[0].message?.content ?? "";

    return NextResponse.json({ instructions });
  } catch (error) {
    console.error("OpenAI key:", process.env.OPENAI_API_KEY ? "loaded" : "missing");

    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: "Failed to generate instructions" }, { status: 500 });
  }
}
