import React from 'react';

const WeatherBackground = ({ condition = 'clear' }) => {
    const weatherType = condition.toLowerCase();

    const getStyles = () => {
        if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
            return {
                bg: 'from-slate-700 to-slate-900',
                effect: <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.2))] bg-size-[2px_50px] animate-[rain_0.5s_linear_infinite] opacity-40"></div>
            };
        }
        if (weatherType.includes('snow') || weatherType.includes('flakes')) {
            return {
                bg: 'from-blue-200 to-slate-300 dark:from-slate-800 dark:to-slate-900',
                effect: <div className="absolute inset-0 bg-[radial-gradient(circle,white_2px,transparent_3px)] bg-size-[50px_50px] animate-[snow_3s_linear_infinite] opacity-60"></div>
            };
        }
        if (weatherType.includes('cloud') || weatherType.includes('overcast')) {
            return {
                bg: 'from-slate-400 to-slate-600 dark:from-slate-800 dark:to-slate-900',
                effect: <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJ3aGl0ZSIgZmlsdGVyPSJibHVyKDIwcHgpIi8+PC9zdmc+')] bg-size-[300px_300px] animate-[drift_20s_linear_infinite]"></div>
            };
        }
        if (weatherType.includes('fog') || weatherType.includes('mist')) {
            return {
                bg: 'from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900',
                effect: <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/40 backdrop-blur-[2px]"></div>
            };
        }
        if (weatherType.includes('wind')) {
            return {
                bg: 'from-blue-400 to-blue-600 dark:from-slate-700 dark:to-slate-900',
                effect: <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] bg-size-[100%_4px] animate-[wind_2s_linear_infinite]"></div>
            };
        }
        // Default Clear/Sunny
        return {
            bg: 'from-blue-400 to-blue-600 dark:from-blue-900 dark:to-slate-900',
            effect: <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>
        };
    };

    const { bg, effect } = getStyles();

    return (
        <div className={`fixed inset-0 z-[-1] bg-linear-to-b ${bg} transition-colors duration-1000 overflow-hidden`}>
            {effect}
        </div>
    );
};

export default WeatherBackground;