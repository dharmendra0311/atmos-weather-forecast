import React, { useRef, useState } from 'react';
import { Droplet } from 'lucide-react';

const HourlyForecast = ({ data }) => {
    const scrollRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    if (!data || !data.forecast) return null;
    const { current, forecast } = data;
    const allHours = [...forecast.forecastday[0].hour, ...forecast.forecastday[1].hour];
    const upcomingHours = allHours.filter(hour => hour.time_epoch >= current.last_updated_epoch).slice(0, 12);

    const formatTime = (timeStr) => {
        const date = new Date(timeStr);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    // Desktop Drag-to-Scroll Handlers
    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsMouseDown(false);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Multiplier adjusts scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="w-full p-6 mt-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm transition-colors duration-500">
            <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white tracking-tight">Hourly Snapshot</h3>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">Swipe or scroll horizontally →</span>
            </div>

            <div className="relative mt-2">
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex items-center gap-1 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none border-b-2 border-slate-200/50 dark:border-slate-700/50 cursor-grab active:cursor-grabbing select-none"
                >
                    {upcomingHours.map((hour, index) => (
                        <div key={index} className="flex flex-col items-center justify-between min-w-21.25 h-32 p-2 hover:bg-white/40 dark:hover:bg-slate-800/50 rounded-2xl transition-colors shrink-0">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-300">{index === 0 ? 'Now' : formatTime(hour.time)}</span>
                            {/* Added pointer-events-none so images don't block the drag action */}
                            <img src={hour.condition.icon} alt={hour.condition.text} className="w-10 h-10 object-contain pointer-events-none" />
                            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{Math.round(hour.temp_c)}°C</span>
                            <div className="flex items-center gap-1 mt-1 px-2 py-0.5 bg-cyan-50/80 dark:bg-cyan-900/40 border border-cyan-100 dark:border-cyan-800/50 rounded-md">
                                {hour.chance_of_rain > 0 && <Droplet size={10} className="text-cyan-500 dark:text-cyan-400" strokeWidth={3} />}
                                <span className="text-[9px] font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">{hour.chance_of_rain > 0 ? `${hour.chance_of_rain}%` : '0% rain'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HourlyForecast;