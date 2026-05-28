/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Clock, DollarSign, Star, Info, ChevronRight, UserCheck, ShieldCheck } from 'lucide-react';
import { BusinessConfig, Service, Specialist } from '../types';

interface SelectionScreenProps {
  config: BusinessConfig;
  onNext: (data: { service: Service; specialist: Specialist }) => void;
  onBack?: () => void;
  onLogout?: () => void;
  user: { name: string; email: string };
}

export default function SelectionScreen({ config, onNext, onBack, onLogout, user }: SelectionScreenProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'specialists'>('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Selections
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);

  // Derive unique categories
  const categories = useMemo(() => {
    const list = new Set<string>();
    list.add('All');
    config.services.forEach(s => list.add(s.category));
    return Array.from(list);
  }, [config.services]);

  // Filter services
  const filteredServices = useMemo(() => {
    return config.services.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || s.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [config.services, searchQuery, selectedCategory]);

  // Filter specialists
  const filteredSpecialists = useMemo(() => {
    return config.specialists.filter(sp => {
      return sp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             sp.role.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [config.specialists, searchQuery]);

  // Active theme mapping tailored for dark mode integration
  const colorMap: Record<string, { bg: string; text: string; ring: string; lightBg: string; border: string }> = {
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-450', ring: 'ring-emerald-505', lightBg: 'bg-emerald-950/30 text-emerald-300', border: 'border-emerald-900/60' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-450', ring: 'ring-rose-505', lightBg: 'bg-rose-950/30 text-rose-300', border: 'border-rose-900/60' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-450', ring: 'ring-indigo-505', lightBg: 'bg-indigo-950/30 text-indigo-300', border: 'border-indigo-900/60' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-450', ring: 'ring-orange-505', lightBg: 'bg-orange-950/30 text-orange-300', border: 'border-orange-900/60' }
  };

  const theme = colorMap[config.primaryColor] || colorMap.emerald;

  // Specialists selection flow handler
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    // Auto-switch to selecting practitioner to lower steps cognitive overhead
    setActiveTab('specialists');
  };

  const handleSpecialistSelect = (sp: Specialist) => {
    setSelectedSpecialist(sp);
  };

  const handleProceed = () => {
    if (selectedService && selectedSpecialist) {
      onNext({ service: selectedService, specialist: selectedSpecialist });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-neutral-950 text-neutral-300 font-sans" id="selection-screen-root">
      
      {/* Header section (Profile Greetings) */}
      <div className="bg-neutral-950 px-4 pt-3 pb-3 border-b border-neutral-900 flex flex-col gap-2.5" id="selection-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider bg-neutral-900 text-white border border-neutral-800">
              {user.name.substring(0, 2)}
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest font-display -mb-0.5">Welcome Back</p>
              <h3 className="text-xs font-bold text-white leading-tight">{user.name}</h3>
            </div>
          </div>
          {onLogout && (
            <button
              id="logout-btn"
              onClick={onLogout}
              className="text-[10px] font-bold text-neutral-400 hover:text-white border border-neutral-800 px-3 py-1 rounded-full bg-neutral-900 transition hover:bg-neutral-850 cursor-pointer"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Selected Summary Sticky Banner */}
        {(selectedService || selectedSpecialist) && (
          <div className={`p-2.5 rounded-xl border ${theme.lightBg} ${theme.border} flex flex-col gap-1 text-[11px]`} id="selection-summary-sticky">
            {selectedService && (
              <div className="flex justify-between items-center px-1">
                <span className="font-semibold text-neutral-400">Selected Treatment:</span>
                <span className="font-extrabold text-white">{selectedService.name} (${selectedService.price})</span>
              </div>
            )}
            {selectedSpecialist && (
              <div className={`flex justify-between items-center border-t border-dashed ${theme.border} pt-1.5 mt-1 px-1`}>
                <span className="font-semibold text-neutral-400">Selected Specialist:</span>
                <span className="font-extrabold flex items-center gap-1 text-white">
                  <UserCheck className="w-3.5 h-3.5" />
                  {selectedSpecialist.name}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tab Switcher Area */}
      <div className="bg-[#080808] px-4 border-b border-neutral-900 flex justify-between gap-4 items-center" id="tab-switcher-belt">
        <div className="flex gap-4 flex-1">
          <button
            id="tab-services"
            onClick={() => setActiveTab('services')}
            className={`py-3 text-xs font-bold tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'services' ? `${theme.text} border-current` : 'text-neutral-500 border-transparent hover:text-neutral-350'
            }`}
          >
            A. Select Service
            {selectedService && <span className="ml-[3px] text-[10px] text-emerald-450 font-bold">✓</span>}
          </button>
          <button
            id="tab-specialists"
            onClick={() => setActiveTab('specialists')}
            className={`py-3 text-xs font-bold tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'specialists' ? `${theme.text} border-current` : 'text-neutral-500 border-transparent hover:text-neutral-350'
            }`}
          >
            B. Select Specialist
            {selectedSpecialist && <span className="ml-[3px] text-[10px] text-emerald-450 font-bold">✓</span>}
          </button>
        </div>
      </div>

      {/* Main List Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" id="selection-list-body">
        
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            id="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'services' ? 'Search therapies, packages...' : 'Search practitioners, roles...'}
            className="w-full pl-9 pr-4 py-2 bg-neutral-900/50 border border-neutral-850 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-750 shadow-inner"
          />
        </div>

        {/* Dynamic Context Lists */}
        {activeTab === 'services' ? (
          <div className="space-y-3" id="services-tab-content">
            {/* Category Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full" id="category-chips">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-tight cursor-pointer shrink-0 transition-colors ${
                    selectedCategory === cat 
                      ? `${theme.bg} text-white` 
                      : 'bg-neutral-900 border border-neutral-850 text-neutral-400 hover:border-neutral-750 hover:text-white'
                  }`}
                  id={`cat-chip-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service Cards */}
            {filteredServices.length === 0 ? (
              <p className="text-center text-xs text-neutral-550 py-10" id="services-empty-state">No services match your criteria.</p>
            ) : (
              filteredServices.map(service => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`p-3 bg-neutral-900/30 border rounded-xl cursor-pointer transition-all hover:bg-neutral-900/70 ${
                      isSelected ? `ring-[1.5px] ring-offset-[1px] ring-offset-neutral-950 ${theme.ring} border-transparent bg-neutral-900/50` : 'border-neutral-850/80'
                    }`}
                    id={`service-card-${service.id}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#777] block mb-0.5">
                          {service.category}
                        </span>
                        <h4 className="text-xs font-bold text-neutral-200 leading-tight mb-1">{service.name}</h4>
                        <p className="text-[10px] text-neutral-400 leading-relaxed max-w-xs">{service.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-white block">${service.price}</span>
                        <span className="text-[9px] text-neutral-500 font-medium flex items-center gap-0.5 mt-1">
                          <Clock className="w-2.5 h-2.5 inline text-neutral-500" /> {service.duration}m
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-3" id="specialists-tab-content">
            
            {/* Standard "Best Matching" Suggestion Header */}
            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5 pl-0.5">
              <ShieldCheck className="w-4 h-4 text-neutral-500" />
              Qualified Professional Directory
            </div>

            {/* Specialist Cards */}
            {filteredSpecialists.length === 0 ? (
              <p className="text-center text-xs text-neutral-550 py-10" id="specialists-empty-state">No specialists match your criteria.</p>
            ) : (
              filteredSpecialists.map(sp => {
                const isSelected = selectedSpecialist?.id === sp.id;
                
                // Construct initials avatar
                const initials = sp.name
                  .split(' ')
                  .map(n => n[0])
                  .filter((_, i) => i < 2)
                  .join('');

                return (
                  <div
                    key={sp.id}
                    onClick={() => handleSpecialistSelect(sp)}
                    className={`p-3 bg-neutral-900/30 border rounded-xl cursor-pointer transition-all hover:bg-neutral-900/70 ${
                      isSelected ? `ring-[1.5px] ring-offset-[1px] ring-offset-neutral-950 ${theme.ring} border-transparent bg-neutral-900/50` : 'border-neutral-850/80'
                    }`}
                    id={`specialist-card-${sp.id}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-xs uppercase ${isSelected ? `${theme.bg} text-white` : 'bg-neutral-900 text-neutral-400'} border border-neutral-800`}>
                        {initials}
                      </div>

                      {/* Info Area */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-1">
                          <div>
                            <h4 className="text-xs font-bold text-neutral-200 leading-tight">{sp.name}</h4>
                            <p className="text-[10px] text-neutral-500 font-medium font-display mt-0.5">{sp.role}</p>
                          </div>
                          <div className="flex items-center gap-0.5 shrink-0 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full text-[9px] font-extrabold text-amber-500">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            {sp.rating}
                          </div>
                        </div>

                        <p className="text-[10px] text-neutral-400 italic line-clamp-2 my-1.5 leading-relaxed font-sans">
                          "{sp.bio}"
                        </p>

                        <div className="flex justify-between items-center mt-1 border-t border-neutral-850/50 pt-1.5 text-[9px] text-[#777] font-semibold uppercase tracking-wider">
                          <span>Hours: {sp.availability}</span>
                          <span className={`font-bold ${theme.text}`}>Reviews: {sp.reviewsCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Floating Bottom sheet action */}
      <div className="bg-neutral-950 border-t border-neutral-900 p-4 shrink-0 flex flex-col gap-3 shadow-2xl" id="selection-footer-belt">
        
        {/* Verification banner to guide users */}
        {!selectedService ? (
          <div className="text-[10px] text-neutral-400 text-center flex items-center justify-center gap-1.5 bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-850/40" id="service-guide">
            <Info className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            Please choose a treatment/service from the list to begin.
          </div>
        ) : !selectedSpecialist ? (
          <div className="text-[10px] text-neutral-400 text-center flex items-center justify-center gap-1.5 bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-850/40" id="specialist-guide">
            <Info className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            Perfect! Now choose your preferred practitioner from the specialist tab.
          </div>
        ) : (
          <div className="text-[10.5px] text-green-450 text-center flex items-center justify-center gap-1.5 bg-green-950/20 p-2.5 rounded-xl border border-green-900/40 font-semibold" id="selection-complete-guide">
            <UserCheck className="w-3.5 h-3.5 text-green-450" />
            Ready: All items locked! Proceed to date and local hour selection.
          </div>
        )}

        <button
          id="proceed-to-calendar-btn"
          onClick={handleProceed}
          disabled={!selectedService || !selectedSpecialist}
          className={`w-full py-3.5 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all focus:outline-none uppercase tracking-wider text-xs font-display ${
            selectedService && selectedSpecialist 
              ? `${theme.bg} text-white hover:opacity-90 active:scale-98` 
              : 'bg-neutral-900 text-neutral-600 border border-neutral-850/40 cursor-not-allowed'
          }`}
        >
          Select Date & Time Slot
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
