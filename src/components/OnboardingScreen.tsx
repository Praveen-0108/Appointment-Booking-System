/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Sparkles, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { BusinessConfig } from '../types';

interface OnboardingScreenProps {
  config: BusinessConfig;
  onComplete: (user: { name: string; email: string; phone: string }) => void;
}

export default function OnboardingScreen({ config, onComplete }: OnboardingScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pwVisible, setPwVisible] = useState(false);
  const [error, setError] = useState('');

  const nextSlide = () => {
    if (currentPage < config.onboarding.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowLogin(true);
    }
  };

  const handleQuickDemoFill = () => {
    setName('Alex Peterson');
    setEmail('alex.peterson@demo.com');
    setPhone('(415) 333-7281');
    setError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a contact phone number.');
      return;
    }
    setError('');
    onComplete({ name, email, phone });
  };

  const currentStep = config.onboarding[currentPage];

  // Neon active color highlights matching business domains
  const colorMap: Record<string, { bg: string; text: string; fill: string }> = {
    emerald: { bg: 'bg-emerald-500 lg:hover:bg-emerald-400', text: 'text-emerald-400', fill: 'fill-emerald-400' },
    rose: { bg: 'bg-rose-500 lg:hover:bg-rose-400', text: 'text-rose-400', fill: 'fill-rose-400' },
    indigo: { bg: 'bg-indigo-500 lg:hover:bg-indigo-400', text: 'text-indigo-400', fill: 'fill-indigo-400' },
    orange: { bg: 'bg-orange-500 lg:hover:bg-orange-400', text: 'text-orange-400', fill: 'fill-orange-400' }
  };

  const activeColor = colorMap[config.primaryColor] || colorMap.emerald;

  return (
    <div className="h-full flex flex-col justify-between bg-neutral-950 text-neutral-300 font-sans relative overflow-hidden" id="onboarding-root">
      <AnimatePresence mode="wait">
        {!showLogin ? (
          <motion.div
            key={`slide-${currentPage}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-between p-6"
            id={`slide-container-${currentPage}`}
          >
            {/* Header / Brand info */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1.5">
                <span className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-850">
                  <Sparkles className={`w-4 h-4 ${activeColor.text}`} />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-display">
                  {config.name}
                </span>
              </div>
              <button
                id="skip-onboarding-btn"
                onClick={() => setShowLogin(true)}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                Skip
              </button>
            </div>

            {/* Glowing Digital Illustration container */}
            <div className="my-auto py-6 flex flex-col items-center">
              <div className="w-44 h-44 rounded-full flex items-center justify-center relative mb-8 shadow-2xl bg-gradient-to-tr from-neutral-900 to-neutral-950 border border-neutral-800">
                <div className="absolute inset-0 rounded-full bg-neutral-800/10 animate-pulse" />
                <div className="w-32 h-32 rounded-full bg-neutral-950/80 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center border border-neutral-850/60 shadow-inner">
                  <p className="font-display text-xl font-extrabold tracking-widest text-white">AURA</p>
                  <span className={`text-[10px] uppercase tracking-widest ${activeColor.text} font-bold`}>{config.id}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold font-display text-white text-center tracking-tight leading-7 mb-3">
                {currentStep.title}
              </h2>
              <p className="text-xs font-sans text-neutral-400 text-center leading-relaxed max-w-xs">
                {currentStep.description}
              </p>
            </div>

            {/* Interactive Slide Dots and capsule action button */}
            <div className="space-y-6">
              <div className="flex justify-center gap-1.5" id="slide-indicators">
                {config.onboarding.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentPage ? `w-6 ${activeColor.bg}` : 'w-1.5 bg-neutral-800'
                    }`}
                    id={`onboarding-dot-${i}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                id="onboarding-next-btn"
                onClick={nextSlide}
                className="w-full py-3.5 px-4 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98 bg-white hover:bg-neutral-200 text-black text-xs uppercase tracking-widest font-display"
              >
                {currentPage === config.onboarding.length - 1 ? 'Get Started' : 'Next Screen'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login-form-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex-1 flex flex-col justify-between p-6"
            id="login-panel"
          >
            {/* Upper Section */}
            <div>
              <div className="flex items-center gap-2 mt-2 mb-6">
                <button
                  id="login-back-btn"
                  onClick={() => setShowLogin(false)}
                  className="p-1 px-2.5 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-850 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  Close
                </button>
                <div className="h-4 w-px bg-neutral-800 mx-1" />
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{config.name}</span>
              </div>

              <h2 className="text-xl font-bold font-display text-white tracking-tight leading-7 mb-2">
                Create Account
              </h2>
              <p className="text-xs text-neutral-450 leading-relaxed max-w-xs mb-5">
                Join {config.name} for immediate bookings, detailed medical histories, and instant reminders.
              </p>

              {/* Demo Assist Box */}
              <div className="bg-neutral-900/60 border border-neutral-850/50 rounded-xl p-3.5 mb-5 flex flex-col justify-between" id="demo-filler-box">
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-200 flex items-center gap-1.5 font-display">
                      <Sparkles className={`w-3.5 h-3.5 ${activeColor.text}`} />
                      Prototype Demo Mode
                    </h4>
                    <p className="text-[11px] text-neutral-450 mt-1 leading-normal">
                      Skip manual friction! Instantly populate customer profiles with valid mock details.
                    </p>
                  </div>
                  <button
                    type="button"
                    id="demo-fill-btn"
                    onClick={handleQuickDemoFill}
                    className={`text-[11px] font-bold tracking-wide py-1 px-2.5 rounded-lg border border-neutral-800 shadow-sm cursor-pointer bg-neutral-950 transition hover:bg-neutral-900 hover:border-neutral-750 ${activeColor.text}`}
                  >
                    Auto Fill
                  </button>
                </div>
              </div>

              {/* Form elements styled precisely for Elegant Dark */}
              <form onSubmit={handleLoginSubmit} className="space-y-3" id="booking-login-form">
                {error && (
                  <p className="text-xs font-medium text-red-400 bg-red-950/25 border border-red-900/40 p-2.5 rounded-xl" id="login-error-msg">
                    {error}
                  </p>
                )}

                {/* Name */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    id="user-name-input"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    placeholder="Your Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-900/40 border border-neutral-850 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    id="user-email-input"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="Your Email Address"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-900/40 border border-neutral-850 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    id="user-phone-input"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError(''); }}
                    placeholder="Your Phone Number"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-900/40 border border-neutral-850 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                  />
                </div>

                {/* Dummy password line securely */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={pwVisible ? 'text' : 'password'}
                    id="user-password-input"
                    value="••••••••••••••"
                    disabled
                    className="w-full pl-10 pr-10 py-3 bg-neutral-950/40 border border-neutral-900/70 text-neutral-600 rounded-xl text-xs focus:outline-none cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setPwVisible(!pwVisible)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none"
                  >
                    {pwVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-auto">
              <button
                type="submit"
                id="login-submit-btn"
                onClick={handleLoginSubmit}
                className="w-full py-3.5 px-4 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98 bg-white hover:bg-neutral-200 text-black text-xs uppercase tracking-widest font-display"
              >
                Continue to Booking
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-neutral-500 mt-3 max-w-xs mx-auto">
                By accessing this prototype, you simulate accepting HIPAA records handling policies, HIPAA privacy rules, and terms of communication.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
