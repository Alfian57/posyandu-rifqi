/**
 * PesertaInfoCards Component
 * Three-column info cards: Data Pribadi, Kontak & Alamat, Status BPJS
 * Updated to support both camelCase (legacy) and snake_case (API) field names
 */

import { User, MapPin, CreditCard } from 'lucide-react';

interface PesertaData {
    nik: string;
    nama: string;
    // Support both formats
    jenisKelamin?: string;
    jenis_kelamin?: string;
    tanggalLahir?: string;
    tanggal_lahir?: string;
    telepon?: string;
    rt?: string;
    rw?: string;
    alamat?: string;
    kepesertaanBpjs?: boolean;
    kepesertaan_bpjs?: boolean;
    nomorBpjs?: string;
    nomor_bpjs?: string;
}

interface Props {
    peserta: PesertaData;
}

export function PesertaInfoCards({ peserta }: Props) {
    // Support both camelCase and snake_case
    const jenisKelamin = peserta.jenis_kelamin || peserta.jenisKelamin || '-';
    const tanggalLahir = peserta.tanggal_lahir || peserta.tanggalLahir || '';
    const kepesertaanBpjs = peserta.kepesertaan_bpjs ?? peserta.kepesertaanBpjs ?? false;
    const nomorBpjs = peserta.nomor_bpjs || peserta.nomorBpjs || '';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Data Pribadi */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                        </div>
                        Data Pribadi
                    </h3>
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">NIK</p>
                        <p className="font-medium text-gray-900">{peserta.nik}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Jenis Kelamin</p>
                        <p className="font-medium text-gray-900">{jenisKelamin}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tanggal Lahir</p>
                        <p className="font-medium text-gray-900">
                            {tanggalLahir 
                                ? new Date(tanggalLahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                                : '-'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Kontak & Alamat */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                        </div>
                        Kontak & Alamat
                    </h3>
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Telepon</p>
                        <p className="font-medium text-gray-900">{peserta.telepon || '-'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">RT</p>
                            <p className="font-medium text-gray-900">{peserta.rt || '-'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">RW</p>
                            <p className="font-medium text-gray-900">{peserta.rw || '-'}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Alamat</p>
                        <p className="font-medium text-gray-900">{peserta.alamat || '-'}</p>
                    </div>
                </div>
            </div>

            {/* BPJS Status */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-purple-600" />
                        </div>
                        Status BPJS
                    </h3>
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status Kepesertaan</p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${kepesertaanBpjs ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                            <p className={`font-medium ${kepesertaanBpjs ? 'text-green-600' : 'text-orange-600'}`}>
                                {kepesertaanBpjs ? 'Terdaftar' : 'Belum Terdaftar'}
                            </p>
                        </div>
                    </div>
                    {kepesertaanBpjs && (
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Nomor BPJS</p>
                            <p className="font-medium text-gray-900">{nomorBpjs}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
