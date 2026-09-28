import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SignalField } from '../components/visual/SignalField';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center relative overflow-hidden px-4 selection:bg-accent-soft selection:text-accent-solid">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <SignalField compact />
      </div>

      <div className="relative z-10 w-full max-w-md border border-border-subtle bg-panel/90 backdrop-blur-md p-8 md:p-10 shadow-2xl">
        <div className="mb-8">
          <div className="h-px bg-accent-border/40 mb-6" />
          <p className="text-[10px] font-mono tracking-[0.25em] text-accent-solid uppercase mb-2">// ACCESS PORTAL</p>
          <div className="leading-none mb-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-text-primary uppercase">THREAT</span>
            <span className="text-xs font-light tracking-[0.4em] text-accent-solid uppercase ml-1">LENS</span>
          </div>
          <h1 className="text-2xl font-light text-text-primary leading-snug">
            Authorized
            <span className="block font-semibold tracking-tight">Intelligence Access</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 font-mono">
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-2">Username</label>
            <input
              type="text"
              required
              className="w-full bg-input border border-border-subtle rounded-[4px] px-3.5 py-2.5 text-xs text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-border transition-colors"
              placeholder="Enter investigator ID"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full bg-input border border-border-subtle rounded-[4px] pl-3.5 pr-10 py-2.5 text-xs text-text-primary focus:outline-none focus:border-accent-border transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent-solid transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full font-mono uppercase tracking-widest text-xs h-10 mt-2" showArrow>
            Access System
          </Button>
        </form>

        <footer className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap gap-x-4 gap-y-1 justify-center text-[9px] font-mono tracking-[0.15em] uppercase text-text-muted">
          <span>Secure Access</span>
          <span>•</span>
          <span>Audit Logged</span>
          <span>•</span>
          <span>Authorized Personnel Only</span>
        </footer>
      </div>
    </div>
  );
};

export default Login;
