import { useState } from 'react';
import { 
  Sun, 
  Moon, 
  List, 
  User, 
  CaretDown, 
  Cpu 
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  onOpenAuth: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const MODELS = [
  { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'Pollinations' },
  { id: 'gpt-5-nano', name: 'GPT-5 Nano', provider: 'Pollinations' },
  { id: 'gemini', name: 'Gemini', provider: 'Pollinations' },
  { id: 'deepseek-reasoning', name: 'DeepSeek Reasoning', provider: 'Pollinations' },
  { id: 'nvidia/llama-3.1-405b-instruct', name: 'NVIDIA Llama 3.1 405B', provider: 'NVIDIA' },
];

export function Header({ 
  theme, 
  toggleTheme, 
  isSidebarOpen, 
  setIsSidebarOpen, 
  onOpenAuth,
  selectedModel,
  setSelectedModel
}: HeaderProps) {
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const currentModel = MODELS.find(m => m.id === selectedModel) || MODELS[0];

  return (
    <header className="flex items-center justify-between px-6 py-4 h-16 border-b border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-background/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="List"
            className="p-2 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-800/30 transition-colors"
          >
            <List size={20} />
          </button>
        )}
        
        <div className="relative">
          <button 
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-light-border dark:border-dark-border hover:border-accent transition-all duration-200 bg-white dark:bg-zinc-800 shadow-sm"
          >
            <Cpu size={18} className="text-accent" />
            <span className="text-sm font-semibold">{currentModel.name}</span>
            <CaretDown size={14} className={cn("transition-transform duration-200", isModelDropdownOpen && "rotate-180")} />
          </button>

          {isModelDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-light-border dark:border-dark-border rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id);
                    setIsModelDropdownOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-start w-full px-4 py-3 rounded-xl transition-all duration-200",
                    selectedModel === model.id 
                      ? "bg-accent/10 text-accent border border-accent/20" 
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent"
                  )}
                >
                  <span className="text-sm font-bold">{model.name}</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">{model.provider}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-light-border dark:border-dark-border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-90"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <button 
          onClick={onOpenAuth}
          className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-zinc-800 shadow-sm hover:border-accent transition-all duration-200 group active:scale-[0.98]"
        >
          <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <User size={16} weight="bold" />
          </div>
          <span className="text-sm font-bold group-hover:text-accent transition-colors">Sign In</span>
        </button>
      </div>
    </header>
  );
}
