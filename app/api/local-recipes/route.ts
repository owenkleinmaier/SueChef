import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function POST(req: Request) {
  try {
    const { location } = await req.json();

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    // Check if API key is set and use OpenAI if available
    if (!process.env.OPENAI_API_KEY || !openai) {
      // Fallback recipes when API key is not available
      const fallbackRecipes = [
        {
          name: "Classic Pasta Dish",
          description: "Traditional pasta with local ingredients and flavors",
          cookTime: "25 min",
          difficulty: "Easy"
        },
        {
          name: "Regional Soup",
          description: "Hearty local soup with seasonal vegetables",
          cookTime: "45 min",
          difficulty: "Medium"
        },
        {
          name: "Local Bread",
          description: "Traditional bread recipe from the region",
          cookTime: "2 hours",
          difficulty: "Medium"
        },
        {
          name: "Seasonal Salad",
          description: "Fresh salad with regional produce and dressing",
          cookTime: "15 min",
          difficulty: "Easy"
        },
        {
          name: "Traditional Stew",
          description: "Slow-cooked stew with local meat and vegetables",
          cookTime: "1.5 hours",
          difficulty: "Medium"
        },
        {
          name: "Regional Dessert",
          description: "Sweet treat traditional to the local area",
          cookTime: "40 min",
          difficulty: "Hard"
        },
        {
          name: "Local Appetizer",
          description: "Small bite representing regional flavors",
          cookTime: "20 min",
          difficulty: "Easy"
        }
      ];
      
      return NextResponse.json({ recipes: fallbackRecipes });
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
    
    // Additional fallback for any other errors
    const fallbackRecipes = [
      {
        name: "Simple Local Dish",
        description: "Easy recipe using common local ingredients",
        cookTime: "30 min",
        difficulty: "Easy"
      }
    ];
    
    return NextResponse.json({ recipes: fallbackRecipes });
  }
}