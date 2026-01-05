/**
 * PesertaProfileHeader Component
 * Gradient header with avatar, name, category, and action buttons
 * Updated to support both camelCase (legacy) and snake_case (API) field names
 */

import { Edit2, Trash2 } from 'lucide-react';
import type { KategoriConfig } from '../../constants/kategoriConfig';

interface PesertaData {
    nama: string;
}

interface Props {
    peserta: PesertaData;
    config: KategoriConfig;
    age: number;
    onEdit: () => void;
    onDelete: () => void;
}

export function PesertaProfileHeader({ peserta, config, age, onEdit, onDelete }: Props) {
    const Icon = config.icon;

    return (
        <div className={`bg-linear-to-r ${config.gradient} rounded-2xl p-6 text-white mb-6`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{peserta.nama}</h1>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                                {config.label}
                            </span>
                            <span className="text-white/80 text-sm">
                                {age} tahun
                            </span>
                        </div>
                    </div>
                </div>
                {/* Action buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 text-white/90 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                    </button>
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 text-gray-900 bg-white hover:bg-gray-100 rounded-xl font-medium transition-colors flex items-center gap-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Data
                    </button>
                </div>
            </div>
        </div>
    );
}
