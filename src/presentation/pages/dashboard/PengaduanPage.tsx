/**
 * PengaduanPage - Bug Report Page
 * Allows kaders to report bugs or system issues with image upload
 */

import { useState, useRef } from 'react';
import { Home, ChevronRight, Bug, Send, AlertCircle, CheckCircle2, Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

type BugCategory = 'error' | 'tampilan' | 'data' | 'performa' | 'lainnya';
type Priority = 'rendah' | 'sedang' | 'tinggi';

interface BugReport {
    kategori: BugCategory;
    prioritas: Priority;
    judul: string;
    deskripsi: string;
    langkah: string;
    browser: string;
}

const categories = [
    { id: 'error' as BugCategory, label: 'Error / Crash', description: 'Aplikasi error atau tidak bisa diakses' },
    { id: 'tampilan' as BugCategory, label: 'Tampilan', description: 'Masalah layout atau desain' },
    { id: 'data' as BugCategory, label: 'Data', description: 'Data tidak tersimpan atau hilang' },
    { id: 'performa' as BugCategory, label: 'Performa', description: 'Aplikasi lambat atau lag' },
    { id: 'lainnya' as BugCategory, label: 'Lainnya', description: 'Masalah lainnya' },
];

const priorities = [
    { id: 'rendah' as Priority, label: 'Rendah', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: 'sedang' as Priority, label: 'Sedang', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { id: 'tinggi' as Priority, label: 'Tinggi', color: 'bg-red-100 text-red-700 border-red-200' },
];

export function PengaduanPage() {
    useDocumentTitle('Pengaduan');
    const { user } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [form, setForm] = useState<BugReport>({
        kategori: 'error',
        prioritas: 'sedang',
        judul: '',
        deskripsi: '',
        langkah: '',
        browser: navigator.userAgent,
    });

    const handleChange = (field: keyof BugReport, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const validFiles = newFiles.filter(file => {
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} bukan file gambar`);
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} terlalu besar (max 5MB)`);
                return false;
            }
            return true;
        });

        if (images.length + validFiles.length > 3) {
            toast.error('Maksimal 3 gambar');
            return;
        }

        setImages(prev => [...prev, ...validFiles]);

        // Create previews
        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreview(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!form.judul.trim()) {
            toast.error('Judul pengaduan wajib diisi');
            return;
        }
        if (!form.deskripsi.trim()) {
            toast.error('Deskripsi masalah wajib diisi');
            return;
        }

        setIsSubmitting(true);
        try {
            // TODO: Replace with Laravel API call
            console.warn('[Pengaduan] Submit disabled - backend not connected');
            console.log('Bug report data (not saved):', {
                user_id: user?.id,
                kategori: form.kategori,
                prioritas: form.prioritas,
                judul: form.judul,
                deskripsi: form.deskripsi,
                langkah_reproduksi: form.langkah,
                browser_info: form.browser,
            });
            
            toast.error('Backend tidak terhubung. Pengaduan tidak dapat dikirim.');
        } catch (error) {
            console.error('Error submitting bug report:', error);
            toast.error('Gagal mengirim pengaduan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Pengaduan Terkirim!</h2>
                    <p className="text-gray-500 mb-4">
                        Terima kasih atas laporan Anda. Tim kami akan segera meninjau dan menindaklanjuti masalah ini.
                    </p>
                    <p className="text-sm text-gray-400">Mengarahkan kembali...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengaduan Sistem</h1>
                    <p className="text-gray-500 text-sm mt-1">Laporkan bug atau masalah yang Anda temukan</p>
                </div>
                <nav className="hidden md:flex items-center gap-2 text-sm">
                    <Link to="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Pengaduan</span>
                </nav>
            </div>

            {/* Info Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm text-amber-800 font-medium">Informasi Penting</p>
                    <p className="text-xs text-amber-700 mt-1">
                        Jelaskan masalah dengan detail dan sertakan screenshot jika memungkinkan agar tim kami dapat memperbaikinya dengan cepat.
                    </p>
                </div>
            </div>

            {/* Form Layout - 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Form */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Category & Priority Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Bug className="w-5 h-5 text-amber-600" />
                            <h2 className="font-semibold text-gray-900">Kategori Masalah</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleChange('kategori', cat.id)}
                                    className={`p-3 rounded-xl border-2 text-left transition-all ${form.kategori === cat.id
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-100 bg-gray-50'
                                        }`}
                                >
                                    <p className="font-medium text-sm text-gray-900">{cat.label}</p>
                                    <p className="text-xs text-gray-500 mt-0.5 hidden md:block">{cat.description}</p>
                                </button>
                            ))}
                        </div>

                        <label className="block text-sm font-medium text-gray-700 mb-3">Tingkat Prioritas</label>
                        <div className="flex gap-2">
                            {priorities.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => handleChange('prioritas', p.id)}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${form.prioritas === p.id
                                            ? p.color + ' border-current'
                                            : 'bg-gray-50 text-gray-600 border-gray-200'
                                        }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Judul Pengaduan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.judul}
                                onChange={(e) => handleChange('judul', e.target.value)}
                                placeholder="Contoh: Tidak bisa menyimpan data kunjungan"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi Masalah <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={form.deskripsi}
                                onChange={(e) => handleChange('deskripsi', e.target.value)}
                                placeholder="Jelaskan masalah yang Anda alami dengan detail..."
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Langkah-langkah Reproduksi <span className="text-gray-400">(Opsional)</span>
                            </label>
                            <textarea
                                value={form.langkah}
                                onChange={(e) => handleChange('langkah', e.target.value)}
                                placeholder="1. Buka halaman kunjungan&#10;2. Isi form kunjungan&#10;3. Klik tombol simpan&#10;4. Muncul error..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Image Upload & Submit */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Image Upload Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <ImageIcon className="w-5 h-5 text-indigo-600" />
                            <h2 className="font-semibold text-gray-900">Screenshot</h2>
                            <span className="text-xs text-gray-400 ml-auto">Max 3 gambar</span>
                        </div>

                        {/* Upload Area */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageSelect}
                            className="hidden"
                        />

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={images.length >= 3}
                            className={`w-full border-2 border-dashed rounded-xl p-6 text-center transition-all ${images.length >= 3
                                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                    : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
                                }`}
                        >
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 font-medium">Klik untuk upload gambar</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG max 5MB</p>
                        </button>

                        {/* Image Previews */}
                        {imagePreview.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {imagePreview.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-xl border border-gray-100"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className="text-xs text-gray-400 mt-3 text-center">
                            Screenshot membantu tim kami memahami masalah dengan lebih baik
                        </p>
                    </div>

                    {/* Submit Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <p className="text-xs text-gray-400 mb-4">
                            Pelapor: <span className="font-medium text-gray-600">{user?.email?.split('@')[0] || 'User'}</span>
                        </p>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Mengirim...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Kirim Pengaduan
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
