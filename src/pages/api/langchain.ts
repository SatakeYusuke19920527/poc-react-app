import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { BingSerpAPI } from 'langchain/tools'
import { Calculator } from 'langchain/tools/calculator'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const input = req.body.message;
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.9,
      topP: 1,
    })
    const tools = [
      new BingSerpAPI(
        process.env.AZURE_BINGSEARCH_API_KEY,
        { 'mkt': 'ja-JP' },
      ),
      new Calculator()
    ]

    const executor = await initializeAgentExecutorWithOptions(
      tools,
      llm,
      {
        agentType: 'chat-conversational-react-description',
        verbose: true
      }
    )

    const result = await executor.call({ input });

    return res.json({ result })

  } catch (error) {
    console.log('🚀 ~ file: langchain.ts:20 ~ error:', error);
    return res.json({ message: "エラー" })
  }
}