import { 
  Plus, 
  Gear, 
  CaretLeft, 
  ChatTeardropText, 
  Trash, 
  PencilSimple 
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { Chat } from '../../App';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string) => void;
  onCreateChat: () => void;
  onOpenSettings: () => void;
}

export function Sidebar({ 
  isOpen, 
  setIsOpen, 
  chats, 
  activeChatId, 
  setActiveChatId, 
  onCreateChat,
  onOpenSettings
}: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isOpen ? 280 : 0,
        opacity: isOpen ? 1 : 0
      }}
      className={cn(
        "relative flex flex-col bg-light-sidebar dark:bg-dark-sidebar border-r border-light-border dark:border-dark-border overflow-hidden h-full z-20",
        !isOpen && "border-none"
      )}
    >
      <div className="p-4 flex flex-col h-full w-[280px]">
        <button
          onClick={onCreateChat}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-white dark:bg-zinc-800 border border-light-border dark:border-dark-border shadow-sm hover:border-accent transition-all duration-200 group active:scale-[0.98]"
        >
          <Plus size={20} className="group-hover:text-accent transition-colors" />
          <span className="font-medium">New Chat</span>
        </button>

        <div className="mt-8 flex-1 overflow-y-auto space-y-1 scrollbar-hide">
          <h3 className="px-3 mb-2 text-xs font-semibold text-light-text-subtle dark:text-dark-text-subtle uppercase tracking-widest">
            History
          </h3>
          <AnimatePresence initial={false}>
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  "group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 relative",
                  activeChatId === chat.id 
                    ? "bg-white dark:bg-zinc-800 shadow-sm border border-light-border dark:border-dark-border" 
                    : "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/30 border border-transparent"
                )}
                onClick={() => setActiveChatId(chat.id)}
              >
                <ChatTeardropText 
                  size={18} 
                  className={cn(activeChatId === chat.id ? "text-accent" : "text-light-text-subtle dark:text-dark-text-subtle")} 
                />
                <span className="flex-1 truncate text-sm font-medium">
                  {chat.title}
                </span>
                
                <div className="hidden group-hover:flex items-center gap-1">
                  <button className="p-1 hover:text-accent transition-colors">
                    <PencilSimple size={14} />
                  </button>
                  <button className="p-1 hover:text-red-500 transition-colors">
                    <Trash size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {chats.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center opacity-40">
              <ChatTeardropText size={32} weight="thin" className="mb-2" />
              <p className="text-xs">No conversations yet</p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-light-border dark:border-dark-border">
          <button 
            onClick={onOpenSettings}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-800/30 transition-all duration-200 active:scale-[0.98]"
          >
            <Gear size={20} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
      
      {/* Collapse button for mobile/desktop toggle */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-12 flex items-center justify-center bg-white dark:bg-zinc-800 border border-light-border dark:border-dark-border rounded-full shadow-sm z-30 hover:scale-110 transition-transform md:flex hidden"
      >
        <CaretLeft size={16} />
      </button>
    </motion.aside>
  );
}
