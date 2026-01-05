import { Stethoscope, ClipboardCheck } from 'lucide-react';
import { FormCard, FormInput, FormSelect, TagSelector, YesNoToggle } from '../../common/form';
import { 
    skriningTbcOptions, 
    riwayatDiriOptions, 
    imtOptions, 
    statusPerkawinanOptions,
    tesMataTelingaOptions,
    alatKontrasepsiOptions,
    edukasiProduktifOptions,
    adlPengendalianBabOptions,
    adlPengendalianBakOptions,
    adlKebersihanDiriOptions,
    adlPenggunaanWcOptions,
    adlMakanMinumOptions,
    adlMobilitasOptions,
    adlBerjalanOptions,
    adlNaikTurunTanggaOptions
} from '@/domain/entities/Pemeriksaan';
import type { PemeriksaanFormData } from '@/presentation/hooks/usePemeriksaanForm';

interface DewasaPemeriksaanProps {
    formData: PemeriksaanFormData;
    onChange: (field: keyof PemeriksaanFormData, value: any) => void;
    onSkriningTbcChange: (tags: string[]) => void;
    onPumaChange: (key: string, value: boolean | null) => void;
    onAdlChange: (key: string, value: number) => void;
    isLansia: boolean;
    isPerempuan: boolean;
}

export function DewasaPemeriksaan({ 
    formData, 
    onChange, 
    onSkriningTbcChange, 
    onPumaChange,
    onAdlChange,
    isLansia,
    isPerempuan 
}: DewasaPemeriksaanProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FormCard
                title="Pemeriksaan Fisik & Kesehatan"
                icon={<Stethoscope className="w-5 h-5 text-teal-600" />}
                iconBgColor="bg-teal-100"
                iconColor="text-teal-600"
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                             <TagSelector
                                label="Riwayat Penyakit Diri"
                                selectedTags={formData.riwayat_diri}
                                options={[...riwayatDiriOptions]}
                                onChange={(tags: string[]) => {
                                    const hasNotAda = tags.includes('Tidak Ada');
                                    const prevHadNotAda = formData.riwayat_diri.includes('Tidak Ada');
                                    if (hasNotAda && !prevHadNotAda) {
                                        onChange('riwayat_diri', ['Tidak Ada']);
                                    } else if (hasNotAda && prevHadNotAda && tags.length > 1) {
                                        onChange('riwayat_diri', tags.filter(t => t !== 'Tidak Ada'));
                                    } else {
                                        onChange('riwayat_diri', tags);
                                    }
                                }}
                            />
                        </div>
                    </div>

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
                                placeholder="Contoh: 85" 
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
                            <FormSelect
                                label="Status Perkawinan"
                                value={formData.status_perkawinan}
                                onChange={(v: string) => onChange('status_perkawinan', v)}
                                options={statusPerkawinanOptions}
                            />
                        </div>
                    </div>
                </div>
            </FormCard>

            <FormCard
                title="Pemeriksaan Lab"
                icon={<ClipboardCheck className="w-5 h-5 text-red-600" />}
                iconBgColor="bg-red-100"
                iconColor="text-red-600"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormInput label="Asam Urat (mg/dL)" value={formData.asam_urat} onChange={(v: string) => onChange('asam_urat', v.replace(/[^\d.]/g, ''))} placeholder="Contoh: 5.5" />
                    <FormInput label="Kolesterol (mg/dL)" value={formData.kolesterol} onChange={(v: string) => onChange('kolesterol', v.replace(/[^\d.]/g, ''))} placeholder="Contoh: 180" />
                    <FormInput label="Kadar HB" value={formData.kadar_hb} onChange={(v: string) => onChange('kadar_hb', v)} placeholder="Contoh: 12" />
                    <FormSelect label="Tes Mata" value={formData.tes_mata} onChange={(v: string) => onChange('tes_mata', v)} options={tesMataTelingaOptions} />
                    <FormSelect label="Tes Telinga" value={formData.tes_telinga} onChange={(v: string) => onChange('tes_telinga', v)} options={tesMataTelingaOptions} />
                </div>
            </FormCard>

            <FormCard
                title="Skrining TBC"
                icon={<ClipboardCheck className="w-5 h-5 text-orange-600" />}
                iconBgColor="bg-orange-100"
                iconColor="text-orange-600"
            >
                <TagSelector label="Gejala TBC" selectedTags={formData.skrining_tbc} options={[...skriningTbcOptions]} onChange={onSkriningTbcChange} />
            </FormCard>

            <FormCard
                title={isLansia ? "Skrining Gaya Hidup & Faktor Risiko" : "Skrining Gaya Hidup & PUMA (PPOK)"}
                icon={<ClipboardCheck className="w-5 h-5 text-rose-600" />}
                iconBgColor="bg-rose-100"
                iconColor="text-rose-600"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <YesNoToggle label="Merokok?" value={formData.merokok} onChange={(v: boolean | null) => onChange('merokok', v)} />
                    <YesNoToggle label="Konsumsi Gula >4 sdm/hari?" value={formData.konsumsi_gula} onChange={(v: boolean | null) => onChange('konsumsi_gula', v)} />
                    <YesNoToggle label="Konsumsi Garam >1 sdt/hari?" value={formData.konsumsi_garam} onChange={(v: boolean | null) => onChange('konsumsi_garam', v)} />
                    <YesNoToggle label="Konsumsi Lemak >5 sdm/hari?" value={formData.konsumsi_lemak} onChange={(v: boolean | null) => onChange('konsumsi_lemak', v)} />
                    
                    {!isLansia && (
                        <>
                            <YesNoToggle label="Sering napas pendek?" value={formData.skrining_puma?.napasPendek} onChange={(v: boolean | null) => onPumaChange('napasPendek', v)} />
                            <YesNoToggle label="Sering berdahak saat tidak flu?" value={formData.skrining_puma?.dahakSaatTidakFlu} onChange={(v: boolean | null) => onPumaChange('dahakSaatTidakFlu', v)} />
                            <YesNoToggle label="Sering batuk saat tidak flu?" value={formData.skrining_puma?.batukSaatTidakFlu} onChange={(v: boolean | null) => onPumaChange('batukSaatTidakFlu', v)} />
                            <YesNoToggle label="Sudah tes spirometri?" value={formData.skrining_puma?.tesSpirometri} onChange={(v: boolean | null) => onPumaChange('tesSpirometri', v)} />
                        </>
                    )}
                </div>
            </FormCard>

            {isLansia && (
                <FormCard
                    title="ADL - Indeks Barthel"
                    icon={<ClipboardCheck className="w-5 h-5 text-amber-600" />}
                    iconBgColor="bg-amber-100"
                    iconColor="text-amber-600"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormSelect label="Pengendalian BAB" value={String(formData.adl?.pengendalianBab ?? '')} onChange={(v) => onAdlChange('pengendalianBab', parseInt(v) || 0)} options={adlPengendalianBabOptions} />
                        <FormSelect label="Pengendalian BAK" value={String(formData.adl?.pengendalianBak ?? '')} onChange={(v) => onAdlChange('pengendalianBak', parseInt(v) || 0)} options={adlPengendalianBakOptions} />
                        <FormSelect label="Kebersihan Diri" value={String(formData.adl?.kebersihanDiri ?? '')} onChange={(v) => onAdlChange('kebersihanDiri', parseInt(v) || 0)} options={adlKebersihanDiriOptions} />
                        <FormSelect label="Penggunaan WC" value={String(formData.adl?.penggunaanWc ?? '')} onChange={(v) => onAdlChange('penggunaanWc', parseInt(v) || 0)} options={adlPenggunaanWcOptions} />
                        <FormSelect label="Makan & Minum" value={String(formData.adl?.makanMinum ?? '')} onChange={(v) => onAdlChange('makanMinum', parseInt(v) || 0)} options={adlMakanMinumOptions} />
                        <FormSelect label="Mobilitas" value={String(formData.adl?.mobilitas ?? '')} onChange={(v) => onAdlChange('mobilitas', parseInt(v) || 0)} options={adlMobilitasOptions} />
                        <FormSelect label="Berjalan Tempat Rata" value={String(formData.adl?.berjalanTempatRata ?? '')} onChange={(v) => onAdlChange('berjalanTempatRata', parseInt(v) || 0)} options={adlBerjalanOptions} />
                        <FormSelect label="Naik/Turun Tangga" value={String(formData.adl?.naikTurunTangga ?? '')} onChange={(v) => onAdlChange('naikTurunTangga', parseInt(v) || 0)} options={adlNaikTurunTanggaOptions} />
                    </div>
                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase font-bold text-amber-600 tracking-wider">Total Skor ADL</p>
                                <p className="text-2xl font-black text-amber-800">{formData.jumlah_skor_adl || 0}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs uppercase font-bold text-amber-600 tracking-wider">Tingkat Kemandirian</p>
                                <p className="text-lg font-bold text-amber-800 capitalize">{formData.tingkat_kemandirian || '-'}</p>
                            </div>
                        </div>
                    </div>
                </FormCard>
            )}

            {!isLansia && isPerempuan && (
                <FormCard title="Keluarga Berencana" icon={<ClipboardCheck className="w-5 h-5 text-pink-600" />} iconBgColor="bg-pink-100" iconColor="text-pink-600">
                    <FormSelect label="Alat Kontrasepsi" value={formData.alat_kontrasepsi} onChange={(v) => onChange('alat_kontrasepsi', v)} options={[{ value: '', label: 'Pilih...' }, ...alatKontrasepsiOptions]} />
                </FormCard>
            )}

            <FormCard title="Edukasi" icon={<ClipboardCheck className="w-5 h-5 text-purple-600" />} iconBgColor="bg-purple-100" iconColor="text-purple-600">
                <TagSelector label="Edukasi yang Diberikan" selectedTags={formData.edukasi} options={[...edukasiProduktifOptions]} onChange={(tags: string[]) => onChange('edukasi', tags)} />
            </FormCard>
        </div>
    );
}
