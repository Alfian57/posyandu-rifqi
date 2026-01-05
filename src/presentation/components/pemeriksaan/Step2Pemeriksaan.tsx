import { BumilPemeriksaan } from './forms/BumilPemeriksaan';
import { BalitaPemeriksaan } from './forms/BalitaPemeriksaan';
import { RemajaPemeriksaan } from './forms/RemajaPemeriksaan';
import { DewasaPemeriksaan } from './forms/DewasaPemeriksaan';
import type { SelectedPeserta } from '@/presentation/hooks/usePemeriksaanForm';
import type { PemeriksaanFormData } from '@/presentation/hooks/usePemeriksaanForm';

interface Step2PemeriksaanProps {
    peserta: SelectedPeserta;
    formData: PemeriksaanFormData;
    onChange: (field: keyof PemeriksaanFormData, value: any) => void;
    onSkriningTbcChange: (tags: string[]) => void;
    onMentalChange: (key: string, value: boolean | null) => void;
    onPumaChange: (key: string, value: boolean | null) => void;
    onAdlChange: (key: string, value: number) => void;
}

export function Step2Pemeriksaan({
    peserta,
    formData,
    onChange,
    onSkriningTbcChange,
    onMentalChange,
    onPumaChange,
    onAdlChange
}: Step2PemeriksaanProps) {
    const kategori = peserta.kategori;
    const jenisKelamin = peserta.identity?.jenisKelamin || '';
    const isPerempuan = jenisKelamin?.toLowerCase() === 'perempuan';

    switch (kategori) {
        case 'bumil':
            return (
                <BumilPemeriksaan 
                    formData={formData} 
                    onChange={onChange} 
                    onSkriningTbcChange={onSkriningTbcChange} 
                />
            );
        case 'balita':
            return (
                <BalitaPemeriksaan 
                    formData={formData} 
                    onChange={onChange} 
                    onSkriningTbcChange={onSkriningTbcChange} 
                />
            );
        case 'remaja':
            return (
                <RemajaPemeriksaan 
                    formData={formData} 
                    onChange={onChange} 
                    onSkriningTbcChange={onSkriningTbcChange}
                    onMentalChange={onMentalChange}
                    isPerempuan={isPerempuan}
                />
            );
        case 'produktif':
        case 'lansia':
            return (
                <DewasaPemeriksaan 
                    formData={formData} 
                    onChange={onChange} 
                    onSkriningTbcChange={onSkriningTbcChange}
                    onPumaChange={onPumaChange}
                    onAdlChange={onAdlChange}
                    isLansia={kategori === 'lansia'}
                    isPerempuan={isPerempuan}
                />
            );
        default:
            return null;
    }
}
