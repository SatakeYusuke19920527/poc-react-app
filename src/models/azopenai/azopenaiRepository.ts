import { AzureKeyCredential, OpenAIClient } from '@azure/openai';

export class AzOpenaiRepository {
  async getAzOpenAIData(message: string) {
    console.log('start', process.env.AZURE_OPENAI_API_ENDPOINT!);
    return new Promise(async (resolve, reject) => {
      const endpoint = process.env.AZURE_OPENAI_API_ENDPOINT!;
      const azureApiKey = process.env.AZURE_OPENAI_API_KEY!;
      const deploymentId = process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME!;
      const content = `
      ${message}
      `;
      try {
        const messages = [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content,
          },
        ];
        const client = new OpenAIClient(
          endpoint,
          new AzureKeyCredential(azureApiKey)
        );

        const result = await client.getChatCompletions(deploymentId, messages);
        resolve(result.choices);
      } catch (error: any) {
        console.log(
          '🚀 ~ file: openaiRepository.ts:29 ~ AzOpenaiRepository ~ returnnewPromise ~ error:',
          error
        );
        reject(error);
      }
    });
  }
}