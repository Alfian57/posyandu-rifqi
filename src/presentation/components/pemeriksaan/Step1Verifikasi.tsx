import { User, ClipboardCheck } from 'lucide-react';
import { FormCard, FormInput } from '../common/form';
import type { SelectedPeserta } from '@/presentation/hooks/usePemeriksaanForm';

interface Step1VerifikasiProps {
    peserta: SelectedPeserta;
}

export function Step1Verifikasi({ peserta }: Step1VerifikasiProps) {
    const identity = peserta.identity;
    
    const getCategoryField = () => {
        switch (peserta.kategori) {
            case 'bumil':
                return { label: 'Nama Suami', value: identity?.namaSuami };
            case 'balita':
            case 'remaja':
                return { label: 'Nama Orang Tua/Wali', value: identity?.namaOrtu };
            case 'produktif':
            case 'lansia':
                return { label: 'Pekerjaan', value: identity?.pekerjaan };
            default:
                return null;
        }
    };
    
    const categoryField = getCategoryField();
    
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <FormCard
                title="Data Pribadi"
                icon={<User className="w-5 h-5 text-blue-600" />}
                iconBgColor="bg-blue-100"
                iconColor="text-blue-600"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <FormInput label="Nama Lengkap" value={peserta.nama} onChange={() => {}} disabled />
                    </div>
                    <FormInput label="Kategori" value={peserta.kategori.toUpperCase()} onChange={() => {}} disabled />
                    <FormInput label="NIK" value={peserta.nik} onChange={() => {}} disabled />
                    <FormInput label="Jenis Kelamin" value={identity?.jenisKelamin || '-'} onChange={() => {}} disabled />
                    <FormInput label="Tanggal Lahir" value={identity?.tanggalLahir || '-'} onChange={() => {}} disabled />
                    {categoryField && categoryField.value && (
                        <FormInput label={categoryField.label} value={categoryField.value} onChange={() => {}} disabled />
                    )}
                    <FormInput 
                        label="Status BPJS" 
                        value={identity?.kepesertaanBpjs ? 'Terdaftar' : 'Tidak Terdaftar'} 
                        onChange={() => {}} 
                        disabled 
                    />
                    {identity?.kepesertaanBpjs && (
                        <FormInput label="Nomor BPJS" value={identity?.nomorBpjs || '-'} onChange={() => {}} disabled />
                    )}
                </div>
            </FormCard>
            
            <FormCard
                title="Alamat & Kontak"
                icon={<ClipboardCheck className="w-5 h-5 text-green-600" />}
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
            >
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <FormInput label="Alamat" value={identity?.alamat || '-'} onChange={() => {}} disabled />
                        <div className="grid grid-cols-2 gap-3">
                            <FormInput label="RT" value={identity?.rt || '-'} onChange={() => {}} disabled />
                            <FormInput label="RW" value={identity?.rw || '-'} onChange={() => {}} disabled />
                        </div>
                    </div>
                    <div>
                        <FormInput label="Nomor Telepon" value={identity?.telepon || '-'} onChange={() => {}} disabled />
                    </div>
                </div>
            </FormCard>
        </div>
    );
}
