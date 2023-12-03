import { AzOpenaiRepository } from './azopenaiRepository';

export const getAzOpenAIData = async (message: string) => {
  try {
    const repo = new AzOpenaiRepository();
    return await repo.getAzOpenAIData(message);
  } catch (err) {
    return err;
  }
};