import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  // System prompt to guide the AI assistant
  const systemMessage = {
    role: "system" as const,
    content: `You are RAFIKI, a helpful multilingual assistant for African Leadership Academy (ALA) students. 
    
Your role is to:
- Help students translate words and phrases between English, French, Swahili, Arabic, and Portuguese
- Provide information about campus locations, facilities, and resources
- Explain ALA programs like TAALU (The African Leadership Academy Leadership University) and UMUZI (residential houses)
- Answer questions about student life, events, and activities
- Link to relevant handbook sections when appropriate
- Be warm, friendly, and supportive - remember many students are new and may be homesick

When translating:
- Provide the translation in the requested language
- Include pronunciation guidance when helpful
- Offer context about when to use certain phrases

When discussing locations:
- Be specific about building names and landmarks
- Mention nearby reference points
- Suggest the best routes when relevant

Always be encouraging and remind students that it's okay to ask for help. You're their friend (rafiki means "friend" in Swahili).`,
  }

  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: [systemMessage, ...prompt],
    abortSignal: req.signal,
    maxOutputTokens: 1000,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("[v0] Chat request aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
