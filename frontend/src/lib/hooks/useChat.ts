'use client';

import { useState, useCallback } from 'react';
import { getChatCompletion } from '@/lib/ai/chatCompletion';

export function useChat(provider: string = "OLLAMA", model: string = "phi") {
  const [response, setResponse] = useState<string>('');
  const [fullResponse, setFullResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(
    async (messages: any[], parameters: object = {}) => {
      // 🔥 Validate messages
      if (!messages || messages.length === 0) {
        setError(new Error("No messages provided"));
        return;
      }

      setResponse('');
      setFullResponse(null);
      setIsLoading(true);
      setError(null);

      try {
        // 🔥 Call backend (RAG API)
        const result = await getChatCompletion(
          provider,
          model,
          messages,
          parameters
        );

        // 🔥 Extract response safely
        const content =
        result?.choices?.[0]?.message?.content ||
        (result as any)?.response ||
        '';

        setFullResponse(result);
        setResponse(content);

      } catch (err) {
        console.error("Chat Error:", err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    },
    [provider, model]
  );

  return {
    response,
    fullResponse,
    isLoading,
    error,
    sendMessage
  };
}