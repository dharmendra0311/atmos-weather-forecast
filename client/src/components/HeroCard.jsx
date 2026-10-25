import React from 'react';
import { MapPin, Thermometer, ArrowUp, ArrowDown, Sparkles, Sunrise, Sunset } from 'lucide-react';
import WeatherIcon from "./WeatherIcon";

const HeroCard = ({ data, unit }) => {
    if (!data || !data.current) return null;

    const { location, current, forecast } = data;
    const todayForecast = forecast?.forecastday?.[0]?.day;
    const astro = forecast?.forecastday?.[0]?.astro;

    const dateObj = new Date(location.localtime);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    // Safely extract and format time from API's "YYYY-MM-DD HH:mm" string
    let formattedTime = '';
    if (location.localtime) {
        const timePart = location.localtime.split(' ')[1];
        if (timePart) {
            const [hours, minutes] = timePart.split(':');
            const h = parseInt(hours, 10);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const displayHours = h % 12 || 12;
            formattedTime = `${displayHours}:${minutes} ${ampm}`;
        }
    }

    const currentTemp = unit === 'C' ? current.temp_c : current.temp_f;
    const feelsLike = unit === 'C' ? current.feelslike_c : current.feelslike_f;
    const maxTemp = todayForecast ? (unit === 'C' ? todayForecast.maxtemp_c : todayForecast.maxtemp_f) : null;
    const minTemp = todayForecast ? (unit === 'C' ? todayForecast.mintemp_c : todayForecast.mintemp_f) : null;

    const displayCountry = location.country === 'Indien' ? 'India' : location.country;
    const isDay = current.is_day === 1;

    const getConditionTag = () => {
        if (current.precip_mm > 0) return 'Precipitation Active';
        if (current.cloud > 70) return 'Dense Cloud Cover';
        if (current.humidity > 80) return 'High Humidity';
        if (current.wind_kph > 20) return 'Breezy Conditions';
        return isDay ? 'Clear Skies' : 'Clear Night';
    };

    // Daylight Progress Calculation
    let daylightProgress = 0;
    if (astro && astro.sunrise && astro.sunset) {
        const parseTimeToMinutes = (timeStr) => {
            if (!timeStr || !timeStr.includes(':')) return 0;
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (hours === 12) hours = 0;
            if (modifier === 'PM') hours += 12;
            return hours * 60 + minutes;
        };

        const sunriseMins = parseTimeToMinutes(astro.sunrise);
        const sunsetMins = parseTimeToMinutes(astro.sunset);
        const currentMins = dateObj.getHours() * 60 + dateObj.getMinutes();

        if (currentMins >= sunsetMins) {
            daylightProgress = 100;
        } else if (currentMins > sunriseMins) {
            daylightProgress = ((currentMins - sunriseMins) / (sunsetMins - sunriseMins)) * 100;
        }
    }

    return (
        <div className="relative w-full p-5 md:p-7 bg-linear-to-br from-white/95 via-slate-50/90 to-slate-100/90 dark:from-slate-800/95 dark:via-slate-800/90 dark:to-slate-900/95 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 rounded-4xl shadow-sm transition-colors duration-500">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center p-3 bg-cyan-50/80 dark:bg-cyan-900/30 border border-cyan-100 dark:border-cyan-800/60 rounded-2xl shadow-sm shrink-0">
                        <MapPin size={20} className="text-teal-500 dark:text-teal-400 animate-bounce" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                            {location.name}
                        </h2>
                        <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                            {displayCountry}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1.5 mt-1 sm:mt-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/40 border border-cyan-100/50 dark:border-cyan-800/50 rounded-full text-cyan-700 dark:text-cyan-400 shadow-sm w-fit">
                        <Sparkles size={12} strokeWidth={2.5} />
                        <span className="text-[10px] md:text-[11px] font-extrabold tracking-widest uppercase">
                            {isDay ? 'Daytime' : 'Nighttime'} • {current.condition.text}
                        </span>
                    </div>
                    <span className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400 pr-1">
                        {formattedTime && `${formattedTime} • `}{formattedDate}
                    </span>
                </div>
            </div>

            {/* Main Temperature Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6 sm:gap-0">
                <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex items-start">
                        <span className="text-7xl md:text-[8rem] leading-none font-black text-slate-800 dark:text-white tracking-tighter">
                            {Math.round(currentTemp)}
                        </span>
                        <span className="text-4xl md:text-5xl font-extrabold text-blue-500 dark:text-blue-400 mt-2 md:mt-3">
                            °{unit}
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {current.condition.text}
                            </span>
                            <span className="px-2.5 py-1 text-[10px] md:text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-100/80 dark:bg-cyan-900/50 rounded-md border border-cyan-200/50 dark:border-cyan-800/50 uppercase tracking-wider">
                                {getConditionTag()}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
                                <Thermometer size={14} className="text-teal-500 dark:text-teal-400" strokeWidth={2.5} />
                                <span>Feels like <span className="text-slate-900 dark:text-white">{Math.round(feelsLike)}°{unit}</span></span>
                            </div>

                            {todayForecast && (
                                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
                                    <div className="flex items-center text-rose-500 dark:text-rose-400">
                                        <ArrowUp size={12} strokeWidth={3} />
                                        <span className="text-slate-900 dark:text-white ml-0.5">{Math.round(maxTemp)}°{unit}</span>
                                    </div>
                                    <span className="text-slate-300 dark:text-slate-600">/</span>
                                    <div className="flex items-center text-blue-500 dark:text-blue-400">
                                        <ArrowDown size={12} strokeWidth={3} />
                                        <span className="text-slate-900 dark:text-white ml-0.5">{Math.round(minTemp)}°{unit}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full sm:w-36 md:w-40 h-32 md:h-44 bg-linear-to-b from-white/90 to-blue-50/50 dark:from-slate-700/50 dark:to-slate-800/80 backdrop-blur-md border border-white dark:border-slate-600/50 rounded-4xl shadow-sm shrink-0">
                    <WeatherIcon
                        condition={data?.current?.condition?.text}
                        temp={data?.current?.temp_c}
                        isNight={data?.current?.is_day === 0}
                    />
                    <span className="text-[11px] md:text-xs font-extrabold text-slate-800 dark:text-slate-200 text-center leading-tight px-2 pb-2">
                        {current.condition.text}
                    </span>
                </div>
            </div>

            {/* Sunrise / Sunset Footer */}
            {astro && (
                <div className="flex items-center justify-between w-full mt-8 pt-5 border-t border-slate-200/60 dark:border-slate-700/60">

                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800/50 rounded-full text-amber-500 shadow-sm shrink-0">
                            <Sunrise size={18} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sunrise</span>
                            <span className="text-xs md:text-sm font-black text-slate-800 dark:text-white">{astro.sunrise}</span>
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-center w-1/3 px-4">
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-amber-400 via-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${daylightProgress}%` }}
                            ></div>
                        </div>
                        <span className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-2">Daylight active cycle</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col text-right">
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sunset</span>
                            <span className="text-xs md:text-sm font-black text-slate-800 dark:text-white">{astro.sunset}</span>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 rounded-full text-indigo-500 shadow-sm shrink-0">
                            <Sunset size={18} strokeWidth={2.5} />
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default HeroCard;