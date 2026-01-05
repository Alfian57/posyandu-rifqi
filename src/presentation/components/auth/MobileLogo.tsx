/**
 * MobileLogo - Logo for mobile view on auth pages
 * Simple design with icon and system name
 */

import { Stethoscope } from 'lucide-react';

export function MobileLogo() {
    return (
        <div className="lg:hidden text-center mb-8">
            {/* Icon Logo */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 mb-4">
                <Stethoscope className="w-8 h-8" strokeWidth={2} />
            </div>
            
            {/* System Name */}
            <h1 className="text-xl font-urbanist font-bold text-gray-900 leading-tight">
                Posyandu Terintegrasi
            </h1>
            <p className="text-lg font-urbanist font-semibold text-gray-500">Layanan Primer</p>
        </div>
    );
}
