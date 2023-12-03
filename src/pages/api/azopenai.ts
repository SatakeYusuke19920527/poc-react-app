import { getAzOpenAIData } from '@/models/azopenai/azopenaiApplicationService';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const message = req.body.message;
    const data = await getAzOpenAIData(message);
    res.json(data);
  } catch (error) {
    console.log('🚀 ~ file: hello.ts:13 ~ error:', error);
  }
}