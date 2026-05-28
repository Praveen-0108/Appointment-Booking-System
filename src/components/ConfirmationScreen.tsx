/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Check, Calendar, UserCheck, ShieldAlert, Sparkles, MapPin, Phone, Mail, FileText, ArrowRight } from 'lucide-react';
import { BusinessConfig, Service, Specialist } from '../types';

interface ConfirmationScreenProps {
  config: BusinessConfig;
  service: Service;
  specialist: Specialist;
  date: string;
  timeSlot: string;
  notes?: string;
  user: { name: string; email: string; phone: string };
  onRestart: () => void;
}

export default function ConfirmationScreen({ config, service, specialist, date, timeSlot, notes, user, onRestart }: ConfirmationScreenProps) {
  // Format readable calendar date
  const readableDate = useMemo(() => {
    const d = new Date(`${date}T00:00:00`);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  }, [date]);

  const colorMap: Record<string, { bg: string; text: string; fill: string; lightBg: string; border: string }> = {
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', fill: 'fill-emerald-400', lightBg: 'bg-emerald-950/30 text-emerald-250', border: 'border-emerald-900/50' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-455', fill: 'fill-rose-455', lightBg: 'bg-rose-950/30 text-rose-250', border: 'border-rose-900/50' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-455', fill: 'fill-indigo-455', lightBg: 'bg-indigo-950/30 text-indigo-250', border: 'border-indigo-900/50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-455', fill: 'fill-orange-455', lightBg: 'bg-orange-950/30 text-orange-250', border: 'border-orange-900/50' }
  };

  const theme = colorMap[config.primaryColor] || colorMap.emerald;

  // Generate pseudo receipt code
  const orderNum = useMemo(() => {
    return `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  return (
    <div className="h-full flex flex-col bg-neutral-950 text-neutral-300 relative z-30 font-sans" id="confirmation-screen-root">
      
      {/* Centered Top navigation bar */}
      <div className="bg-neutral-950 p-4 border-b border-neutral-900 shrink-0 text-center relative" id="confirmation-top-bar">
        <span className="text-xs font-bold text-white tracking-widest uppercase font-display">Receipt Vault</span>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#050505] p-5 space-y-5" id="confirmation-body">
        
        {/* Animated Confirmation Message */}
        <div className="text-center space-y-2" id="success-greeter">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto bg-neutral-900 border border-neutral-850 shadow-xl mb-4" id="checkmark-glow">
            <Check className={`w-7 h-7 ${theme.text}`} />
          </div>
          <h2 className="text-lg font-bold font-display text-white tracking-tight leading-tight">Appointment Confirmed!</h2>
          <p className="text-[10.5px] text-neutral-400 max-w-xs mx-auto leading-relaxed">
            Your appointment has been securely synchronized with the database record and allocated.
          </p>
        </div>

        {/* Digital Ticket Container Style */}
        <div className="bg-neutral-900/60 border border-neutral-850 rounded-2xl p-4 relative overflow-hidden flex flex-col gap-3.5 shadow-2xl" id="digital-receipt-ticket">
          
          {/* Ticket Side punchouts */}
          <div className="absolute top-[48%] -left-3.5 w-7 h-7 bg-neutral-950 rounded-full border border-neutral-850" />
          <div className="absolute top-[48%] -right-3.5 w-7 h-7 bg-neutral-950 rounded-full border border-neutral-850" />

          {/* Upper Info Block */}
          <div className="flex justify-between items-start" id="ticket-meta-block">
            <div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#777] block">Aura Record Number</span>
              <span className="text-xs font-mono font-bold text-white mt-0.5 block">{orderNum}</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#777] block">Business Target</span>
              <span className="text-xs font-semibold text-neutral-300 mt-0.5 block">{config.name}</span>
            </div>
          </div>

          <div className="border-t border-neutral-850/50 mt-1" />

          {/* core service details */}
          <div id="ticket-treatment-details">
            <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-500 block">Requested Treatment</span>
            <h4 className="text-xs font-bold text-white mt-1 font-display leading-tight">{service.name}</h4>
            <div className="flex gap-4 mt-2 text-[10px] text-neutral-400 font-medium">
              <span>Duration: <strong className="text-neutral-200">{service.duration} mins</strong></span>
              <span>Price: <strong className="text-neutral-200">${service.price} USD (Paid)</strong></span>
            </div>
          </div>

          {/* specialist details */}
          <div className="flex items-start gap-2.5 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-850" id="ticket-practitioner-block">
            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold flex items-center justify-center text-xs uppercase shrink-0">
              {specialist.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <span className="text-[8.5px] font-bold text-[#777] uppercase tracking-widest">Specialist Assigned</span>
              <h5 className="text-xs font-bold text-neutral-200 leading-snug mt-0.5">{specialist.name}</h5>
              <p className="text-[9.5px] text-neutral-400 leading-none">{specialist.role}</p>
            </div>
          </div>

          {/* Sep line */}
          <div className="border-t border-dashed border-neutral-800 my-0.5" />

          {/* datetime block */}
          <div id="ticket-schedule-details">
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#777] block">Allocated Time</span>
            <div className="flex gap-2 items-center text-white mt-1.5">
              <Calendar className={`w-4 h-4 ${theme.text}`} />
              <div className="leading-snug">
                <p className="text-[11px] font-bold">{readableDate}</p>
                <p className="text-[10px] text-[#777] font-semibold mt-0.5 uppercase tracking-wider">{timeSlot} (PDT)</p>
              </div>
            </div>
          </div>

          {/* Consumer credentials field */}
          <div className="bg-neutral-950/40 p-2.5 rounded-xl border border-neutral-850/50 space-y-1.5" id="ticket-client-block">
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#777] block">Patient Credentials File</span>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-400 leading-none">
              <div>
                <span className="text-[8px] uppercase tracking-wide text-neutral-600 block mb-0.5">Contact Name</span>
                <span className="font-bold text-neutral-250">{user.name}</span>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-wide text-neutral-600 block mb-0.5">Phone Contact</span>
                <span className="font-bold text-neutral-250 font-mono text-[9px]">{user.phone}</span>
              </div>
            </div>
          </div>

          {/* Notes description optionally */}
          {notes && (
            <div className="bg-neutral-950/30 p-2.5 rounded-xl border border-neutral-850/50 space-y-1" id="ticket-notes-block">
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#777] block">Transmitted Notes</span>
              <p className="text-[10px] text-neutral-400 italic font-sans leading-normal">
                "{notes}"
              </p>
            </div>
          )}
        </div>

        {/* Integration Notification / Reminders box */}
        <div className="p-3.5 bg-neutral-900/40 text-neutral-300 border border-neutral-850 rounded-xl flex gap-2.5 items-start text-[11px] leading-relaxed" id="calendar-integration-card">
          <Calendar className={`w-4 h-4 ${theme.text} shrink-0 mt-0.5`} />
          <div className="space-y-1">
            <p className="font-bold text-neutral-200">Google Calendar Integrated</p>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Meeting links, practitioner notes, and precise directions details have been injected into <span className="font-bold text-white">{user.email}</span>'s records calendar files.
            </p>
          </div>
        </div>

        {/* Local instructions address directions coordinates details card */}
        <div className="p-3.5 bg-neutral-900/40 text-neutral-300 border border-neutral-850 rounded-xl flex gap-2.5 items-start text-[11px] leading-relaxed" id="directions-badge-card">
          <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-neutral-100">Location Address Coordinates</p>
            <p className="text-[10px] text-neutral-400 font-mono leading-tight">{config.location}</p>
          </div>
        </div>
      </div>

      {/* Footer Actions Drawer */}
      <div className="bg-neutral-950 border-t border-neutral-900 p-4 shrink-0 flex flex-col gap-3 shadow-2xl animate-fade-in" id="confirmation-footer">
        <button
          id="restart-demo-loop-btn"
          onClick={onRestart}
          className={`w-full py-3.5 px-4 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98 ${theme.bg} hover:opacity-90 text-white text-xs uppercase tracking-widest font-display`}
        >
          Book Another Service
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[9px] text-neutral-500 text-center leading-normal">
          This secure reservation can be modified or fully cancelled free of fees up to 24 hours prior to appointment launch.
        </p>
      </div>
    </div>
  );
}
