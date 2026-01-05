/**
 * ConfirmationStep - Step 4: Final review of data
 */

import { kategoriConfig } from "@/presentation/constants/kategoriConfig";
import type { KategoriKey } from "@/domain/entities/Peserta";
import type { FormData } from "@/presentation/hooks/usePesertaAdd";

interface ConfirmationStepProps {
  form: FormData;
  categoryRequiredLabel: { label: string } | null;
  categoryFieldValue: string;
}

export function ConfirmationStep({ 
  form, 
  categoryRequiredLabel, 
  categoryFieldValue 
}: ConfirmationStepProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Konfirmasi Data</h2>
        <p className="text-xs text-gray-500">Periksa kembali data sebelum menyimpan</p>
      </div>
      
      <div className="p-6 space-y-4">
        {/* Kategori Header */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          {form.kategori && (() => {
            const config = kategoriConfig[form.kategori as KategoriKey];
            const Icon = config.icon;
            return (
              <>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.bg}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Kategori</p>
                  <p className="text-sm font-semibold text-gray-900">{config.label}</p>
                </div>
              </>
            );
          })()}
        </div>

        {/* Data Grid - 3 columns */}
        <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
          <div className="p-3 bg-white">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Nama</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{form.nama || "-"}</p>
          </div>
          <div className="p-3 bg-white">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">NIK</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{form.nik || "-"}</p>
          </div>
          <div className="p-3 bg-white">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Tanggal Lahir</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">
              {form.tanggalLahir ? form.tanggalLahir.toLocaleDateString("id-ID") : "-"}
            </p>
          </div>
          <div className="p-3 bg-white">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Jenis Kelamin</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{form.jenisKelamin}</p>
          </div>
          <div className="p-3 bg-white">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">BPJS</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">
              {form.kepesertaanBpjs ? form.nomorBpjs : "Tidak terdaftar"}
            </p>
          </div>
          <div className="p-3 bg-white">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Telepon</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{form.telepon || "-"}</p>
          </div>
          {/* Category-specific field */}
          {categoryRequiredLabel && (
            <div className="p-3 bg-white">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">{categoryRequiredLabel.label}</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{categoryFieldValue || "-"}</p>
            </div>
          )}
        </div>

        {/* Alamat - 3 columns */}
        <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
          <div className="p-3 bg-gray-50">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Alamat</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{form.alamat || "-"}</p>
          </div>
          <div className="p-3 bg-gray-50">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">RT</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{form.rt || "-"}</p>
          </div>
          <div className="p-3 bg-gray-50">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">RW</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{form.rw || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
