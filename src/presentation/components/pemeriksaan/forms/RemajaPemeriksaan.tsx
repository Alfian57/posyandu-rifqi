import { Stethoscope, ClipboardCheck } from 'lucide-react';
import { FormCard, FormInput, FormSelect, TagSelector, YesNoToggle } from '../../common/form';
import { 
    skriningTbcOptions, 
    riwayatKeluargaOptions, 
    perilakuBerisikoOptions, 
    imtOptions, 
    kadarHbOptions, 
    edukasiRemajaOptions 
} from '@/domain/entities/Pemeriksaan';
import type { PemeriksaanFormData } from '@/presentation/hooks/usePemeriksaanForm';

interface RemajaPemeriksaanProps {
    formData: PemeriksaanFormData;
    onChange: (field: keyof PemeriksaanFormData, value: any) => void;
    onSkriningTbcChange: (tags: string[]) => void;
    onMentalChange: (key: string, value: boolean | null) => void;
    isPerempuan: boolean;
}

const skriningMentalQuestions = [
    { key: 'nyamanDirumah', label: 'Merasa nyaman di rumah?' },
    { key: 'bebanSekolah', label: 'Terbebani tugas sekolah?' },
    { key: 'sukaTubuh', label: 'Menyukai bentuk tubuh?' },
    { key: 'temanDiluarGrup', label: 'Punya teman diluar grup?' },
    { key: 'konsumsiRokokAlkoholNarkoba', label: 'Konsumsi rokok/alkohol/narkoba?' },
    { key: 'hubunganSeksual', label: 'Pernah hubungan seksual?' },
    { key: 'tidakAmanLingkungan', label: 'Merasa tidak aman?' },
    { key: 'inginBunuhDiri', label: 'Keinginan bunuh diri?' },
];

export function RemajaPemeriksaan({ 
    formData, 
    onChange, 
    onSkriningTbcChange, 
    onMentalChange,
    isPerempuan 
}: RemajaPemeriksaanProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FormCard
                title="Pemeriksaan Fisik & Riwayat"
                icon={<Stethoscope className="w-5 h-5 text-indigo-600" />}
                iconBgColor="bg-indigo-100"
                iconColor="text-indigo-600"
            >
                <div className="space-y-8">
                    <TagSelector
                        label="Riwayat Penyakit Keluarga"
                        selectedTags={formData.riwayat_keluarga}
                        options={[...riwayatKeluargaOptions]}
                        onChange={(tags: string[]) => {
                            const hasNotAda = tags.includes('Tidak Ada');
                            const prevHadNotAda = formData.riwayat_keluarga.includes('Tidak Ada');
                            if (hasNotAda && !prevHadNotAda) {
                                onChange('riwayat_keluarga', ['Tidak Ada']);
                            } else if (hasNotAda && prevHadNotAda && tags.length > 1) {
                                onChange('riwayat_keluarga', tags.filter(t => t !== 'Tidak Ada'));
                            } else {
                                onChange('riwayat_keluarga', tags);
                            }
                        }}
                    />
                    
                    <TagSelector
                        label="Perilaku Berisiko"
                        selectedTags={formData.perilaku_berisiko}
                        options={[...perilakuBerisikoOptions]}
                        onChange={(tags: string[]) => {
                            const hasNotAda = tags.includes('Tidak Ada');
                            const prevHadNotAda = formData.perilaku_berisiko.includes('Tidak Ada');
                            if (hasNotAda && !prevHadNotAda) {
                                onChange('perilaku_berisiko', ['Tidak Ada']);
                            } else if (hasNotAda && prevHadNotAda && tags.length > 1) {
                                onChange('perilaku_berisiko', tags.filter(t => t !== 'Tidak Ada'));
                            } else {
                                onChange('perilaku_berisiko', tags);
                            }
                        }}
                    />

                    <div className="pt-6 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormInput
                                label="Tinggi Badan (cm)"
                                value={formData.tinggi_badan}
                                onChange={(v: string) => onChange('tinggi_badan', v.replace(/[^\d.]/g, ''))}
                                placeholder="Contoh: 165"
                            />
                            <FormInput
                                label="Berat Badan (kg)"
                                value={formData.berat_badan}
                                onChange={(v: string) => onChange('berat_badan', v.replace(/[^\d.]/g, ''))}
                                placeholder="Contoh: 55"
                            />
                            <FormSelect
                                label="IMT"
                                value={formData.imt}
                                onChange={(v: string) => onChange('imt', v)}
                                options={imtOptions}
                            />
                            <FormInput
                                label="Lingkar Perut (cm)"
                                value={formData.lingkar_perut}
                                onChange={(v: string) => onChange('lingkar_perut', v.replace(/[^\d.]/g, ''))}
                                placeholder="Contoh: 75"
                            />
                            <FormInput
                                label="Tekanan Darah (mmHg)"
                                value={formData.tekanan_darah}
                                onChange={(v: string) => onChange('tekanan_darah', v)}
                                placeholder="Contoh: 120/80"
                            />
                            <FormInput
                                label="Gula Darah (mg/dL)"
                                value={formData.gula_darah}
                                onChange={(v: string) => onChange('gula_darah', v.replace(/[^\d.]/g, ''))}
                                placeholder="Contoh: 100"
                            />
                            {isPerempuan && (
                                <FormSelect
                                    label="Kadar HB"
                                    value={formData.kadar_hb}
                                    onChange={(v: string) => onChange('kadar_hb', v)}
                                    options={kadarHbOptions}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </FormCard>

            <FormCard
                title="Skrining TBC"
                icon={<ClipboardCheck className="w-5 h-5 text-orange-600" />}
                iconBgColor="bg-orange-100"
                iconColor="text-orange-600"
            >
                <TagSelector
                    label="Gejala TBC"
                    selectedTags={formData.skrining_tbc}
                    options={[...skriningTbcOptions]}
                    onChange={onSkriningTbcChange}
                />
            </FormCard>

            <FormCard
                title="Skrining Mental (HEEADSSS)"
                icon={<ClipboardCheck className="w-5 h-5 text-rose-600" />}
                iconBgColor="bg-rose-100"
                iconColor="text-rose-600"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skriningMentalQuestions.map((q) => (
                        <YesNoToggle
                            key={q.key}
                            label={q.label}
                            value={formData.skrining_mental[q.key as keyof typeof formData.skrining_mental]}
                            onChange={(v: boolean | null) => onMentalChange(q.key, v)}
                        />
                    ))}
                </div>
            </FormCard>

            <FormCard
                title="Edukasi"
                icon={<ClipboardCheck className="w-5 h-5 text-purple-600" />}
                iconBgColor="bg-purple-100"
                iconColor="text-purple-600"
            >
                <TagSelector
                    label="Edukasi yang Diberikan"
                    selectedTags={formData.edukasi}
                    options={[...edukasiRemajaOptions]}
                    onChange={(tags: string[]) => onChange('edukasi', tags)}
                />
            </FormCard>
        </div>
    );
}
