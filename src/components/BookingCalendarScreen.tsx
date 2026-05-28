/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ChevronLeft, CalendarClock, Clock, Info, CheckCircle2, FileText, Globe } from 'lucide-react';
import { BusinessConfig, Service, Specialist } from '../types';

interface BookingCalendarScreenProps {
  config: BusinessConfig;
  service: Service;
  specialist: Specialist;
  onBack: () => void;
  onBook: (bookingData: { date: string; timeSlot: string; notes: string }) => void;
}

export default function BookingCalendarScreen({ config, service, specialist, onBack, onBook }: BookingCalendarScreenProps) {
  // Generate rolling 10 days from today (2026-05-28 as simulated base)
  const days = useMemo(() => {
    const list = [];
    const baseDate = new Date('2026-05-28T00:00:00');
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 10; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      
      const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
      const dayName = dayNames[d.getDay()];
      const dayNum = d.getDate();
      const monthLabel = monthNames[d.getMonth()];
      
      // Specialist off-day detection logic
      let isOffDay = false;
      if (specialist.availability === 'Mon - Fri') {
        isOffDay = d.getDay() === 0 || d.getDay() === 6; // Sat, Sun off
      } else if (specialist.availability === 'Mon, Wed, Thu') {
        isOffDay = ![1, 3, 4].includes(d.getDay());
      } else if (specialist.availability === 'Tue, Wed, Fri') {
        isOffDay = ![2, 3, 5].includes(d.getDay());
      } else if (specialist.availability === 'Wed - Sun') {
        isOffDay = [1, 2].includes(d.getDay()); // Mon, Tue off
      } else if (specialist.availability === 'Tue - Sat') {
        isOffDay = [0, 1].includes(d.getDay()); // Sun, Mon off
      } else if (specialist.availability === 'Wed, Thu') {
        isOffDay = ![3, 4].includes(d.getDay());
      } else if (specialist.availability === 'Tue, Thu, Sat') {
        isOffDay = ![2, 4, 6].includes(d.getDay());
      }

      list.push({
        dateStr,
        dayName,
        dayNum,
        monthLabel,
        isOffDay,
        fullLabel: `${dayName}, ${monthLabel} ${dayNum}`
      });
    }
    return list;
  }, [specialist]);

  const [selectedDate, setSelectedDate] = useState<string>(days.find(d => !d.isOffDay)?.dateStr || days[0].dateStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Pre-seed static available slots with randomized/mock occupancy
  const slotsByPeriod = useMemo(() => {
    return {
      morning: [
        { time: '08:30 AM', status: 'available', occupancy: '3 slots open' },
        { time: '09:15 AM', status: 'available', occupancy: '1 slot left' },
        { time: '10:00 AM', status: 'booked', occupancy: 'Fully booked' },
        { time: '11:00 AM', status: 'available', occupancy: '2 slots open' }
      ],
      afternoon: [
        { time: '01:00 PM', status: 'booked', occupancy: 'Fully booked' },
        { time: '02:00 PM', status: 'available', occupancy: '4 slots open' },
        { time: '03:15 PM', status: 'available', occupancy: 'Last slot' },
        { time: '04:30 PM', status: 'available', occupancy: '2 slots open' }
      ],
      evening: [
        { time: '05:30 PM', status: 'available', occupancy: '3 slots open' },
        { time: '06:15 PM', status: 'booked', occupancy: 'Fully booked' },
        { time: '07:00 PM', status: 'available', occupancy: '5 slots open' }
      ]
    };
  }, [selectedDate]);

  const colorMap: Record<string, { bg: string; text: string; fill: string; border: string }> = {
    emerald: { bg: 'bg-emerald-500 lg:hover:bg-emerald-450 hover:text-white border-emerald-500', text: 'text-emerald-450', fill: 'fill-emerald-450', border: 'border-emerald-900/50' },
    rose: { bg: 'bg-rose-500 lg:hover:bg-rose-450 hover:text-white border-rose-500', text: 'text-rose-450', fill: 'fill-rose-450', border: 'border-rose-900/50' },
    indigo: { bg: 'bg-indigo-500 lg:hover:bg-indigo-450 hover:text-white border-indigo-500', text: 'text-indigo-450', fill: 'fill-indigo-455', border: 'border-indigo-900/50' },
    orange: { bg: 'bg-orange-500 lg:hover:bg-orange-450 hover:text-white border-orange-500', text: 'text-orange-450', fill: 'fill-orange-450', border: 'border-orange-900/50' }
  };

  const theme = colorMap[config.primaryColor] || colorMap.emerald;

  const handleDateClick = (dateStr: string, isOffDay: boolean) => {
    if (isOffDay) return;
    setSelectedDate(dateStr);
    setSelectedSlot(''); // reset selected slot
  };

  const currentSelectionDetails = useMemo(() => {
    return days.find(d => d.dateStr === selectedDate);
  }, [selectedDate, days]);

  const handleFormSubmit = () => {
    if (selectedDate && selectedSlot) {
      onBook({
        date: selectedDate,
        timeSlot: selectedSlot,
        notes: notes
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-neutral-950 text-neutral-300 font-sans" id="calendar-screen-root">
      
      {/* Top Header Navigation */}
      <div className="bg-[#050505] px-4 py-3 border-b border-neutral-900 flex items-center justify-between shrink-0" id="calendar-header-nav">
        <button
          id="calendar-back-icon-btn"
          onClick={onBack}
          className="p-1 px-3 border border-neutral-800 bg-neutral-900 rounded-full text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-850 transition-all cursor-pointer"
        >
          Back
        </button>
        <span className="text-xs font-bold text-white tracking-widest uppercase font-display">Select Schedule</span>
        <div className="w-10" /> {/* empty balancer */}
      </div>

      <div className="flex-1 overflow-y-auto" id="calendar-scroller">
        
        {/* Selected Summary Card */}
        <div className="bg-neutral-950 p-4 border-b border-neutral-900 flex flex-col gap-2.5" id="calendar-service-summary">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${theme.text}`}>Selected Booking Pair</span>
              <h4 className="text-xs font-bold text-white mt-1 leading-snug font-display">{service.name}</h4>
              <p className="text-[10.5px] text-neutral-400 mt-1">With Specialist: <strong className="text-neutral-200">{specialist.name}</strong> ({specialist.role})</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm font-bold text-white block">${service.price}</span>
              <span className="text-[9.5px] text-neutral-500 font-bold">{service.duration} mins</span>
            </div>
          </div>
        </div>

        {/* Rolling Date Strips */}
        <div className="p-4 bg-[#080808] border-b border-neutral-900" id="calendar-strip">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest flex items-center gap-1.5 font-display">
              <CalendarClock className="w-3.5 h-3.5 text-neutral-500" />
              Available Dates
            </span>
            <span className="text-[9px] text-[#777] font-semibold">PDT Timezone</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1" id="dates-strip-scroller">
            {days.map((day) => {
              const itemSelected = selectedDate === day.dateStr;
              return (
                <button
                  key={day.dateStr}
                  onClick={() => handleDateClick(day.dateStr, day.isOffDay)}
                  disabled={day.isOffDay}
                  className={`w-[48px] p-2 rounded-xl flex flex-col items-center justify-center shrink-0 border transition-all cursor-pointer ${
                    day.isOffDay 
                      ? 'bg-neutral-950 text-neutral-700 border-neutral-900 cursor-not-allowed opacity-30 shadow-none'
                      : itemSelected
                        ? `${theme.bg} text-white border-transparent ring-2 ring-offset-1 ring-neutral-900 shadow-lg scale-102 font-bold`
                        : 'bg-neutral-900 text-neutral-300 border-neutral-850 hover:border-neutral-750 hover:bg-neutral-850'
                  }`}
                  id={`date-button-${day.dateStr}`}
                >
                  <span className="text-[8px] font-bold uppercase tracking-widest block opacity-75">{day.dayName}</span>
                  <span className="text-sm font-bold block my-0.5">{day.dayNum}</span>
                  <span className="text-[8px] font-semibold block uppercase opacity-75">{day.monthLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Shift hours details line */}
          <div className="text-[9px] text-neutral-400 font-medium mt-3 flex items-center gap-1.5 bg-neutral-900 p-2.5 rounded-lg border border-neutral-850">
            <Globe className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span>Practitioner weekly active shift: <strong className="text-neutral-255 text-neutral-200">{specialist.availability}</strong></span>
          </div>
        </div>

        {/* Time Slot Picker Grid grouped by Morning/Afternoon/Evening */}
        <div className="p-4 space-y-4 bg-neutral-950" id="time-slots-wrapper">
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest flex items-center gap-1.5 pl-0.5 font-display">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            Choose Appointment Hour
          </span>

          {/* Morning Slots */}
          <div className="space-y-2" id="morning-slots-panel">
            <h5 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest pl-0.5">Morning Slots</h5>
            <div className="grid grid-cols-2 gap-2">
              {slotsByPeriod.morning.map((slot, idx) => {
                const isSelected = selectedSlot === slot.time;
                const isBooked = slot.status === 'booked';
                return (
                  <button
                    key={`morning-${idx}`}
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-2.5 border rounded-xl text-left transition-all ${
                      isBooked 
                        ? 'bg-neutral-900/40 text-[#444] border-neutral-950 cursor-not-allowed shadow-none'
                        : isSelected
                          ? `${theme.bg} text-white border-transparent shadow-lg shadow-black/25`
                          : 'bg-neutral-900/60 text-neutral-200 border-neutral-850 hover:border-neutral-750 hover:bg-neutral-850/80 cursor-pointer'
                    }`}
                    id={`morning-slot-${idx}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold leading-none">{slot.time}</span>
                      <span className={`text-[8px] font-extrabold uppercase rounded-full px-1.5 py-0.5 ${
                        isBooked 
                          ? 'bg-red-950/20 text-red-400 border border-red-900/30' 
                          : isSelected 
                            ? 'bg-white/20 text-white' 
                            : slot.occupancy.includes('1') || slot.occupancy.includes('Last') 
                              ? 'bg-amber-955/20 text-amber-500 border border-amber-900/30' 
                              : 'bg-neutral-950 text-neutral-500 border border-neutral-900'
                      }`}>
                        {isBooked ? 'Full' : isSelected ? 'Selected' : slot.occupancy}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Afternoon Slots */}
          <div className="space-y-2" id="afternoon-slots-panel">
            <h5 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest pl-0.5">Afternoon Slots</h5>
            <div className="grid grid-cols-2 gap-2">
              {slotsByPeriod.afternoon.map((slot, idx) => {
                const isSelected = selectedSlot === slot.time;
                const isBooked = slot.status === 'booked';
                return (
                  <button
                    key={`afternoon-${idx}`}
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-2.5 border rounded-xl text-left transition-all ${
                      isBooked 
                        ? 'bg-neutral-900/40 text-[#444] border-neutral-955 cursor-not-allowed shadow-none'
                        : isSelected
                          ? `${theme.bg} text-white border-transparent shadow-lg shadow-black/25`
                          : 'bg-neutral-900/60 text-neutral-200 border-neutral-850 hover:border-neutral-750 hover:bg-neutral-850/80 cursor-pointer'
                    }`}
                    id={`afternoon-slot-${idx}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold leading-none">{slot.time}</span>
                      <span className={`text-[8px] font-extrabold uppercase rounded-full px-1.5 py-0.5 ${
                        isBooked 
                          ? 'bg-red-950/20 text-red-400 border border-red-900/30' 
                          : isSelected 
                            ? 'bg-white/20 text-white' 
                            : slot.occupancy.includes('1') || slot.occupancy.includes('Last') 
                              ? 'bg-amber-955/20 text-amber-500 border border-amber-900/30' 
                              : 'bg-neutral-950 text-neutral-500 border border-neutral-900'
                      }`}>
                        {isBooked ? 'Full' : isSelected ? 'Selected' : slot.occupancy}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evening Slots */}
          <div className="space-y-2" id="evening-slots-panel">
            <h5 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest pl-0.5">Evening Slots</h5>
            <div className="grid grid-cols-2 gap-2">
              {slotsByPeriod.evening.map((slot, idx) => {
                const isSelected = selectedSlot === slot.time;
                const isBooked = slot.status === 'booked';
                return (
                  <button
                    key={`evening-${idx}`}
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-2.5 border rounded-xl text-left transition-all ${
                      isBooked 
                        ? 'bg-neutral-900/40 text-[#444] border-neutral-955 cursor-not-allowed shadow-none'
                        : isSelected
                          ? `${theme.bg} text-white border-transparent shadow-lg shadow-black/25`
                          : 'bg-neutral-900/60 text-neutral-200 border-neutral-850 hover:border-neutral-750 hover:bg-neutral-850/80 cursor-pointer'
                    }`}
                    id={`evening-slot-${idx}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold leading-none">{slot.time}</span>
                      <span className={`text-[8px] font-extrabold uppercase rounded-full px-1.5 py-0.5 ${
                        isBooked 
                          ? 'bg-red-950/20 text-red-400 border border-red-900/30' 
                          : isSelected 
                            ? 'bg-white/20 text-white' 
                            : slot.occupancy.includes('1') || slot.occupancy.includes('Last') 
                              ? 'bg-amber-955/20 text-amber-500 border border-amber-900/30' 
                              : 'bg-neutral-950 text-neutral-500 border border-neutral-900'
                      }`}>
                        {isBooked ? 'Full' : isSelected ? 'Selected' : slot.occupancy}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Helpful Intake / Notes Box */}
          <div className="bg-neutral-900/40 border border-neutral-850 rounded-xl p-3.5 space-y-2" id="notes-field-box">
            <label htmlFor="user-additional-notes" className="text-[10px] font-bold uppercase tracking-widest text-[#777] flex items-center gap-1.5 font-display">
              <FileText className="w-3.5 h-3.5 text-neutral-500" />
              Additional Booking Notes
            </label>
            <p className="text-[10px] text-neutral-500 leading-normal">Specify any prior diagnosis, hair lengths, strategy docs, or specific needs.</p>
            <textarea
              id="user-additional-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please let practitioner know about history, goals, or scheduling limits..."
              className="w-full text-xs p-2.5 bg-neutral-950/60 border border-neutral-800 rounded-xl placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-850 text-white min-h-[50px]"
            />
          </div>
        </div>
      </div>

      {/* Floating Sticky Bottom Actions */}
      <div className="bg-neutral-950 border-t border-neutral-900 p-4 shrink-0 flex flex-col gap-3 shadow-2xl" id="calendar-footer">
        {selectedDate && selectedSlot ? (
          <div className="text-[10.5px] text-green-450 text-center flex items-center justify-center gap-1.5 bg-green-950/25 p-2.5 rounded-xl border border-green-900/40 font-semibold" id="schedule-locked-msg">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-450" />
            Time Locked: {currentSelectionDetails?.fullLabel} at {selectedSlot}
          </div>
        ) : (
          <div className="text-[10px] text-neutral-400 text-center flex items-center justify-center gap-1.5 bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-850/40" id="schedule-pending-msg">
            <Info className="w-3.5 h-3.5 text-neutral-500" />
            Please tap an active date and a desired slot above.
          </div>
        )}

        <button
          id="confirm-booking-sum-btn"
          onClick={handleFormSubmit}
          disabled={!selectedDate || !selectedSlot}
          className={`w-full py-3.5 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all focus:outline-none uppercase tracking-widest text-xs font-display ${
            selectedDate && selectedSlot 
              ? `${theme.bg} text-white hover:opacity-90 active:scale-98` 
              : 'bg-neutral-900 text-neutral-600 border border-neutral-850/40 cursor-not-allowed font-semibold'
          }`}
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}
