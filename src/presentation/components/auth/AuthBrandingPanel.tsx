/**
 * AuthBrandingPanel - Left side branding panel for auth pages
 * Reusable across LoginPage, RegisterPage, etc.
 */

import { 
    Heart, 
    Baby, 
    GraduationCap, 
    Briefcase, 
    PersonStanding, 
    Stethoscope 
} from 'lucide-react';

const sasaranIcons = [
    { icon: Heart, iconColor: 'text-pink-400' },
    { icon: Baby, iconColor: 'text-blue-400' },
    { icon: GraduationCap, iconColor: 'text-amber-400' },
    { icon: Briefcase, iconColor: 'text-emerald-400' },
    { icon: PersonStanding, iconColor: 'text-purple-400' },
];

export function AuthBrandingPanel() {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            {/* Content - 3 Section Layout */}
            <div className="relative z-10 flex flex-col h-full px-12 py-10">
                {/* TOP - Icon Logo Only */}
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Stethoscope className="w-7 h-7" strokeWidth={2} />
                </div>

                {/* MIDDLE - Title & Categories (Centered) */}
                <div className="flex-1 flex flex-col justify-center">
                    {/* Hero Text */}
                    <div className="mb-10">
                        <p className="text-blue-400 text-sm font-medium mb-2 uppercase tracking-wider">
                            Posyandu Terintegrasi
                        </p>
                        <h2 className="text-4xl font-urbanist font-bold text-white mb-2 leading-tight">
                            Layanan Primer Desa
                        </h2>
                        <h2 className="text-4xl font-urbanist font-bold text-white mb-4">
                            Tondomulyo
                        </h2>
                        <p className="text-slate-400 max-w-md leading-relaxed">
                            Sistem informasi kesehatan terpadu untuk mendukung pelayanan prima bagi seluruh warga desa.
                        </p>
                    </div>

                    {/* 5 Sasaran Layanan */}
                    <div className="space-y-3">
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                            5 Sasaran Layanan
                        </p>
                        <div className="flex items-center gap-2">
                            {sasaranIcons.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg transition-all hover:scale-110 hover:bg-white/20 cursor-pointer"
                                    >
                                        <IconComponent className={`w-5 h-5 ${item.iconColor}`} strokeWidth={2} />
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-slate-500 text-xs">
                            Ibu Hamil • Balita • Remaja • Produktif • Lansia
                        </p>
                    </div>
                </div>

                {/* BOTTOM - Location Info */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                        <div className="relative flex items-center justify-center">
                            <span className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-75" />
                            <span className="relative w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Kec. Jakenan, Kab. Pati</p>
                        <p className="text-slate-400 text-xs">Jawa Tengah • Indonesia</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
