
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from './types';
import { GeminiService } from './services/geminiService';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import TopicActions from './components/TopicActions';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Saudações, meu filho. Sou um assistente teológico aqui para caminhar com você através das Escrituras. Qual dúvida, fardo ou busca por sabedoria você traz hoje? Sinta-se à vontade para compartilhar também links para análise bíblica.',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const geminiRef = useRef<GeminiService | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    geminiRef.current = new GeminiService();
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    const initialModelMessage: Message = {
      id: modelMessageId,
      role: 'model',
      content: '',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, initialModelMessage]);

    try {
      let fullResponse = '';
      const stream = geminiRef.current?.sendMessageStream(textToSend);
      
      if (stream) {
        for await (const chunk of stream) {
          fullResponse += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === modelMessageId ? { ...msg, content: fullResponse } : msg
            )
          );
        }
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === modelMessageId
            ? { ...msg, content: "Sinto muito. Houve uma interrupção em nossa conexão espiritual. Por favor, tente novamente." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#fefae0] divine-gradient">
      {/* Padrão de fundo decorativo */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <svg width="100%" height="100%">
          <pattern id="cross-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 10V30M10 20H30" stroke="#604439" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#cross-pattern)" />
        </svg>
      </div>

      <Header />

      <main className="flex-1 overflow-hidden flex flex-col items-center px-4 md:px-6">
        <div className="w-full max-w-4xl flex flex-col h-full bg-white/40 backdrop-blur-sm rounded-t-[3rem] border-x border-t border-white/60 divine-shadow mt-4">
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar space-y-4"
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4 animate-pulse">
                <div className="bg-white px-4 py-2 rounded-2xl text-xs text-[#a98467] italic font-serif-biblical">
                  Buscando sabedoria nas Escrituras...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 md:p-6 border-t border-[#faedcd]/50 bg-white/60">
            <TopicActions onSelect={(p) => handleSend(p)} />
            
            <div className="relative mt-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua dúvida ou cole um link para análise..."
                rows={2}
                className="w-full px-6 py-4 pr-16 bg-white border border-[#faedcd] rounded-3xl focus:ring-2 focus:ring-[#d4a373] focus:border-transparent outline-none resize-none shadow-sm text-[#604439] placeholder-[#a98467]/50 font-serif-biblical"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className={`absolute right-3 bottom-3 p-3 rounded-2xl transition-all duration-300 ${
                  isLoading || !input.trim() 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#d4a373] text-white hover:bg-[#bc8a5f] shadow-md hover:scale-105'
                }`}
                title="Enviar mensagem"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-center text-[10px] text-[#a98467] mt-3 uppercase tracking-widest opacity-60">
              Pedi, e dar-se-vos-á • Buscai, e encontrareis
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
