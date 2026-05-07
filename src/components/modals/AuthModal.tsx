import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, GoogleLogo, EnvelopeSimple, Lock, ArrowRight } from '@phosphor-icons/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

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
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-light-border dark:border-dark-border rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {mode === 'signin' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-sm text-light-text-subtle dark:text-dark-text-subtle">
              Enter your details to access your workspace
            </p>
          </div>

          <div className="space-y-4">
            <button className="flex items-center justify-center gap-3 w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-zinc-800 border border-light-border dark:border-dark-border shadow-sm hover:border-accent transition-all duration-200 font-bold active:scale-[0.98]">
              <GoogleLogo size={20} className="text-red-500" />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-[1px] bg-light-border dark:bg-dark-border" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-light-text-subtle dark:text-dark-text-subtle opacity-50">or</span>
              <div className="flex-1 h-[1px] bg-light-border dark:bg-dark-border" />
            </div>

            <div className="space-y-3">
              <div className="relative">
                <EnvelopeSimple size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text-subtle" />
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-accent outline-none transition-all text-sm font-medium"
                />
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text-subtle" />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-accent outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full py-4 px-4 rounded-2xl bg-accent text-white font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all active:scale-[0.98] mt-4">
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>

          <p className="mt-8 text-center text-sm">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-accent font-bold hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
