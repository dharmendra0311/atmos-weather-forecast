import React, { useState, useEffect, useRef } from 'react';
import { Navigation, RefreshCw, Moon, Sun, MapPin } from 'lucide-react';

const Navbar = ({ onSearch, unit, setUnit, onRefresh }) => {
    const [inputValue, setInputValue] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // New states for the autocomplete dropdown
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const currentHour = new Date().getHours();
        // Sets dark mode between 6 PM (18) and 6 AM (6)
        const isNightTime = currentHour >= 18 || currentHour < 6;

        setIsDarkMode(isNightTime);
        if (isNightTime) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // 1. Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 2. Debounced fetch for search suggestions
    useEffect(() => {
        if (inputValue.trim().length < 2) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/api/search?q=${inputValue}`);
                if (!response.ok) throw new Error('Failed to fetch suggestions');
                const data = await response.json();
                setSuggestions(data);
                setShowDropdown(true);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [inputValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue);
            setInputValue('');
            setShowDropdown(false);
        }
    };

    // 3. Handle clicking a city from the dropdown
    const handleSuggestionClick = (suggestion) => {
        onSearch(suggestion.name);
        setInputValue('');
        setShowDropdown(false);
    };

    const handleGPS = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => onSearch(`${position.coords.latitude},${position.coords.longitude}`),
                () => alert("Please enable location services to use the GPS feature.")
            );
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="relative z-100 flex flex-wrap items-center justify-between p-3 mx-2 md:mx-4 mt-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm gap-2 transition-colors duration-500">

            {/* Branding & Time */}
            <div className="flex items-center gap-3 md:gap-4 pl-1 md:pl-3 shrink-0 group">
                <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-slate-800 rounded-[1.15rem] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden shrink-0 border border-white dark:border-slate-700/50 transition-transform duration-300 hover:scale-105">
                    <img src="/atmos.png" alt="Atmos Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <h1 className="text-2xl md:text-[30px] font-black tracking-tight bg-linear-to-r from-blue-600 via-cyan-500 to-teal-400 dark:from-teal-400 dark:via-cyan-300 dark:to-slate-100 bg-clip-text text-transparent leading-none pb-0.5">
                            Atmos
                        </h1>
                    </div>
                    <p className="text-[10px] md:text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide mt-0.5">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Search Bar Wrapper (Includes Dropdown) */}
            <div ref={dropdownRef} className="relative flex-1 w-full lg:w-auto lg:max-w-2xl mx-1 lg:mx-8 order-last lg:order-0 z-50">
                <form onSubmit={handleSubmit} className="flex items-center w-full bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-slate-600/50 rounded-full focus-within:ring-2 focus-within:ring-blue-200 dark:focus-within:ring-blue-500/50 transition-colors duration-500">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search city, town or place..."
                        className="w-full py-2 px-4 md:py-2.5 md:px-5 bg-transparent outline-none text-xs md:text-sm text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    <div className="flex items-center pr-1.5 shrink-0">
                        <button type="submit" className="px-4 md:px-5 py-1.5 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-full shadow-md transition-all">
                            Search
                        </button>
                    </div>
                </form>

                {/* Autocomplete Dropdown */}
                {showDropdown && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <ul className="flex flex-col py-2 max-h-64 overflow-y-auto">
                            {suggestions.map((item) => (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => handleSuggestionClick(item)}
                                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors text-left"
                                    >
                                        <MapPin size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                                {item.name}
                                            </span>
                                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                                {item.region ? `${item.region}, ` : ''}{item.country}
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Utilities Section */}
            <div className="flex items-center gap-1 md:gap-2 shrink-0">
                <button type="button" onClick={handleGPS} className="flex items-center gap-1.5 p-2 md:px-3 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-full transition-colors">
                    <Navigation size={16} strokeWidth={2.5} /> <span className="hidden xl:inline">GPS</span>
                </button>

                <div className="flex items-center p-0.5 bg-white/60 dark:bg-slate-800/60 rounded-full border border-white/80 dark:border-slate-600/50">
                    <button type="button" onClick={() => setUnit('C')} className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${unit === 'C' ? 'text-white bg-blue-500 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>°C</button>
                    <button type="button" onClick={() => setUnit('F')} className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${unit === 'F' ? 'text-white bg-blue-500 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>°F</button>
                </div>

                <button type="button" onClick={onRefresh} className="hidden sm:flex p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-full transition-colors active:rotate-180 duration-300">
                    <RefreshCw size={16} strokeWidth={2.5} />
                </button>

                <button type="button" onClick={toggleTheme} className="flex items-center gap-1.5 p-2 md:px-3 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-full transition-colors">
                    {isDarkMode ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}
                    <span className="hidden xl:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;