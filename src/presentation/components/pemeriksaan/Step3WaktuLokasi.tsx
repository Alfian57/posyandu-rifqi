import { Calendar } from 'lucide-react';
import { FormCard, FormDatePicker, FormSelect } from '../common/form';
import type { PemeriksaanFormData } from '@/presentation/hooks/usePemeriksaanForm';

interface Step3WaktuLokasiProps {
    formData: PemeriksaanFormData;
    onChange: (field: keyof PemeriksaanFormData, value: any) => void;
}

export function Step3WaktuLokasi({ formData, onChange }: Step3WaktuLokasiProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FormCard
                title="Data Kunjungan"
                icon={<Calendar className="w-5 h-5 text-emerald-600" />}
                iconBgColor="bg-emerald-100"
                iconColor="text-emerald-600"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormDatePicker
                        label="Tanggal Kunjungan"
                        value={formData.tanggal_kunjungan}
                        onChange={(v) => onChange('tanggal_kunjungan', v)}
                        required
                    />
                    <FormSelect
                        label="Lokasi Pemeriksaan"
                        value={formData.lokasi}
                        onChange={(v) => onChange('lokasi', v as 'posyandu' | 'kunjungan_rumah' | '')}
                        options={[
                            { value: 'posyandu', label: 'Posyandu' },
                            { value: 'kunjungan_rumah', label: 'Kunjungan Rumah' }
                        ]}
                    />
                    <FormSelect
                        label="Rujuk ke Faskes?"
                        value={formData.rujuk === null ? '' : formData.rujuk ? 'true' : 'false'}
                        onChange={(v) => {
                            if (v === '') onChange('rujuk', null);
                            else onChange('rujuk', v === 'true');
                        }}
                        options={[
                            { value: 'false', label: 'Tidak' },
                            { value: 'true', label: 'Ya, Rujuk ke Faskes/Pustu' }
                        ]}
                    />
                </div>
            </FormCard>
        </div>
    );
}
