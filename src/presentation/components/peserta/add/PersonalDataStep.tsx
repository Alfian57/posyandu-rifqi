/**
 * PersonalDataStep - Step 2: Personal details and category-specific fields
 */

import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import type { FormData } from "@/presentation/hooks/usePesertaAdd";

interface PersonalDataStepProps {
  form: FormData;
  handleChange: (field: keyof FormData, value: string | boolean | Date | null) => void;
  categoryRequiredLabel: { field: keyof FormData; label: string; placeholder: string } | null;
  categoryFieldValue: string;
}

export function PersonalDataStep({ 
  form, 
  handleChange, 
  categoryRequiredLabel, 
  categoryFieldValue 
}: PersonalDataStepProps) {
  const isNikValid = form.nik.length === 16;
  const isBpjsValid = form.nomorBpjs.length === 13;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Data Pribadi</h2>
        <p className="text-xs text-gray-500">Isi data pribadi dan informasi BPJS</p>
      </div>
      
      <div className="p-6">
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-4">
            {/* Row 1: Nama & Tanggal Lahir */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.nama}
                onChange={(e) => handleChange("nama", e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  selected={form.tanggalLahir}
                  onChange={(date: Date | null) => handleChange("tanggalLahir", date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Pilih tanggal lahir"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  wrapperClassName="w-full"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Row 2: NIK & Status BPJS */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                NIK <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.nik}
                  onChange={(e) => handleChange("nik", e.target.value.replace(/\D/g, "").slice(0, 16))}
                  placeholder="16 digit NIK"
                  maxLength={16}
                  className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:ring-2 outline-none transition-all pr-16 ${
                    isNikValid
                      ? "border-green-400 focus:border-green-400 focus:ring-green-100"
                      : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                  }`}
                />
                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${
                    isNikValid ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {form.nik.length}/16
                </span>
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Status BPJS <span className="text-red-500">*</span>
              </label>
              <select
                value={form.kepesertaanBpjs ? "ya" : "tidak"}
                onChange={(e) => {
                  const isYa = e.target.value === "ya";
                  handleChange("kepesertaanBpjs", isYa);
                  if (!isYa) handleChange("nomorBpjs", "");
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="tidak">Tidak Terdaftar</option>
                <option value="ya">Terdaftar BPJS</option>
              </select>
            </div>

            {/* Row 3: Jenis Kelamin, Category Field, Nomor BPJS */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                value={form.jenisKelamin}
                onChange={(e) => handleChange("jenisKelamin", e.target.value as "Laki-Laki" | "Perempuan")}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="" disabled>Pilih Jenis Kelamin</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {categoryRequiredLabel && (
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {categoryRequiredLabel.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={categoryFieldValue}
                  onChange={(e) => handleChange(categoryRequiredLabel.field, e.target.value)}
                  placeholder={categoryRequiredLabel.placeholder}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Nomor BPJS <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.nomorBpjs}
                  onChange={(e) => handleChange("nomorBpjs", e.target.value.replace(/\D/g, "").slice(0, 13))}
                  disabled={!form.kepesertaanBpjs}
                  placeholder="13 digit nomor BPJS"
                  maxLength={13}
                  className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:ring-2 outline-none transition-all pr-16 ${
                    !form.kepesertaanBpjs
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : isBpjsValid
                      ? "border-green-400 focus:border-green-400 focus:ring-green-100"
                      : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                  }`}
                />
                {form.kepesertaanBpjs && (
                  <span
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${
                      isBpjsValid ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {form.nomorBpjs.length}/13
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
