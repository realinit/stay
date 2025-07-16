"use client";

import React, { useState } from 'react';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: LoginData) => void;
  setIsSignupModalOpen: (isOpen: boolean) => void;
}

interface LoginData {
  phone: string;
  password?: string;
  otp?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  setIsSignupModalOpen,
}) => {
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    otp: '',
  });
  const [selectedCountry, setSelectedCountry] = useState('+91');

  const countries = [
    { code: '+91', name: 'India' },
    { code: '+62', name: 'Indonesia' },
    { code: '+60', name: 'Malaysia' },
    { code: '+971', name: 'UAE' },
    { code: '+66', name: 'Thailand' },
    { code: '+63', name: 'Philippines' },
    { code: '+84', name: 'Vietnam' },
    { code: '+966', name: 'Saudi Arabia' },
  ];

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'otp' && step === 'phone') {
      setStep('otp');
      return;
    }
    
    const loginData: LoginData = {
      phone: selectedCountry + formData.phone,
      ...(loginMethod === 'password' ? { password: formData.password } : { otp: formData.otp }),
    };
    
    onLogin(loginData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ phone: '', password: '', otp: '' });
    setStep('phone');
    setLoginMethod('password');
    onClose();
  };

  const handleResendOTP = () => {
    console.log('Resending OTP...');
    // Here you would typically call your API to resend OTP
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔐</span>
          </div>
          
          <Typography variant="h3" className="text-xl font-bold mb-2">
            Welcome Back
          </Typography>
          <Typography variant="body" className="text-blue-100">
            Sign in to your Jackstay account
          </Typography>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Login Method Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setLoginMethod('password')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                loginMethod === 'password'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setLoginMethod('otp')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                loginMethod === 'otp'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              OTP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-3 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  className="rounded-r-xl w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password or OTP */}
            {loginMethod === 'password' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            ) : step === 'otp' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleInputChange('otp')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            ) : null}

                         {/* Submit Button */}
             <button
               type="submit"
               className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
             >
               {loginMethod === 'otp' && step === 'phone' ? 'Send OTP' : 'Sign In'}
             </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Typography variant="small" color="secondary" className="mb-2">
              Don't have an account?
            </Typography>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 cursor-pointer"
                onClick={() => setIsSignupModalOpen(true)}
              >
                Sign up now
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 