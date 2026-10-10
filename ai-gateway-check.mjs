import { generateText } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

const apiKey = process.env.AI_GATEWAY_API_KEY || 'bad-key';
const gateway = createGateway({ apiKey });

try {
  const result = await generateText({
    model: gateway('moonshotai/kimi-k3'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(result.text);
} catch (err) {
  console.error('ERROR:', err?.name || 'Error');
  console.error(err?.message || String(err));
  process.exitCode = 1;
}
