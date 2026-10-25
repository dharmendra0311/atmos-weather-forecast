import React, { useRef, useMemo } from 'react';
import { Target, ChevronLeft, ChevronRight } from 'lucide-react';

const Hotspots = ({ currentCity, onCitySelect }) => {
    const defaultCities = ['Kandivali', 'New Delhi', 'Gujarat', 'London', 'Tokyo', 'New York', 'Dubai', 'Korea', 'Japan', 'Singapore'];
    const scrollRef = useRef(null);

    // Dynamically reorder the array so the active city is always first
    const displayCities = useMemo(() => {
        if (!currentCity) return defaultCities;
        const filtered = defaultCities.filter(city => city.toLowerCase() !== currentCity.toLowerCase());
        // Capitalize the first letter for aesthetics if it was a manual search
        const formattedCity = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
        return [formattedCity, ...filtered];
    }, [currentCity]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex items-center gap-2 md:gap-3 mt-6 w-full transition-colors duration-500">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-600 dark:text-slate-400 shrink-0">
                <Target size={16} strokeWidth={2.5} />
                <span className="text-[11px] font-bold tracking-widest uppercase">Hotspots:</span>
            </div>

            <button
                onClick={() => scroll('left')}
                className="flex items-center justify-center w-7 h-7 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-slate-700/50 rounded-full text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition-colors shadow-sm shrink-0 z-10"
            >
                <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            <div
                ref={scrollRef}
                className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none shrink-0 w-[calc(100vw-110px)] sm:w-auto sm:flex-1"
            >
                {displayCities.map((city) => {
                    const isActive = currentCity?.toLowerCase() === city.toLowerCase();
                    return (
                        <button
                            key={city}
                            onClick={() => onCitySelect(city)}
                            className={`px-4 py-1.5 text-[11px] font-bold rounded-full transition-all whitespace-nowrap shadow-sm border ${isActive
                                    ? 'bg-[#0095FF] text-white border-[#0095FF] shadow-[0_2px_8px_rgba(0,149,255,0.3)]'
                                    : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-white/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white backdrop-blur-md'
                                }`}
                        >
                            {city}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => scroll('right')}
                className="flex items-center justify-center w-7 h-7 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-slate-700/50 rounded-full text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition-colors shadow-sm shrink-0 z-10"
            >
                <ChevronRight size={16} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default Hotspots;