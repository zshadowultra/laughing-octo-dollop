import React, { useState, useRef } from 'react';
import { 
  PaperPlaneTilt, 
  Plus, 
  Image as ImageIcon, 
  Globe, 
  Sparkle, 
  Books,
  X,
  ArrowsCounterClockwise
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface InputSectionProps {
  onSendMessage: (content: string) => void;
  isStreaming: boolean;
}

export function InputSection({ onSendMessage, isStreaming }: InputSectionProps) {
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSendMessage(input);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleTool = (tool: string) => {
    setActiveTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-light-background dark:from-dark-background via-light-background/90 dark:via-dark-background/90 to-transparent pointer-events-none">
      <div className="max-w-3xl mx-auto w-full pointer-events-auto">
        
        {/* Active Tool Badges */}
        <AnimatePresence>
          {activeTools.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {activeTools.map(tool => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/20 cursor-pointer hover:bg-accent/20 transition-colors"
                  onClick={() => toggleTool(tool)}
                >
                  {tool} <X size={10} />
                </motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>

        <div className="relative group">
          <div className="absolute inset-0 bg-accent/20 blur-3xl opacity-0 group-focus-within:opacity-20 transition-opacity pointer-events-none" />
          
          <div className="relative flex items-end gap-2 p-2 bg-white dark:bg-zinc-900 border border-light-border dark:border-dark-border rounded-[2rem] shadow-2xl focus-within:border-accent/50 transition-all duration-300">
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-90",
                  isMenuOpen && "bg-accent/10 text-accent rotate-45"
                )}
              >
                <Plus size={22} weight="bold" />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-full left-0 mb-4 p-2 bg-white dark:bg-zinc-900 border border-light-border dark:border-dark-border rounded-2xl shadow-2xl z-50 flex flex-col gap-1 min-w-[160px]"
                  >
                    <ToolButton icon={<ImageIcon size={18} />} label="Image Gen" onClick={() => { toggleTool('Image Gen'); setIsMenuOpen(false); }} />
                    <ToolButton icon={<Globe size={18} />} label="Web Search" onClick={() => { toggleTool('Web Search'); setIsMenuOpen(false); }} />
                    <ToolButton icon={<Sparkle size={18} />} label="Thinking" onClick={() => { toggleTool('Thinking'); setIsMenuOpen(false); }} />
                    <ToolButton icon={<Books size={18} />} label="Study Mode" onClick={() => { toggleTool('Study Mode'); setIsMenuOpen(false); }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1 max-h-60 bg-transparent border-none focus:ring-0 py-3 px-2 text-[15px] resize-none overflow-y-auto font-medium placeholder:text-light-text-subtle/50 dark:placeholder:text-dark-text-subtle/50"
            />

            <button
              onClick={() => handleSubmit()}
              disabled={!input.trim() || isStreaming}
              className={cn(
                "p-3 rounded-2xl transition-all duration-300 active:scale-90 relative overflow-hidden",
                input.trim() && !isStreaming
                  ? "bg-accent text-white shadow-lg shadow-accent/30" 
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
              )}
            >
              {isStreaming ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <ArrowsCounterClockwise size={22} weight="bold" />
                </motion.div>
              ) : (
                <PaperPlaneTilt size={22} weight="bold" />
              )}
            </button>
          </div>
        </div>
        
        <p className="mt-3 text-[10px] text-center text-light-text-subtle dark:text-dark-text-subtle opacity-50 font-medium">
          Fronix.ai can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}

function ToolButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-bold transition-all duration-200"
    >
      <span className="text-accent">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
