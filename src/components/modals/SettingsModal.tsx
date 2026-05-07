import { motion } from 'framer-motion';
import { X, Key, Trash, ArrowsCounterClockwise } from '@phosphor-icons/react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiToken: string;
  setApiToken: (token: string) => void;
}

export function SettingsModal({ onClose, apiToken, setApiToken }: SettingsModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-light-border dark:border-dark-border rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-light-border dark:border-dark-border">
          <h2 className="text-xl font-bold tracking-tight">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Key size={18} className="text-accent" />
              <h3 className="font-bold">API Configuration</h3>
            </div>
            <p className="text-sm text-light-text-subtle dark:text-dark-text-subtle mb-4 leading-relaxed">
              Enter your NVIDIA or custom API token to enable high-performance models.
            </p>
            <input 
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="nvapi-...................."
              className="w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-accent outline-none transition-all font-mono text-sm"
            />
          </section>

          <section className="pt-8 border-t border-light-border dark:border-dark-border">
            <h3 className="font-bold mb-4">Data Management</h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-bold">
                <span className="flex items-center gap-2"><ArrowsCounterClockwise size={18} /> Export Data</span>
              </button>
              <button className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-bold">
                <span className="flex items-center gap-2"><Trash size={18} /> Clear All Chats</span>
              </button>
            </div>
          </section>
        </div>

        <div className="px-8 py-6 bg-zinc-50 dark:bg-zinc-800/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-accent text-white font-bold hover:bg-accent-hover transition-all active:scale-95 shadow-lg shadow-accent/20"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
