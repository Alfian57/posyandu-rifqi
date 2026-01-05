/**
 * PemeriksaanCategoryFilter Component
 * Category filter chips for pemeriksaan page
 */

import type { KategoriKey } from '../../../domain/entities/Peserta';
import type { KategoriConfig } from '../../constants/kategoriConfig';



interface PemeriksaanCategoryFilterProps {
    selectedFilters: KategoriKey[];
    kategoriConfig: Record<KategoriKey, KategoriConfig>;
    onFilterChange: (filters: KategoriKey[]) => void;
}

export function PemeriksaanCategoryFilter({ 
    selectedFilters, 
    kategoriConfig, 
    onFilterChange 
}: PemeriksaanCategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <button
                onClick={() => onFilterChange([])}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedFilters.length === 0
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
            >
                Semua
            </button>
            {(Object.entries(kategoriConfig) as [KategoriKey, KategoriConfig][]).map(([key, config]) => {
                const Icon = config.icon;
                const isActive = selectedFilters.includes(key);
                return (
                    <button
                        key={key}
                        onClick={() => {
                            if (isActive) {
                                onFilterChange(selectedFilters.filter(f => f !== key));
                            } else {
                                onFilterChange([...selectedFilters, key]);
                            }
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive
                            ? `${config.bg} ${config.color} ring-2 ring-offset-1 ring-current`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {config.label}
                    </button>
                );
            })}
        </div>
    );
}
