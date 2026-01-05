/**
 * SyncStatus Component
 * Displays last sync time and sync button for dashboard
 */

import { RefreshCw } from 'lucide-react';
import { useDataCache } from '../../contexts/RealtimeDataContext';

function formatTimeDiff(date: Date | null): string {
    if (!date) return 'Belum pernah';
    
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes === 0) {
        return seconds <= 5 ? 'Baru saja' : `${seconds} detik lalu`;
    } else if (minutes === 1) {
        return '1 menit lalu';
    } else if (minutes < 60) {
        return `${minutes} menit lalu`;
    } else {
        const hours = Math.floor(minutes / 60);
        return `${hours} jam lalu`;
    }
}

function getStatusColor(date: Date | null): 'green' | 'yellow' | 'red' {
    if (!date) return 'red';
    
    const diff = Date.now() - date.getTime();
    const minutes = diff / 60000;
    
    if (minutes < 3) return 'green';
    if (minutes < 5) return 'yellow';
    return 'red';
}

const statusColorClasses = {
    green: 'bg-emerald-500',
    yellow: 'bg-amber-500',
    red: 'bg-red-500'
};

interface SyncStatusProps {
    variant?: 'compact' | 'full' | 'glass';
}

export function SyncStatus({ variant = 'compact' }: SyncStatusProps) {
    const { lastSyncTime, isSyncing, forceRefreshAll } = useDataCache();
    
    const statusColor = getStatusColor(lastSyncTime);
    const timeText = formatTimeDiff(lastSyncTime);

    const handleSync = async () => {
        await forceRefreshAll();
    };

    // Glass variant for dark hero section
    if (variant === 'glass') {
        return (
            <button
                onClick={handleSync}
                disabled={isSyncing}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={`Terakhir: ${timeText}`}
            >
                <span className={`w-2 h-2 rounded-full ${statusColorClasses[statusColor]}`} />
                <RefreshCw className={`w-4 h-4 text-slate-300 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-sm text-slate-300">
                    {isSyncing ? 'Sinkronisasi...' : 'Sinkronkan'}
                </span>
            </button>
        );
    }

    if (variant === 'compact') {
        return (
            <button
                onClick={handleSync}
                disabled={isSyncing}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={`Terakhir: ${timeText}`}
            >
                <span className={`w-2 h-2 rounded-full ${statusColorClasses[statusColor]}`} />
                <RefreshCw className={`w-4 h-4 text-gray-600 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-sm text-gray-600 hidden sm:inline">
                    {isSyncing ? 'Sinkronisasi...' : 'Sinkronkan'}
                </span>
            </button>
        );
    }

    return (
        <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${statusColorClasses[statusColor]} ${statusColor === 'green' ? 'animate-pulse' : ''}`} />
                <div>
                    <p className="text-sm font-medium text-gray-900">Status Sinkronisasi</p>
                    <p className="text-xs text-gray-500">Terakhir diperbarui: {timeText}</p>
                </div>
            </div>
            <button
                onClick={handleSync}
                disabled={isSyncing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">
                    {isSyncing ? 'Sinkronisasi...' : 'Sinkronkan'}
                </span>
            </button>
        </div>
    );
}
