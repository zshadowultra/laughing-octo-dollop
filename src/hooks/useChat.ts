import { useState, useCallback } from 'react';

export function useChat() {
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (
    content: string, 
    model: string, 
    apiToken: string,
    onChunk: (chunk: string) => void
  ) => {
    setIsStreaming(true);
    
    // Default system prompt
    const messages = [
      { role: 'system', content: 'You are Fronix, a high-performance AI assistant.' },
      { role: 'user', content }
    ];

    try {
      let response;
      
      if (model.startsWith('nvidia/')) {
        // NVIDIA API Call
        response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024,
            stream: true
          })
        });
      } else {
        // Fallback to Pollinations (example)
        const encodedContent = encodeURIComponent(content);
        response = await fetch(`https://text.pollinations.ai/${encodedContent}?model=${model}&json=true`);
        const data = await response.json();
        onChunk(data.choices[0].message.content);
        setIsStreaming(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            const message = line.replace(/^data: /, '');
            if (message === '[DONE]') break;
            
            try {
              const parsed = JSON.parse(message);
              const content = parsed.choices[0]?.delta?.content;
              if (content) onChunk(content);
            } catch (e) {
              console.error('Error parsing chunk', e);
            }
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      onChunk(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { sendMessage, isStreaming };
}
