import { ChevronRight as ChevronIcon } from 'lucide-react';
import type { PesertaDisplay } from '@/presentation/hooks/usePesertaList';

interface PesertaListItemProps {
    peserta: PesertaDisplay;
    config: any;
    age: number;
    onClick: () => void;
}

export function PesertaListItem({ peserta, config, age, onClick }: PesertaListItemProps) {
    const Icon = config.icon;

    return (
        <button
            onClick={onClick}
            className="w-full px-4 py-4 border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 text-left group flex items-center gap-4"
        >
            {/* Avatar */}
            <div className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className={`w-6 h-6 ${config.color}`} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Nama</p>
                    <p className="font-semibold text-gray-900 truncate group-hover:text-blue-700">{peserta.nama}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">NIK</p>
                    <p className="text-sm text-gray-700">{peserta.nik}</p>
                </div>
                <div className="hidden md:block">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Umur</p>
                    <p className="text-sm text-gray-700">{age} tahun</p>
                </div>
                <div className="hidden md:block">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Kategori</p>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-medium`}>
                        <Icon className="w-3 h-3" />
                        {config.label}
                    </span>
                </div>
            </div>

            {/* Arrow */}
            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
                <ChevronIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </div>
        </button>
    );
}
