/**
 * SyncLoadingOverlay Component
 * Fixed full-page loading overlay during synchronization
 * With clear messaging for Kader users
 */

import { useDataCache } from '../../contexts/RealtimeDataContext';
import { RefreshCw, Database } from 'lucide-react';

export function SyncLoadingOverlay() {
    const { isSyncing } = useDataCache();

    if (!isSyncing) return null;

    return (
        <div 
            className="fixed inset-0 z-9999 flex items-center justify-center"
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)'
            }}
        >
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 text-center">
                {/* Icon with animation */}
                <div className="relative mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <Database className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -bottom-2 right-1/2 translate-x-8">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500">
                            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Memperbarui Data
                </h3>

                {/* Clear message for Kader */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Sedang mengambil data peserta dan pemeriksaan terbaru dari server. 
                    <br />
                    <span className="text-gray-500">Mohon tunggu sebentar...</span>
                </p>

                {/* Loading dots */}
                <div className="flex justify-center gap-1.5 mb-4">
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>

                {/* Info text */}
                <p className="text-xs text-gray-400">
                    Data akan otomatis diperbarui setelah selesai
                </p>
            </div>
        </div>
    );
}
