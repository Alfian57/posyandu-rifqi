/**
 * AddressStep - Step 3: Address and contact info
 */

import type { FormData } from "@/presentation/hooks/usePesertaAdd";

interface AddressStepProps {
  form: FormData;
  handleChange: (field: keyof FormData, value: string | boolean | Date | null) => void;
}

export function AddressStep({ form, handleChange }: AddressStepProps) {
  const isTeleponValid = form.telepon.length >= 10 && form.telepon.length <= 13;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Alamat</h2>
        <p className="text-xs text-gray-500">Isi alamat lengkap peserta</p>
      </div>
      
      <div className="p-6">
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column - Alamat */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.alamat}
                onChange={(e) => handleChange("alamat", e.target.value)}
                placeholder="Nama jalan, nomor rumah, desa/kelurahan"
                rows={5}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
              />
            </div>

            {/* Right Column - RT, RW, Telepon */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    RT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.rt}
                    onChange={(e) => handleChange("rt", e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="001"
                    maxLength={3}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    RW <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.rw}
                    onChange={(e) => handleChange("rw", e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="001"
                    maxLength={3}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={form.telepon}
                    onChange={(e) => handleChange("telepon", e.target.value.replace(/\D/g, "").slice(0, 13))}
                    placeholder="08xxxxxxxxxx"
                    maxLength={13}
                    className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:ring-2 outline-none transition-all pr-16 ${
                      form.telepon.length > 0 && isTeleponValid
                        ? "border-green-400 focus:border-green-400 focus:ring-green-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                    }`}
                  />
                  <span
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${
                      form.telepon.length > 0 && isTeleponValid ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {form.telepon.length}/13
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
