import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login simply redirects to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#060D15] flex items-center justify-center relative overflow-hidden">
      {/* Background Texture (faint mountain/landscape mockup via radial gradient) */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent-soft via-canvas to-canvas pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[380px] bg-card border border-border-subtle rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full border border-accent-border bg-accent-soft flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6 text-accent-solid" />
          </div>
          <h1 className="text-lg font-bold text-white tracking-wide">ThreatLens</h1>
          <h2 className="text-xl font-semibold text-white mt-4">Sign in to your account</h2>
          <p className="text-xs text-text-muted mt-2">Authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-1.5">
              Username
            </label>
            <input
              type="text"
              className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border focus:ring-1 focus:ring-accent-border transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-input border border-border-subtle rounded-lg pl-3 pr-10 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border focus:ring-1 focus:ring-accent-border transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-11 text-[15px] mt-2">
            Sign In
          </Button>
        </form>

        <div className="mt-8 flex justify-center items-center space-x-2 text-[11px] text-text-muted">
          <span>Secure Access</span>
          <span>•</span>
          <span>Audit Logged</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
