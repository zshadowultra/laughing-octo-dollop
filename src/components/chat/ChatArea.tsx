import React from 'react';
import type { Chat } from '../../App';
import { Cpu, Sparkle, Lightning, Globe, Books } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ChatAreaProps {
  chat: Chat | null;
}

export function ChatArea({ chat }: ChatAreaProps) {
  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="max-w-2xl w-full"
        >
          <div className="mb-12 inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-accent/5 dark:bg-accent/10 text-accent shadow-2xl shadow-accent/20">
            <Cpu size={48} weight="duotone" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
            Meet <span className="text-accent">Fronix.ai</span>
          </h1>
          <p className="text-xl text-light-text-subtle dark:text-dark-text-subtle mb-12 max-w-[60ch] mx-auto leading-relaxed">
            Your high-performance AI workspace. Integrated with NVIDIA, Pollinations, and custom optimized models.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BentoCard 
              icon={<Sparkle size={24} className="text-amber-500" />}
              title="Creative Mode"
              description="Deep thinking and creative generation using advanced LLMs."
              delay={0.1}
            />
            <BentoCard 
              icon={<Lightning size={24} className="text-blue-500" />}
              title="NVIDIA Powered"
              description="Ultra-fast inference using NVIDIA NIM microservices."
              delay={0.2}
            />
            <BentoCard 
              icon={<Globe size={24} className="text-emerald-500" />}
              title="Real-time Web"
              description="Browse the live web for up-to-date facts and data."
              delay={0.3}
            />
            <BentoCard 
              icon={<Books size={24} className="text-indigo-500" />}
              title="Study Assistant"
              description="Optimized for complex problem solving and academic help."
              delay={0.4}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
      <div className="max-w-3xl mx-auto w-full space-y-8 pb-32">
        {chat.messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex group",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[85%] rounded-[2rem] p-5 md:p-6 shadow-sm",
              message.role === 'user' 
                ? "bg-accent text-white rounded-tr-none" 
                : "bg-white dark:bg-zinc-800 border border-light-border dark:border-dark-border rounded-tl-none"
            )}>
              <div className="prose dark:prose-invert max-w-none text-[15px] leading-relaxed">
                {message.content}
              </div>
              <div className={cn(
                "text-[10px] mt-2 opacity-50",
                message.role === 'user' ? "text-right text-white/70" : "text-left"
              )}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BentoCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-[2rem] bg-white dark:bg-zinc-800 border border-light-border dark:border-dark-border text-left hover:border-accent transition-all duration-300 group cursor-default"
    >
      <div className="mb-4 inline-flex p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-light-text-subtle dark:text-dark-text-subtle leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
