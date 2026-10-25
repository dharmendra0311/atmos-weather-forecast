import { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react'; 
import Navbar from './components/Navbar';
import Hotspots from './components/Hotspots';
import HeroCard from './components/HeroCard';
import AqiWidget from './components/AqiWidget';
import HourlyForecast from './components/HourlyForecast';
import TelemetryGrid from './components/TelemetryGrid';
import WeatherBackground from "./components/WeatherBackground";
import Footer from "./components/Footer";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Kandivali');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/weather?city=${city}`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city, refreshTrigger]);

  const handleSearch = (searchedCity) => setCity(searchedCity);
  const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative text-slate-800 dark:text-slate-200 transition-colors duration-500 pb-4">

      {/* Background Layers */}
      <div className="fixed inset-0 -z-30 bg-linear-to-br from-blue-200 via-indigo-100 to-purple-200"></div>
      <div className="fixed inset-0 -z-20 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 opacity-0 dark:opacity-100 transition-opacity duration-700 ease-in-out"></div>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <WeatherBackground condition={weatherData?.current?.condition?.text || 'clear'} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grow flex flex-col">
        <Navbar onSearch={handleSearch} unit={unit} setUnit={setUnit} onRefresh={handleRefresh} />

        <div className="px-4 sm:px-6 flex flex-col grow">

          {/* Hotspots stay visible outside the loading state! */}
          <Hotspots currentCity={city} onCitySelect={handleSearch} />

          {/* Error State */}
          {error && (
            <div className="w-full grow flex items-center justify-center mt-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-red-200 dark:border-red-900/50 rounded-3xl shadow-sm">
              <div className="text-center text-red-500 font-bold">Error: {error}</div>
            </div>
          )}

          {/* New Skeleton Loading State */}
          {loading && !error && (
            <div className="w-full grow flex flex-col items-center justify-center mt-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 rounded-3xl shadow-sm">

              {/* Custom Radar / Cloud Spinner */}
              <div className="relative flex items-center justify-center w-16 h-16 mb-5">
                <div className="absolute inset-0 border-4 border-slate-200/50 dark:border-slate-700/50 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <Cloud size={24} className="text-cyan-500 dark:text-cyan-400 animate-pulse" />
              </div>

              {/* Telemetry Text */}
              <h3 className="text-base md:text-lg font-black text-slate-800 dark:text-slate-200 tracking-tight text-center px-4">
                Fetching Atmospheric Data...
              </h3>
              <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1.5 text-center px-4">
                Connecting to High-Resolution Satellite Feeds
              </p>
            </div>
          )}

          {/* Actual Data Widgets (Rendered when loading is done) */}
          {!loading && !error && weatherData && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="lg:col-span-2"><HeroCard data={weatherData} unit={unit} /></div>
                <div className="lg:col-span-1"><AqiWidget data={weatherData} /></div>
              </div>

              <div className="w-full mt-6"><HourlyForecast data={weatherData} /></div>
              <div className="w-full mt-6"><TelemetryGrid data={weatherData} /></div>
            </>
          )}

          {/* Footer stays visible at the bottom of the screen! */}
          <div className="w-full mt-auto"><Footer /></div>

        </div>
      </div>
    </div>
  );
}

export default App;