/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, BookOpen, Sparkles, Activity, Sparkle, Briefcase, Flame, 
  Wifi, Battery, Signal, RefreshCw, Layers, CheckCircle2, Trophy 
} from 'lucide-react';

import { BUSINESS_DATA } from './data';
import { BusinessVertical, Service, Specialist, AppScreen } from './types';

// Component imports
import OnboardingScreen from './components/OnboardingScreen';
import SelectionScreen from './components/SelectionScreen';
import BookingCalendarScreen from './components/BookingCalendarScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import DesignRationalePanel from './components/DesignRationalePanel';

export default function App() {
  const [activeVertical, setActiveVertical] = useState<BusinessVertical>('clinic');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');
  
  // Authenticated state
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);

  // Active booking selection states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [bookingDetails, setBookingDetails] = useState<{ date: string; timeSlot: string; notes: string } | null>(null);

  // Simulated live clock state in phone status bar
  const [timeStr, setTimeStr] = useState('09:41');

  useEffect(() => {
    const updatePhoneTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 12 instead of 0
      setTimeStr(`${hours}:${mins} ${ampm}`);
    };
    updatePhoneTime();
    const interval = setInterval(updatePhoneTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const activeConfig = BUSINESS_DATA[activeVertical];

  // Colors based on active vertical
  const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; bar: string }> = {
    emerald: { bg: 'bg-emerald-600 lg:hover:bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-950/80', glow: 'shadow-emerald-950/40', bar: 'bg-emerald-500' },
    rose: { bg: 'bg-rose-600 lg:hover:bg-rose-500', text: 'text-rose-400', border: 'border-rose-950/80', glow: 'shadow-rose-950/40', bar: 'bg-rose-500' },
    indigo: { bg: 'bg-indigo-600 lg:hover:bg-indigo-500', text: 'text-indigo-400', border: 'border-indigo-950/80', glow: 'shadow-indigo-950/40', bar: 'bg-indigo-500' },
    orange: { bg: 'bg-orange-600 lg:hover:bg-orange-500', text: 'text-orange-400', border: 'border-orange-950/80', glow: 'shadow-orange-950/40', bar: 'bg-orange-500' }
  };

  const appTheme = colorMap[activeConfig.primaryColor] || colorMap.emerald;

  // Handlers for switching industry config
  const handleVerticalChange = (vertical: BusinessVertical) => {
    setActiveVertical(vertical);
    setSelectedService(null);
    setSelectedSpecialist(null);
    setBookingDetails(null);
    // Move screen back to onboarding to let user test from the top!
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (userInfo: { name: string; email: string; phone: string }) => {
    setUser(userInfo);
    setCurrentScreen('services');
  };

  const handleSelectionComplete = (selections: { service: Service; specialist: Specialist }) => {
    setSelectedService(selections.service);
    setSelectedSpecialist(selections.specialist);
    setCurrentScreen('datetime');
  };

  const handleDateTimeBack = () => {
    setCurrentScreen('services');
  };

  const handleBookingComplete = (details: { date: string; timeSlot: string; notes: string }) => {
    setBookingDetails(details);
    setCurrentScreen('confirmation');
  };

  const handleRestart = () => {
    setSelectedService(null);
    setSelectedSpecialist(null);
    setBookingDetails(null);
    setCurrentScreen('services');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedService(null);
    setSelectedSpecialist(null);
    setBookingDetails(null);
    setCurrentScreen('onboarding');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-between font-sans selection:bg-neutral-800 selection:text-white" id="main-app-container">
      
      {/* Dynamic Upper Presentation Banner */}
      <header className="bg-[#080808] border-b border-neutral-900 py-4 px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0" id="main-app-header">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-amber-500/10 text-amber-500 font-mono text-[10px] font-bold rounded-full tracking-wider border border-amber-500/20 uppercase">
              UI DESIGN & PROTOTYPE LAB
            </span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-neutral-800" />
              <span className="w-2 h-2 rounded-full bg-neutral-700" />
              <span className="w-2 h-2 rounded-full bg-neutral-600" />
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight flex items-center gap-2">
            Aura Appointment System
            <span className="text-xs text-neutral-400 font-normal hidden sm:inline">• Elegant Dark Mobile Design</span>
          </h1>
        </div>

        {/* Dynamic Reset State Trigger */}
        <button
          id="btn-reboot-session"
          onClick={() => {
            setUser(null);
            setSelectedService(null);
            setSelectedSpecialist(null);
            setBookingDetails(null);
            setCurrentScreen('onboarding');
          }}
          className="text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Demo Path
        </button>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="applet-main-workspace">
        
        {/* LEFT COLUMN: Vertical presets selector + Mobile Frame Simulator (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6 items-center" id="workspace-column-left">
          
          {/* Preset Buttons for Service Industries */}
          <div className="w-full bg-[#080808]/90 border border-neutral-900 p-4 rounded-2xl space-y-3" id="vertical-presets-panel">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-bold text-neutral-300 tracking-wide uppercase flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-500" />
                Select App Target Business Vertical
              </h3>
              <span className="text-[10px] text-neutral-500 font-semibold font-mono">STEP 1 OF DEMO</span>
            </div>
            
            <p className="text-[11.5px] text-neutral-400 leading-normal px-1">
              Swap layouts programmatically to review how onboarding illustrations, copy, services, availability filters, address credentials, and primary colors scale perfectly across diverse commercial sectors.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="trigger-chips-grid">
              {/* Clinic mode */}
              <button
                id="preset-clinic-trigger"
                onClick={() => handleVerticalChange('clinic')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  activeVertical === 'clinic' 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-md shadow-emerald-500/5' 
                    : 'border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span className="text-xs font-bold font-sans">Wellness Clinic</span>
              </button>

              {/* Salon mode */}
              <button
                id="preset-salon-trigger"
                onClick={() => handleVerticalChange('salon')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  activeVertical === 'salon' 
                    ? 'border-rose-500 bg-rose-500/10 text-rose-300 shadow-md shadow-rose-500/5' 
                    : 'border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <Sparkle className="w-4 h-4" />
                <span className="text-xs font-bold font-sans">Luxe Hair Salon</span>
              </button>

              {/* Strategy mode */}
              <button
                id="preset-consultant-trigger"
                onClick={() => handleVerticalChange('consultant')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  activeVertical === 'consultant' 
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300 shadow-md shadow-indigo-500/5' 
                    : 'border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="text-xs font-bold font-sans">Partner Advisory</span>
              </button>

              {/* Fitness mode */}
              <button
                id="preset-fitness-trigger"
                onClick={() => handleVerticalChange('fitness')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  activeVertical === 'fitness' 
                    ? 'border-orange-500 bg-orange-500/10 text-orange-300 shadow-md shadow-orange-500/5' 
                    : 'border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold font-sans">Performance Lab</span>
              </button>
            </div>
          </div>

          {/* Interactive Mobile Device Frame Container */}
          <div className="relative" id="smartphone-wrapper">
            {/* Ambient Background Glow matching vertical theme color */}
            <div className={`absolute -inset-4 rounded-full filter blur-3xl opacity-15 transition-all duration-500 bg-${activeConfig.primaryColor}-500`} />

            {/* Simulated Digital Smartphone Rim */}
            <div className="relative w-[360px] h-[720px] bg-slate-950 rounded-[44px] p-3.5 border-4 border-slate-700 shadow-2xl flex flex-col overflow-hidden select-none" id="device-shell">
              
              {/* Hardware Ear Speaker and Selfie Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-950 rounded-full z-50 flex items-center justify-center gap-3">
                <span className="w-12 h-1 bg-slate-800 rounded-full" /> {/* Ear Slot */}
                <span className="w-2.5 h-2.5 bg-slate-900 border border-slate-800 rounded-full" /> {/* Camera Lens */}
              </div>

              {/* Phone Content Screen Container */}
              <div className="flex-1 bg-[#050505] rounded-[32px] overflow-hidden flex flex-col relative z-25 border border-neutral-900 shadow-inner" id="simulated-device-screen">
                
                {/* 1. iOS Status Bar (Simulated clock, signal, wifi, battery) */}
                <div className="h-9 bg-[#050505] px-6 pt-1.5 flex justify-between items-center select-none text-neutral-400 shrink-0 font-sans z-40 text-[11px] border-b border-neutral-950" id="status-bar">
                  <span id="statusBar-clock" className="font-semibold text-neutral-200">{timeStr}</span>
                  <div className="flex items-center gap-1.5" id="statusBar-indicators">
                    <Signal className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-[9px] font-bold uppercase leading-none tracking-tighter text-neutral-500">5G</span>
                    <Wifi className="w-3.5 h-3.5 text-neutral-400" />
                    <div className="flex items-center gap-0.5" id="statusBar-battery">
                      <Battery className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-[9.5px] font-semibold text-neutral-300 leading-none">98%</span>
                    </div>
                  </div>
                </div>

                {/* 2. Interactive Screens Router with transitions */}
                <div className="flex-1 overflow-hidden relative bg-[#050505]" id="current-screen-router">
                  {currentScreen === 'onboarding' && (
                    <OnboardingScreen config={activeConfig} onComplete={handleOnboardingComplete} />
                  )}
                  
                  {currentScreen === 'services' && (
                    <SelectionScreen 
                      config={activeConfig} 
                      user={user || { name: 'Guest Client', email: 'guest@demo.com' }} 
                      onNext={handleSelectionComplete}
                      onLogout={handleLogout}
                    />
                  )}

                  {currentScreen === 'datetime' && (
                    <BookingCalendarScreen 
                      config={activeConfig}
                      service={selectedService!}
                      specialist={selectedSpecialist!}
                      onBack={handleDateTimeBack}
                      onBook={handleBookingComplete}
                    />
                  )}

                  {currentScreen === 'confirmation' && (
                    <ConfirmationScreen 
                      config={activeConfig}
                      service={selectedService!}
                      specialist={selectedSpecialist!}
                      date={bookingDetails!.date}
                      timeSlot={bookingDetails!.timeSlot}
                      notes={bookingDetails!.notes}
                      user={user || { name: 'Alex Peterson', email: 'alex.peterson@demo.com', phone: '(415) 333-7281' }}
                      onRestart={handleRestart}
                    />
                  )}
                </div>

                {/* 3. Simulated iOS Bottom Home Indicator Swipe Bar */}
                <div className="h-5 bg-[#050505] flex justify-center items-center shrink-0 z-40 border-t border-neutral-950" id="ios-bottom-indicator">
                  <span className="w-28 h-1 bg-neutral-800 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive design specs & rationale center (5 columns) */}
        <div className="lg:col-span-5 space-y-6" id="workspace-column-right">
          
          {/* Main Rationale Render Panel */}
          <div className="h-[720px]" id="rationale-panel-mount">
            <DesignRationalePanel currentVertical={activeVertical} />
          </div>

          {/* Quick Stats / Highlights banner */}
          <div className="bg-[#080808]/90 border border-neutral-900 p-4 rounded-2xl space-y-2.5" id="specifications-cheat-sheet">
            <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-widest flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              Interface Metrics Summary
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-450" id="specs-grid">
              <div className="bg-neutral-950/70 border border-neutral-905 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">Tap-to-Book Chain</span>
                <span className="text-sm font-bold text-neutral-200 block mt-0.5">4 Steps Click-Path</span>
              </div>
              <div className="bg-neutral-950/70 border border-neutral-905 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">Design Guidelines</span>
                <span className="text-sm font-bold text-neutral-200 block mt-0.5">WCAG AAA Premium</span>
              </div>
              <div className="bg-neutral-950/70 border border-neutral-905 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">Viewport Density</span>
                <span className="text-sm font-bold text-neutral-200 block mt-0.5">360px × 720px View</span>
              </div>
              <div className="bg-neutral-950/70 border border-neutral-905 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">Typography Balance</span>
                <span className="text-sm font-bold text-neutral-200 block mt-0.5">Display & Mono Duos</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistent Page Footer */}
      <footer className="bg-[#080808] py-4 px-6 md:px-8 text-center text-xs text-neutral-500 border-t border-neutral-900" id="main-app-footer">
        © 2026 Aura System Lab Corp. Built with modern React 19, Space Grotesk Displays, and local viewport containment rules. All Rights Reserved.
      </footer>
    </div>
  );
}
