import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ChatArea } from './components/chat/ChatArea';
import { InputSection } from './components/chat/InputSection';
import { SettingsModal } from './components/modals/SettingsModal';
import { AuthModal } from './components/modals/AuthModal';
import { AnimatePresence } from 'framer-motion';
import { useChat } from './hooks/useChat';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: number;
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [apiToken, setApiToken] = useState('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');
  const [selectedModel, setSelectedModel] = useState('nvidia/llama-3.1-405b-instruct');

  const { sendMessage, isStreaming } = useChat();

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    
    // Load chats from local storage
    const savedChats = localStorage.getItem('fronix_chats');
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) setActiveChatId(parsed[0].id);
    }

    const savedToken = localStorage.getItem('nv_api_token');
    if (savedToken) setApiToken(savedToken);
  }, []);

  useEffect(() => {
    localStorage.setItem('fronix_chats', JSON.stringify(chats));
  }, [chats]);

  const handleSetApiToken = (token: string) => {
    setApiToken(token);
    localStorage.setItem('nv_api_token', token);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Math.random().toString(36).substring(7),
      title: 'New Chat',
      messages: [],
      model: selectedModel,
      createdAt: Date.now(),
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id: string) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  const renameChat = (id: string, newTitle: string) => {
    setChats(prev => prev.map(c => c.id === id ? { ...c, title: newTitle } : c));
  };

  const handleSendMessage = useCallback(async (content: string) => {
    let currentChatId = activeChatId;
    
    // 1. Create chat if none active
    if (!currentChatId) {
      currentChatId = Math.random().toString(36).substring(7);
      const newChat: Chat = {
        id: currentChatId,
        title: content.substring(0, 30),
        messages: [],
        model: selectedModel,
        createdAt: Date.now(),
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(currentChatId);
    }

    // 2. Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setChats(prev => prev.map(c => 
      c.id === currentChatId 
        ? { ...c, messages: [...c.messages, userMessage] }
        : c
    ));

    // 3. Add assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setChats(prev => prev.map(c => 
      c.id === currentChatId 
        ? { ...c, messages: [...c.messages, assistantMessage] }
        : c
    ));

    // 4. Stream response
    await sendMessage(content, selectedModel, apiToken, (chunk) => {
      setChats(prev => prev.map(c => 
        c.id === currentChatId 
          ? { 
              ...c, 
              messages: c.messages.map(m => 
                m.id === assistantMessageId 
                  ? { ...m, content: m.content + chunk }
                  : m
              ) 
            }
          : c
      ));
    });
  }, [activeChatId, selectedModel, apiToken, sendMessage]);

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-light-background dark:bg-dark-background font-outfit transition-colors duration-300">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        onCreateChat={createNewChat}
        onDeleteChat={deleteChat}
        onRenameChat={renameChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="flex-1 flex flex-col relative min-w-0">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onOpenAuth={() => setIsAuthOpen(true)}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        
        <ChatArea chat={activeChat} />
        
        <InputSection 
          onSendMessage={handleSendMessage}
          isStreaming={isStreaming}
        />
      </main>

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)}
            apiToken={apiToken}
            setApiToken={handleSetApiToken}
          />
        )}
        {isAuthOpen && (
          <AuthModal 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
