export async function* mockChatStream(message: string) {
  const responses = [
    "I'm a mock AI assistant since the Cloudflare Workers backend isn't running in this environment. ",
    "You asked: \"" + message + "\"\n\n",
    "To get the full AI experience, you'll need to deploy this to Cloudflare Workers. ",
    "For now, I can demonstrate the streaming text effect! ",
    "This message appears word by word as if it were coming from a real AI model. ",
    "Pretty cool, right? 😊"
  ]

  for (const chunk of responses) {
    await new Promise(resolve => setTimeout(resolve, 100))
    yield chunk
  }
}
