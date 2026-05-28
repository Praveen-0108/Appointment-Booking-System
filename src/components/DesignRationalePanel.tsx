/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Shield, Heart, Eye, Target, Sparkles, RefreshCcw, Landmark, MonitorCheck } from 'lucide-react';

interface DesignRationalePanelProps {
  currentVertical: string;
}

export default function DesignRationalePanel({ currentVertical }: DesignRationalePanelProps) {
  const [activeTab, setActiveTab] = useState<'flows' | 'usability' | 'realworld'>('flows');

  // Industry-specific rationale injects to show extreme professional tailoring
  const industryAnalysis: Record<string, { flowSpecifics: string; challengeSpecifics: string }> = {
    clinic: {
      flowSpecifics: 'Medical scheduling prioritizes patient intake accuracy. Onboarding requests explicit full names for patient chart alignment. We organize therapies by "Diagnostic", "Holistic", and "Rehab" categories, letting patients search, view prices and duration transparency upfront, preventing diagnostic anxiety.',
      challengeSpecifics: 'HIPAA conformity requires strict encryption of health indexes in transit and at rest. Under optimistic concurrency, the selected slot must be locked for 5-10 minutes to avoid patient collision while complete files are parsed before finalized locks.'
    },
    salon: {
      flowSpecifics: 'Beauty salons scale through specialist affinity. Customers often select a stylist first (e.g. Chloe) and then select treatments. The dashboard lets clients easily toggle between "Services-first" and "Specialist-first" tabs, showing detailed practitioner portfolios and rating indices.',
      challengeSpecifics: 'Styling often requires multi-service compounding (e.g., Bleaching + Coloring + Styling). This requires real-world step calculations where the ending of a primer service immediately triggers the start of a drying buffer slot, managing variable total durations.'
    },
    consultant: {
      flowSpecifics: 'Advisory appointments demand strict billing clearance. The onboarding simulates enterprise clients, while services display concrete prices. This prevents administrative back-and-forth and pre-qualifies incoming consulting leads.',
      challengeSpecifics: 'Corporate advisors travel across multiple global time zones. The calendar panel dynamically displays "GMT/PDT Timezone offset markers" so advisors in London and clients in San Francisco are aligned, preventing midnight meetings or missed strategic calls.'
    },
    fitness: {
      flowSpecifics: 'Fitness coaching requires streak momentum and physical readiness. The onboarding inspires high-performance training, and service cards break down biomechanics metrics, helping select coaches according to specialized fitness goals.',
      challengeSpecifics: 'High workout intensity demands recovery buffers (e.g., 10 minutes between clients for machine sanitation and hydration). The real scheduling server enforces automated padding filters to prevent practitioner fatigue.'
    }
  };

  const currentAnalysis = industryAnalysis[currentVertical] || industryAnalysis.clinic;

  return (
    <div className="bg-[#080808]/90 rounded-2xl border border-neutral-900 shadow-2xl flex flex-col h-full overflow-hidden" id="rationale-root">
      
      {/* Panel title */}
      <div className="bg-[#050505] p-4 shrink-0 flex items-center justify-between border-b border-neutral-900" id="rationale-header">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-500 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white font-display">Design Studio & UX Rationale</h3>
            <p className="text-[10px] text-neutral-500 font-medium">Interactive portfolio and framework decisions</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-neutral-900 text-[10px] font-mono font-semibold px-2.5 py-1 rounded border border-neutral-800 uppercase">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-neutral-400">Active: {currentVertical}</span>
        </div>
      </div>

      {/* Rationale Tab Navs */}
      <div className="bg-[#050505] p-2 flex gap-1 shrink-0 border-b border-neutral-900" id="rationale-tabs-belt">
        <button
          id="rat-tab-flows"
          onClick={() => setActiveTab('flows')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'flows' ? 'bg-neutral-900 text-white border border-neutral-800 shadow-xl' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          UX Flows
        </button>
        <button
          id="rat-tab-usability"
          onClick={() => setActiveTab('usability')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'usability' ? 'bg-neutral-900 text-white border border-neutral-800 shadow-xl' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Usability Decisions
        </button>
        <button
          id="rat-tab-realworld"
          onClick={() => setActiveTab('realworld')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'realworld' ? 'bg-neutral-900 text-white border border-neutral-800 shadow-xl' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Real-World Systems
        </button>
      </div>

      {/* Rationale Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-neutral-950/80" id="rationale-content-container">
        {activeTab === 'flows' && (
          <div className="space-y-4" id="rationale-flows-panel">
            <div className="flex items-start gap-3">
              <span className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-amber-500 shrink-0">
                <Target className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-neutral-100 font-display">Intelligent User Engagement Flow</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">
                  We engineered a streamlined, non-linear onboarding directory matching modern expectations. Rather than locking users behind steep sign-up walls immediately, we walk them dynamically through custom value-props tailored to the vertical.
                </p>
              </div>
            </div>

            <div className="bg-neutral-900/40 rounded-xl p-3.5 border border-neutral-850/60 space-y-3">
              <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-[#777]">Step Progression Paradigm</h5>
              
              <div className="relative border-l border-neutral-800 pl-4 space-y-4 text-xs">
                <div className="relative">
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <strong className="text-neutral-200 block text-[11px]">1. Multi-Dimensional Onboarding & Profile Pre-fill</strong>
                  <p className="text-[11.5px] text-neutral-400 leading-normal mt-0.5">
                    Educate on medical privacy, hygiene standards, or financial consulting criteria. Adds a visual <strong>Auto-Fill Assistant</strong> box to accelerate and bypass manual keyboard typing friction in high-fidelity mock environments.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <strong className="text-neutral-200 block text-[11px]">2. Decoupled Specialty / Service Finder</strong>
                  <p className="text-[11.5px] text-neutral-400 leading-normal mt-0.5">
                    Users query treatments and specialists separately. {currentAnalysis.flowSpecifics}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <strong className="text-neutral-200 block text-[11px]">3. Rolling Calendar Strip & Smart Periods</strong>
                  <p className="text-[11.5px] text-neutral-400 leading-normal mt-0.5">
                    Avoids slow full-month date navigation. Generates a compact horizonal bar displaying practitioner availability days only, and groups slots into Morning/Afternoon/Evening packages to lower micro-decision stress.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <strong className="text-neutral-200 block text-[11px]">4. Locked Ticket Slip Confirmation</strong>
                  <p className="text-[11.5px] text-neutral-400 leading-normal mt-0.5">
                    Serves a highly readable digital reservation card. Features map routing, local phone hotlines, and explicit 24-hour self-cancellation guidelines which mitigates dry booking drop-offs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usability' && (
          <div className="space-y-4" id="rationale-usability-panel">
            <div className="flex items-start gap-3">
              <span className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-amber-500 shrink-0">
                <Eye className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-neutral-100 font-display">Cognitive Engineering & Accessibility</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">
                  Our usability framework avoids standard cookie-cutter layouts. Every spacing, font selection, and boundary acts intentionally to minimize friction points.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs" id="usability-bento-grid">
              
              <div className="bg-neutral-900/30 border border-neutral-850/60 rounded-xl p-3 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Fitts's Law Ergonomics
                </div>
                <p className="text-[11.5px] text-neutral-450 leading-normal font-sans">
                  All critical booking anchors (Continue, Select Target, Confirm Reservation) are pinned strictly within high-reach lower zones on mobile screens. Button sizes maintain a 46px height ceiling to avoid touch fatigue in native screen frame containers.
                </p>
              </div>

              <div className="bg-neutral-900/30 border border-neutral-850/60 rounded-xl p-3 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Reduced Decision Stress
                </div>
                <p className="text-[11.5px] text-neutral-450 leading-normal font-sans">
                  Comparing 20 different open appointment times side-by-side leads to user choice paralysis. We categorize hours into morning, afternoon, and evening grids, and render visual badges like <strong>"1 slot left"</strong> or <strong>"3 open"</strong> for guidance.
                </p>
              </div>

              <div className="bg-neutral-900/30 border border-neutral-850/60 rounded-xl p-3 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Dynamic Color Semantics
                </div>
                <p className="text-[11.5px] text-neutral-450 leading-normal font-sans">
                  The active interface colors switch on-the-fly dynamically depending on the selected vertical. Highly rigorous medical clinics use calming Emerald; high-fashion hair salons switch to luxurious Warm Rose; professional advisory pivots to corporate Indigo.
                </p>
              </div>

              <div className="bg-neutral-900/30 border border-neutral-850/60 rounded-xl p-3 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-505 bg-amber-505 bg-amber-500" />
                  Contrast & Legibility
                </div>
                <p className="text-[11.5px] text-neutral-450 leading-normal font-sans">
                  Strictly adheres to WCAG AA legibility criteria. Implements carbon neutral solids for displays, pairing "Inter" for UI bodies and "JetBrains Mono" for structural tags to enhance overall visual hierarchy.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'realworld' && (
          <div className="space-y-4" id="rationale-realworld-panel">
            <div className="flex items-start gap-3">
              <span className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-amber-500 shrink-0">
                <Shield className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-neutral-100 font-display">Real-World Engineering Challenges</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">
                  A high-fidelity booking prototype must go beyond visual fluff. Multi-location databases require strict guardrails to operate efficiently.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="flex gap-2.5" id="concurrency-challenge">
                <div className="shrink-0 text-neutral-500 mt-0.5">
                  <RefreshCcw className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-200 text-[11px] font-sans font-semibold">1. Double-Booking Mitigation & Optimistic Locking</strong>
                  <p className="text-[11.5px] text-neutral-400 leading-normal mt-0.5 font-sans">
                    {currentAnalysis.challengeSpecifics} To prevent slot collisions, real engines reserve the slot in a Redis key-value store with a 5-minute TTL. If checkout completes, SQL locks are committed; otherwise, keys expire automatically, freeing hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5" id="timezone-challenge">
                <div className="shrink-0 text-neutral-500 mt-0.5">
                  <MonitorCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-200 text-[11px] font-sans font-semibold">2. Multi-Zone Calendar Synchronization</strong>
                  <p className="text-[11.5px] text-neutral-400 leading-normal mt-0.5 font-sans">
                    To prevent timezone desynchronization, appointments should be recorded in the DBMS using ISO UTC timestamps. During rendering, the app translates UTC into browser localized hour formats, while alerting the facility localized timezone mapping.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5" id="buffer-challenge">
                <div className="shrink-0 text-neutral-500 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-200 text-[11px] font-sans font-semibold">3. Automated Practitioner Recovery Buffers</strong>
                  <p className="text-[11.5px] text-neutral-400 leading-normal mt-0.5 font-sans">
                    Booking back-to-back creates severe delay cascades if a session slips. Production schedules configure automated blocks (e.g. 15 minutes) after every locked transaction. These are added automatically in availability lookups to protect specialists.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5" id="insurance-challenge">
                <div className="shrink-0 text-neutral-500 mt-0.5">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-200 text-[11px] font-sans font-semibold">4. No-Show Economics & Authorization Holds</strong>
                  <p className="text-[11.5px] text-neutral-400 leading-normal mt-0.5 font-sans">
                    Empty desks destroy unit economics for salons and clinics. Secure platforms integrate payment gateways like Stripe to issue an authorizing hold on client credit cards during reservation. Cancellations under a 24-hour limit apply partial compensations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Static Footer Credits */}
      <div className="bg-[#050505] border-t border-neutral-900 p-3.5 text-[10px] text-neutral-500 text-center select-none shrink-0 font-sans" id="rationale-footer">
        Figma / Adobe XD Interactive Design Portfolio Specifications • 2026 Aura System Lab
      </div>
    </div>
  );
}
