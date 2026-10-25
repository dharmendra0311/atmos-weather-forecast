import React from 'react';

const WeatherIcon = ({ condition = 'sunny', temp = 20, isNight = false, className = 'w-full h-full' }) => {
    const getIconName = (text, currentTemp) => {
        const lower = (text || '').toLowerCase();

        // Night time overrides for clear skies
        if (isNight && (lower.includes('clear') || lower.includes('sunny'))) {
            return 'night';
        }

        // Severe weather
        if (lower.includes('thunder') || lower.includes('storm') || lower.includes('thundery')) return 'thunder';
        if (lower.includes('heavy rain') || lower.includes('torrential') || lower.includes('moderate to heavy rain')) return 'heavy-rain';
        if (lower.includes('drizzle') || lower.includes('light rain') || lower.includes('patchy rain')) return 'drizzle';
        if (lower.includes('rain') || lower.includes('shower')) return 'heavy-rain';

        // Snow / Freezing conditions
        if (lower.includes('snow') || lower.includes('blizzard') || lower.includes('sleet') || lower.includes('ice') || (currentTemp <= 0 && lower.includes('rain'))) {
            return 'snow';
        }

        // for smog and smoke conditions
        if (lower.includes('smog') || lower.includes('smoke')) {
            return 'smog'; // This tells the component to load public/smog.png
        }

        if (lower.includes('wind') || lower.includes('breeze') || lower.includes('gale')) return 'wind';

        // Explicit cloud/overcast terms OR if it's chilly/cold
        if (lower.includes('cloud') || lower.includes('overcast') || lower.includes('mist') || lower.includes('fog') || lower.includes('haze') || (currentTemp <= 15 && !lower.includes('sun'))) {
            return isNight ? 'cloudy-night' : 'cloudy'; // <-- Make sure you have a cloudy-night.png icon!
        }

        return 'sunny';
    };

    const iconName = getIconName(condition, temp);

    return (
        <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-sm border border-white/50 dark:border-slate-700/50 p-2.5 ${className}`}>
            <img
                src={`/icons/${iconName}.png`}
                alt={`${condition} icon`}
                className="w-full h-full object-contain scale-95 hover:scale-100 transition-transform duration-300 drop-shadow-md"
            />
        </div>
    );
};

export default WeatherIcon;