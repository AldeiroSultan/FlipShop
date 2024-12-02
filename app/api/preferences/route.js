// app/api/preferences/route.js
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { preferences, detailedPreferences } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a shopping assistant that helps refine product searches.
                   Convert user preferences into specific search parameters for eBay.`
        },
        {
          role: "user",
          content: `Current preferences: ${JSON.stringify(preferences)}
                   Detailed preferences: ${detailedPreferences}
                   Generate search parameters that will find relevant products.`
        }
      ]
    })

    const searchParams = {
      ...preferences,
      keywords: completion.choices[0].message.content,
    }

    return Response.json({ searchParams })
  } catch (error) {
    console.error('AI API error:', error)
    return Response.json({ error: 'Failed to process preferences' }, { status: 500 })
  }
}