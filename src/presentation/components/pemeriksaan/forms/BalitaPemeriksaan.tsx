import { Stethoscope, ClipboardCheck } from 'lucide-react';
import { FormCard, FormInput, FormSelect, TagSelector } from '../../common/form';
import { skriningTbcOptions, kesimpulanBbOptions, balitaMendapatkanOptions, edukasiKonselingOptions } from '@/domain/entities/Pemeriksaan';
import type { PemeriksaanFormData } from '@/presentation/hooks/usePemeriksaanForm';

interface BalitaPemeriksaanProps {
    formData: PemeriksaanFormData;
    onChange: (field: keyof PemeriksaanFormData, value: any) => void;
    onSkriningTbcChange: (tags: string[]) => void;
}

export function BalitaPemeriksaan({ formData, onChange, onSkriningTbcChange }: BalitaPemeriksaanProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FormCard
                title="Pemeriksaan Balita"
                icon={<Stethoscope className="w-5 h-5 text-cyan-600" />}
                iconBgColor="bg-cyan-100"
                iconColor="text-cyan-600"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput
                        label="Umur (bulan)"
                        value={formData.umur_bulan}
                        onChange={(v: string) => onChange('umur_bulan', v.replace(/\D/g, ''))}
                        placeholder="Contoh: 24"
                    />
                    <FormSelect
                        label="Kesimpulan Berat Badan"
                        value={formData.kesimpulan_bb}
                        onChange={(v: string) => onChange('kesimpulan_bb', v)}
                        options={kesimpulanBbOptions}
                    />
                    <FormInput
                        label="Panjang Badan (cm)"
                        value={formData.panjang_badan}
                        onChange={(v: string) => onChange('panjang_badan', v.replace(/[^\d.]/g, ''))}
                        placeholder="Contoh: 85.5"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <FormInput
                        label="Berat Badan (kg)"
                        value={formData.berat_badan}
                        onChange={(v: string) => onChange('berat_badan', v.replace(/[^\d.]/g, ''))}
                        placeholder="Contoh: 12.5"
                    />
                    <FormInput
                        label="Lingkar Kepala (cm)"
                        value={formData.lingkar_kepala}
                        onChange={(v: string) => onChange('lingkar_kepala', v.replace(/[^\d.]/g, ''))}
                        placeholder="Contoh: 45"
                    />
                    <FormInput
                        label="Lingkar Lengan (cm)"
                        value={formData.lingkar_lengan}
                        onChange={(v: string) => onChange('lingkar_lengan', v.replace(/[^\d.]/g, ''))}
                        placeholder="Contoh: 14.5"
                    />
                </div>
            </FormCard>

            <FormCard
                title="Skrining & Layanan"
                icon={<ClipboardCheck className="w-5 h-5 text-orange-600" />}
                iconBgColor="bg-orange-100"
                iconColor="text-orange-600"
            >
                <TagSelector
                    label="Skrining TBC"
                    selectedTags={formData.skrining_tbc}
                    options={[...skriningTbcOptions]}
                    onChange={onSkriningTbcChange}
                />
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <TagSelector
                        label="Balita Mendapatkan"
                        selectedTags={formData.balita_mendapatkan}
                        options={[...balitaMendapatkanOptions]}
                        onChange={(tags: string[]) => onChange('balita_mendapatkan', tags)}
                    />
                </div>
            </FormCard>

            <FormCard
                title="Edukasi & Konseling"
                icon={<ClipboardCheck className="w-5 h-5 text-purple-600" />}
                iconBgColor="bg-purple-100"
                iconColor="text-purple-600"
            >
                <TagSelector
                    label="Edukasi yang Diberikan"
                    selectedTags={formData.edukasi_konseling}
                    options={[...edukasiKonselingOptions]}
                    onChange={(tags: string[]) => onChange('edukasi_konseling', tags)}
                />
            </FormCard>
        </div>
    );
}
