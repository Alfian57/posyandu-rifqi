/**
 * PesertaEditModal Component
 * Edit form modal for peserta data
 */

import { X, Edit2 } from 'lucide-react';
import type { PesertaEditForm } from '../../../domain/entities/Peserta';

interface Props {
    isOpen: boolean;
    editForm: PesertaEditForm;
    onClose: () => void;
    onChange: (field: string, value: string | boolean) => void;
    onSave: () => void;
}

export function PesertaEditModal({ isOpen, editForm, onClose, onChange, onSave }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Edit2 className="w-5 h-5 text-blue-600" />
                        Edit Data Peserta
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="px-6 py-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nama */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                value={editForm.nama}
                                onChange={(e) => onChange('nama', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>

                        {/* NIK */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">NIK</label>
                            <input
                                type="text"
                                value={editForm.nik}
                                onChange={(e) => onChange('nik', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>

                        {/* Jenis Kelamin */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Jenis Kelamin</label>
                            <select
                                value={editForm.jenisKelamin}
                                onChange={(e) => onChange('jenisKelamin', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                            >
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Tanggal Lahir</label>
                            <input
                                type="date"
                                value={editForm.tanggalLahir}
                                onChange={(e) => onChange('tanggalLahir', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>

                        {/* Telepon */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Telepon</label>
                            <input
                                type="tel"
                                value={editForm.telepon}
                                onChange={(e) => onChange('telepon', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>

                        {/* Desa */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Desa / Kelurahan</label>
                            <input
                                type="text"
                                value={editForm.desa}
                                onChange={(e) => onChange('desa', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>

                        {/* RT */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">RT</label>
                            <input
                                type="text"
                                value={editForm.rt}
                                onChange={(e) => onChange('rt', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>

                        {/* RW */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">RW</label>
                            <input
                                type="text"
                                value={editForm.rw}
                                onChange={(e) => onChange('rw', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>

                        {/* BPJS Status */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Status BPJS</label>
                            <select
                                value={editForm.kepesertaanBpjs ? 'ya' : 'tidak'}
                                onChange={(e) => onChange('kepesertaanBpjs', e.target.value === 'ya')}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                            >
                                <option value="ya">Terdaftar</option>
                                <option value="tidak">Belum Terdaftar</option>
                            </select>
                        </div>

                        {/* Nomor BPJS */}
                        {editForm.kepesertaanBpjs && (
                            <div>
                                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Nomor BPJS</label>
                                <input
                                    type="text"
                                    value={editForm.nomorBpjs}
                                    onChange={(e) => onChange('nomorBpjs', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onSave}
                        className="px-6 py-2.5 text-white bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 rounded-xl font-medium transition-colors flex items-center gap-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    );
}
