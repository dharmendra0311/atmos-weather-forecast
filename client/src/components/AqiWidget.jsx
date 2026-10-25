import React from 'react';
import { Activity, Info } from 'lucide-react';

const AqiWidget = ({ data }) => {
    if (!data || !data.current || !data.current.air_quality) return null;
    const { air_quality } = data.current;
    const epaIndex = air_quality['us-epa-index'] || 1;
    const pm25 = air_quality.pm2_5 ? Math.round(air_quality.pm2_5) : '--';
    const pm10 = air_quality.pm10 ? Math.round(air_quality.pm10) : '--';

    const getAqiConfig = (index) => {
        switch (index) {
            case 1: return { label: 'Good', bg: 'bg-emerald-100/80 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-400', bar: 'w-1/4 from-emerald-400 to-emerald-300 dark:from-emerald-500 dark:to-emerald-400', msg: 'Air quality is satisfactory; clean and fresh air.' };
            case 2: return { label: 'Moderate', bg: 'bg-yellow-100/80 dark:bg-yellow-900/40', text: 'text-yellow-700 dark:text-yellow-400', bar: 'w-2/4 from-yellow-400 to-yellow-300 dark:from-yellow-500 dark:to-yellow-400', msg: 'Acceptable; moderate health concern for sensitive individuals.' };
            case 3: return { label: 'Sensitive', bg: 'bg-orange-100/80 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-400', bar: 'w-3/4 from-orange-400 to-orange-300 dark:from-orange-500 dark:to-orange-400', msg: 'Members of sensitive groups may experience health effects.' };
            default: return { label: 'Unhealthy', bg: 'bg-red-100/80 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-400', bar: 'w-full from-red-400 to-red-300 dark:from-red-500 dark:to-red-400', msg: 'Everyone may begin to experience health effects.' };
        }
    };

    const config = getAqiConfig(epaIndex);
    const displayIndex = pm25 !== '--' ? Math.round(pm25 * 2.5) : '--';

    return (
        <div className="w-full h-full p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-4xl shadow-sm flex flex-col justify-between transition-colors duration-500">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-inner border border-white dark:border-slate-700/50 ${config.bg} ${config.text}`}>
                        <Activity size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base font-extrabold text-slate-800 dark:text-white tracking-tight">Air & Atmosphere</h3>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">EPA US AQI Standard</p>
                    </div>
                </div>
                <span className={`px-3 py-1 text-[11px] font-bold rounded-full shadow-sm border border-white dark:border-slate-700/50 ${config.bg} ${config.text}`}>
                    {config.label}
                </span>
            </div>

            <div className="mt-6">
                <div className="flex items-end justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl leading-none font-black text-slate-800 dark:text-white tracking-tighter">{displayIndex}</span>
                        <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">AQI Proxy</span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{config.label}</span>
                </div>
                <div className="w-full h-2 bg-slate-200/60 dark:bg-slate-700/60 rounded-full overflow-hidden shadow-inner border border-black/5 dark:border-white/5 mt-3 relative">
                    <div className={`absolute top-0 left-0 h-full bg-linear-to-r rounded-full transition-all duration-1000 ${config.bar}`}></div>
                </div>
            </div>

            <div className="flex items-start gap-2 mt-4 text-slate-600 dark:text-slate-400">
                <Info size={14} className="mt-0.5 text-slate-400 dark:text-slate-500 shrink-0" strokeWidth={2.5} />
                <p className="text-xs font-semibold">{config.msg}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-white dark:border-slate-700/50 shadow-[0_-1px_0_rgba(0,0,0,0.03)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.02)]">
                <div className="flex flex-col gap-1 border-r border-white dark:border-slate-700/50 shadow-[1px_0_0_rgba(0,0,0,0.03)] dark:shadow-[1px_0_0_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">PM2.5 Particles</span>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{pm25}</span>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">µg/m³</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 pl-2">
                    <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">PM10 Particles</span>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{pm10}</span>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">µg/m³</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AqiWidget;