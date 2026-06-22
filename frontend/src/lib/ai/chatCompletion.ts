import { callAIEndpoint } from './aiClient';

const ENDPOINT = 'http://localhost:8000/query';

export async function getChatCompletion(
  provider: string,
  model: string,
  messages: any[],
  parameters: object = {}
) {
  const lastMessage = messages[messages.length - 1];

  const question =
    lastMessage?.content ||
    lastMessage?.message ||
    lastMessage?.parts?.[0]?.text ||
    "";

  if (!question) throw new Error("No valid message");

  const token = localStorage.getItem('token');

  const res = await callAIEndpoint(
    ENDPOINT,
    {
      question: question,
    },
    {
      Authorization: `Bearer ${token}`, // 🔥 ADD THIS
    }
  );

  return {
    choices: [
      {
        message: {
          content: res.response || "No response"
        }
      }
    ]
  };
}