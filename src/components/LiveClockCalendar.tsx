import React, { useState, useEffect } from 'react';
import { Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

export const LiveClockCalendar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Calendar logic
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer shadow-sm"
        title="Click to open calendar & time details"
      >
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="font-mono">{formattedTime}</span>
        </div>
        <span className="text-blue-300">|</span>
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="w-3.5 h-3.5 text-cyan-300" />
          <span>{formattedDate}</span>
        </div>
      </button>

      {/* Calendar & Time Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-blue-50 text-[#092B62] rounded-xl">
                    <CalendarIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base font-black text-[#092B62]">Live Clock & DepEd Schedule</h3>
                </div>
                <p className="text-xs text-stone-500">SY 2026-2027 Academic Calendar & Real-Time Clock</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Clock Display */}
            <div className="bg-gradient-to-r from-[#092B62] to-[#0b4ea2] rounded-2xl p-4 text-white text-center space-y-1 shadow-inner">
              <span className="text-[10px] uppercase font-bold text-cyan-200 tracking-wider">Current Philippine Standard Time</span>
              <div className="text-3xl font-black font-mono tracking-tight text-amber-300">{formattedTime}</div>
              <p className="text-xs text-blue-100 font-medium">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Interactive Month Calendar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-sm font-black text-stone-800">{monthNames[month]} {year}</h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevMonth}
                    className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-700 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-700 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-stone-400">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const dayNum = index + 1;
                  const isToday =
                    dayNum === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear();

                  return (
                    <div
                      key={`day-${dayNum}`}
                      className={`h-8 flex items-center justify-center rounded-xl font-bold transition-all ${
                        isToday
                          ? 'bg-[#092B62] text-white shadow-sm ring-2 ring-cyan-400'
                          : 'hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {dayNum}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-2xl text-[11px] text-stone-600 space-y-1 border border-stone-200">
              <div className="font-bold text-[#092B62] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Trimester Milestone Note</span>
              </div>
              <p>Aligned with DepEd Order No. 009, s. 2026. Active evaluation periods and DLL submissions are synchronized with the Data Vault.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
