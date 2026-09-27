import { useState } from 'react';
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
    <div className="min-h-screen bg-canvas flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <SignalField compact />
      </div>

      <div className="relative z-10 w-full max-w-md border border-border-subtle bg-panel/90 backdrop-blur-sm p-8 md:p-10">
        <div className="mb-10">
          <p className="text-xs tracking-[0.35em] font-semibold text-text-primary">THREATLENS</p>
          <h1 className="mt-6 text-2xl font-light text-text-primary leading-snug">
            Authorized
            <span className="block font-semibold tracking-tight">Intelligence Access</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="meta-label block mb-2">Username</label>
            <input
              type="text"
              required
              className="w-full bg-input border border-border-subtle rounded-md px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-border"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="meta-label block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full bg-input border border-border-subtle rounded-md pl-3 pr-10 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent-border"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full uppercase tracking-widest text-xs" showArrow>
            Access System
          </Button>
        </form>

        <footer className="mt-10 pt-6 border-t border-border-subtle flex flex-wrap gap-x-4 gap-y-1 justify-center meta-label text-text-muted">
          <span>Secure Access</span>
          <span>Audit Logged</span>
          <span>Authorized Personnel Only</span>
        </footer>
      </div>
    </div>
  );
};

export default Login;
