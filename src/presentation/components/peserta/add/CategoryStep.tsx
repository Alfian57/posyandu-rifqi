/**
 * CategoryStep - Step 1 of Person Registration
 */

import { Check } from "lucide-react";
import { kategoriConfig } from "@/presentation/constants/kategoriConfig";
import type { KategoriKey } from "@/domain/entities/Peserta";

interface CategoryStepProps {
  selectedKategori: KategoriKey | null;
  onKategoriChange: (key: KategoriKey | null) => void;
}

export function CategoryStep({ selectedKategori, onKategoriChange }: CategoryStepProps) {
  const kategoriKeys = Object.keys(kategoriConfig) as KategoriKey[];
  
  // Display labels matching dashboard stats
  const displayLabels: Record<KategoriKey, string> = {
    bumil: 'Ibu Hamil',
    balita: 'Bayi & Balita',
    remaja: 'Anak & Remaja',
    produktif: 'Usia Produktif',
    lansia: 'Lansia',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Pilih Kategori</h2>
        <p className="text-xs text-gray-500">Pilih kategori peserta yang akan didaftarkan</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {kategoriKeys.map((key) => {
            const config = kategoriConfig[key];
            const Icon = config.icon;
            const isSelected = selectedKategori === key;
            
            return (
                <button
                key={key}
                type="button"
                onClick={() => onKategoriChange(isSelected ? null : key)}
                className={`group relative flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-300 bg-white ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/40"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Top Section: Icon and Selection Circle */}
                <div className="flex items-center justify-between w-full mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${config.bg}`}>
                    <Icon className={`w-6 h-6 ${config.color}`} />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? "bg-blue-600 border-blue-600 scale-110" : "border-gray-200"
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white stroke-3" />}
                  </div>
                </div>
                
                {/* Text Section */}
                <div className="text-left">
                  <p className={`text-sm tracking-tight transition-colors ${isSelected ? 'font-semibold text-blue-700' : 'font-medium text-gray-900'}`}>
                    {displayLabels[key]}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-2">
                    {config.description}
                  </p>
                </div>

                {/* Gradient Overlay for Selected */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/5 to-transparent pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
