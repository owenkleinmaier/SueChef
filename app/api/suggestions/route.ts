import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { context } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.8,
      max_tokens: 200,
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant that generates food-related question suggestions. Generate exactly 5 diverse, interesting questions that someone might ask about food, recipes, or cooking. Make them varied - include questions about recipes, ingredients, cooking techniques, meal planning, and dietary considerations. Keep each question concise (under 15 words). Return ONLY a JSON array of strings, no other formatting.${context ? ` Consider this user context: ${context}` : ''}`
        },
        {
          role: 'user',
          content: 'Generate 5 food-related question suggestions.'
        }
      ],
    });

    const suggestionsText = response.choices[0]?.message?.content || '[]';
    const suggestions = JSON.parse(suggestionsText);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    
    // Fallback suggestions when API quota is exceeded
    const fallbackSuggestions = [
      "What's a quick weeknight dinner recipe?",
      "How do I cook perfect pasta?",
      "What spices go well with chicken?",
      "How can I meal prep for the week?",
      "What's a healthy breakfast option?"
    ];
    
    return NextResponse.json({ suggestions: fallbackSuggestions });
  }
}