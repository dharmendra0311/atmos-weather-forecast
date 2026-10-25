import React from 'react';
import { Radar, Droplet, Wind, Sun, Eye, Gauge, Thermometer, ShieldCheck, ShieldAlert } from 'lucide-react';

const TelemetryGrid = ({ data }) => {
    if (!data || !data.current) return null;
    const { current } = data;
    const uvLevel = current.uv <= 2 ? 'Low' : current.uv <= 5 ? 'Moderate' : current.uv <= 7 ? 'High' : 'Extreme';
    const comfort = current.feelslike_c < 15 ? 'Cold' : current.feelslike_c > 30 ? 'Hot' : 'Comfortable';

    return (
        <div className="w-full mt-8 transition-colors duration-500">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-12 h-12 bg-cyan-100/80 dark:bg-cyan-900/40 rounded-xl text-cyan-600 dark:text-cyan-400 shadow-inner border border-white dark:border-slate-700/50">
                        <Radar size={26} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-sm font-extrabold text-slate-800 dark:text-white tracking-tight">Atmospheric Data & Live Telemetry</h2>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Real-time Sensor Feeds</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Humidity */}
                <div className="flex flex-col justify-between h-40 p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Humidity</span>
                        <div className="flex items-center justify-center w-7 h-7 bg-blue-50 dark:bg-blue-900/40 rounded-full text-blue-500 dark:text-blue-400 border border-white dark:border-slate-700/50 shadow-inner">
                            <Droplet size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{current.humidity}</span>
                        <span className="text-lg font-bold text-blue-500 dark:text-blue-400">%</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-white dark:border-slate-700/50 shadow-[0_-1px_0_rgba(0,0,0,0.02)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.02)]">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Dew Point</span>
                        <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-300">{current.dewpoint_c ? `${Math.round(current.dewpoint_c)}°C` : '--'}</span>
                    </div>
                </div>

                {/* Wind */}
                <div className="flex flex-col justify-between h-40 p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Wind Velocity</span>
                        <div className="flex items-center justify-center w-7 h-7 bg-teal-50 dark:bg-teal-900/40 rounded-full text-teal-500 dark:text-teal-400 border border-white dark:border-slate-700/50 shadow-inner">
                            <Wind size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{Math.round(current.wind_kph)}</span>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">km/h</span>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-900/50 border border-teal-200/50 dark:border-teal-800/50 rounded-full">
                            {current.wind_dir} ({current.wind_degree}°)
                        </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-white dark:border-slate-700/50 shadow-[0_-1px_0_rgba(0,0,0,0.02)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.02)]">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Peak Gusts</span>
                        <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-300">{Math.round(current.gust_kph)} km/h</span>
                    </div>
                </div>

                {/* UV */}
                <div className="flex flex-col justify-between h-40 p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">UV Radiation</span>
                        <div className="flex items-center justify-center w-7 h-7 bg-yellow-50 dark:bg-yellow-900/40 rounded-full text-yellow-500 dark:text-yellow-400 border border-white dark:border-slate-700/50 shadow-inner">
                            <Sun size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{current.uv}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${uvLevel === 'Low' ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/40 border-emerald-200/50 dark:border-emerald-800/50' : 'text-orange-700 dark:text-orange-400 bg-orange-100/80 dark:bg-orange-900/40 border-orange-200/50 dark:border-orange-800/50'}`}>
                            {uvLevel}
                        </span>
                    </div>
                    <div className={`flex items-center gap-1.5 pt-3 mt-auto border-t border-white dark:border-slate-700/50 shadow-[0_-1px_0_rgba(0,0,0,0.02)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.02)] ${uvLevel === 'Low' ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600 dark:text-orange-400'}`}>
                        {uvLevel === 'Low' ? <ShieldCheck size={12} strokeWidth={3} /> : <ShieldAlert size={12} strokeWidth={3} />}
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{uvLevel === 'Low' ? 'No sun protection required' : 'Protection recommended'}</span>
                    </div>
                </div>

                {/* Visibility */}
                <div className="flex flex-col justify-between h-40 p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Visibility</span>
                        <div className="flex items-center justify-center w-7 h-7 bg-emerald-50 dark:bg-emerald-900/40 rounded-full text-emerald-500 dark:text-emerald-400 border border-white dark:border-slate-700/50 shadow-inner">
                            <Eye size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{current.vis_km}</span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">km</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-white dark:border-slate-700/50 shadow-[0_-1px_0_rgba(0,0,0,0.02)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.02)]">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Clarity</span>
                        <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-300">{current.vis_km > 8 ? 'Clear Horizon' : 'Reduced'}</span>
                    </div>
                </div>

                {/* Pressure */}
                <div className="flex flex-col justify-between h-40 p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Surface Pressure</span>
                        <div className="flex items-center justify-center w-7 h-7 bg-purple-50 dark:bg-purple-900/40 rounded-full text-purple-500 dark:text-purple-400 border border-white dark:border-slate-700/50 shadow-inner">
                            <Gauge size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{Math.round(current.pressure_mb)}</span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">hPa</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-white dark:border-slate-700/50 shadow-[0_-1px_0_rgba(0,0,0,0.02)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.02)]">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Atmospheric State</span>
                        <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-300">{current.pressure_mb > 1013 ? 'High' : 'Normal / Low'}</span>
                    </div>
                </div>

                {/* Thermal Index */}
                <div className="flex flex-col justify-between h-40 p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Thermal Index</span>
                        <div className="flex items-center justify-center w-7 h-7 bg-rose-50 dark:bg-rose-900/40 rounded-full text-rose-500 dark:text-rose-400 border border-white dark:border-slate-700/50 shadow-inner">
                            <Thermometer size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{Math.round(current.feelslike_c)}°C</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-white dark:border-slate-700/50 shadow-[0_-1px_0_rgba(0,0,0,0.02)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.02)]">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Perceived Comfort</span>
                        <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-300">{comfort}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TelemetryGrid;