const Footer = () => {
    return (
        <footer className="w-full mt-6 mb-6 px-4 md:px-0">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 hover:border-cyan-300/50 dark:hover:border-cyan-700/50 rounded-3xl lg:rounded-full px-6 py-4 md:px-8 lg:py-2 shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center p-2 rounded-full bg-linear-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 border border-white/60 dark:border-slate-700/50 shadow-sm shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600 dark:text-cyan-400">
                            <path d="M12 2v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="M2 12h2" /><path d="m4.93 19.07 1.41-1.41" /><path d="M13 12.29a5 5 0 1 1-6.73-6.73" /><path d="M22 17.5a4.5 4.5 0 0 1-4.5 4.5h-9a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5a4.6 4.6 0 0 1 1.05.12 5.5 5.5 0 0 1 10.45 2.13 4.5 4.5 0 0 1 2 3.25Z" />
                        </svg>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Atmos</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-emerald-300 dark:border-emerald-700 shadow-sm">
                    <span className="relative flex w-2 h-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[5px] md:text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider">
                        Powered by <a href="https://www.weatherapi.com/" className="text-cyan-700 dark:text-cyan-300 bg-cyan-100/80 dark:bg-cyan-900/50 rounded-full border border-cyan-200/50 dark:border-cyan-800/50">WeatherAPI</a>
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[11px] md:text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <span>Built with</span>                       
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 animate-pulse">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        <span>by</span>
                        <a
                            href="https://github.com/dharmendra0311"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-extrabold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 transition-colors"
                        >
                            Dharmendra
                        </a>
                    </div>
                    <span className="hidden sm:block text-slate-300 dark:text-slate-600">|</span>
                    <a
                        href="https://github.com/dharmendra0311"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-white transition-colors"
                    >                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span>@dharmendra0311</span>
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;