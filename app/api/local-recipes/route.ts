import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const { location } = await req.json();

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.8,
      max_tokens: 400,
      messages: [
        {
          role: 'system',
          content: `You are a culinary expert specializing in regional cuisines. Generate exactly 7 traditional or popular recipes from ${location}. Focus on authentic local dishes that represent the area's culinary heritage. Return ONLY a JSON array of objects with this structure: [{"name": "Recipe Name", "description": "Brief 10-15 word description", "cookTime": "e.g., 30 min", "difficulty": "Easy/Medium/Hard"}]. Make the recipes diverse - include appetizers, mains, and desserts.`
        },
        {
          role: 'user',
          content: `Generate 7 authentic recipes from ${location}.`
        }
      ],
    });

    let recipesText = response.choices[0]?.message?.content || '[]';
    console.log('Raw AI response:', recipesText);
    
    // Clean up the response - remove markdown code blocks if present
    recipesText = recipesText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    // Parse the cleaned JSON
    let recipes;
    try {
      recipes = JSON.parse(recipesText);
      console.log('Parsed recipes:', recipes);
    } catch (parseError) {
      console.error('Failed to parse recipes:', recipesText);
      // Fallback to empty array if parsing fails
      recipes = [];
    }

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Error generating local recipes:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipes' },
      { status: 500 }
    );
  }
}