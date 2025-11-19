import React from 'react';
import { motion } from 'framer-motion';
import vguLogo from '../assets/vgu.png';
import councilLogo from '../assets/council.jpg';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
            {/* App Bar */}
            <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={vguLogo} alt="VGU Logo" className="h-12 w-auto object-contain" />
                        <div className="hidden md:block w-px h-8 bg-slate-300 mx-2"></div>
                        <img src={councilLogo} alt="Council Logo" className="h-12 w-auto object-contain rounded-full" />
                    </div>

                    <div className="text-right">
                        <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">
                            Student Council Election
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">
                            Vivekananda Global University
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Bottom Bar */}
            <footer className="bg-slate-900 text-white py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3 opacity-80">
                            <img src={vguLogo} alt="VGU Logo" className="h-8 w-auto brightness-0 invert" />
                            <span className="text-sm font-medium">© 2025 VGU Student Council</span>
                        </div>

                        <div className="flex gap-6 text-sm text-slate-400">
                            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                            <span className="hover:text-white transition-colors cursor-pointer">Contact Support</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DashboardLayout;
