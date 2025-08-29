import { useState } from 'react';
import { StandardHeader } from './BackArrow';
import Rectangle25 from '../imports/Rectangle25';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export function LoginScreen({ onBack, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // In a real app, this would handle actual authentication
    // For now, we'll just simulate a successful login
    onLoginSuccess();
  };

  return (
    <div className="size-full flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="size-full"
          style={{
            background: 'linear-gradient(180deg, #f8f9fa 0%, rgba(100, 41, 117, 0.3) 100%)'
          }}
        />
        <Rectangle25 />
      </div>

      {/* Header */}
      <StandardHeader onBack={onBack} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-8 overflow-hidden">
        {/* Title */}
        <div className="mb-3 mt-8">
          <h1 className="text-2xl text-black chat-text mb-1" style={{ fontWeight: 600 }}>
            Welcome back
          </h1>
          <p className="text-gray-600 chat-text text-sm">
            Sign in to your Codeword account
          </p>
        </div>

        {/* Form container */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="space-y-3 flex-shrink-0">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm text-gray-700 chat-text" style={{ fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white chat-text focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm text-gray-700 chat-text" style={{ fontWeight: 500 }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 pr-12 rounded-xl border border-gray-200 bg-white chat-text focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                  style={{ fontSize: '16px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-center pt-1">
              <button className="text-sm chat-text hover:underline" style={{ color: '#642975' }}>
                Forgot password?
              </button>
            </div>
          </div>

          {/* Bottom section with buttons */}
          <div className="flex-shrink-0">
            {/* Login Button */}
            <button 
              onClick={handleLogin}
              className="w-full text-white py-4 rounded-full chat-text transition-opacity hover:opacity-90 mb-3"
              style={{ backgroundColor: '#642975', fontWeight: 500 }}
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center mb-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-3 text-xs text-gray-500 chat-text">or continue with</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social Sign-In Buttons */}
            <div className="space-y-2 mb-3">
              <button 
                className="w-full bg-black text-white py-4 rounded-full flex items-center justify-center gap-3 chat-text transition-opacity hover:opacity-90"
                style={{ fontWeight: 500, fontSize: '14px' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
                  <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
                Continue with Apple
              </button>
              
              <button 
                className="w-full bg-white border border-gray-300 text-black py-4 rounded-full flex items-center justify-center gap-3 chat-text transition-colors hover:bg-gray-50"
                style={{ fontWeight: 500, fontSize: '14px' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mb-2">
              <span className="text-gray-600 chat-text text-sm">Don't have an account? </span>
              <button 
                onClick={onBack}
                className="chat-text hover:underline text-sm" 
                style={{ color: '#642975', fontWeight: 500 }}
              >
                Sign up
              </button>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}