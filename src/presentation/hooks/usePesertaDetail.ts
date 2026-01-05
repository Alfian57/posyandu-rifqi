/**
 * usePesertaDetail Hook
 * State and logic for PesertaDetailPage
 * Uses Laravel API via PesertaApiDataSource
 */

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { pesertaApiDataSource } from '../../data/datasources/PesertaApiDataSource';
import type { PesertaDetail, } from '../../data/models/PesertaApiTypes';
import type { PemeriksaanListItem } from '../../data/models/PemeriksaanApiTypes';
import {
    type PesertaEditForm,
    calculateAge,
    createEmptyEditForm,
} from '../../domain/entities/Peserta';
import { kategoriConfig } from '../constants/kategoriConfig';
import { useDataCache } from '../contexts/RealtimeDataContext';

// Format date to YYYY-MM-DD for HTML date input
function formatDateForInput(dateString: string | undefined | null): string {
    if (!dateString) return '';
    
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }
    
    // Try to parse and format
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch {
        return '';
    }
}

// Map API response to edit form
function pesertaDetailToEditForm(peserta: PesertaDetail): PesertaEditForm {
    console.log('[pesertaDetailToEditForm] Input:', peserta);
    console.log('[pesertaDetailToEditForm] tanggal_lahir:', peserta.tanggal_lahir);
    
    const formattedDate = formatDateForInput(peserta.tanggal_lahir);
    console.log('[pesertaDetailToEditForm] Formatted date:', formattedDate);
    
    return {
        nama: peserta.nama,
        nik: peserta.nik,
        jenisKelamin: peserta.jenis_kelamin,
        tanggalLahir: formattedDate,
        telepon: peserta.telepon || '',
        desa: peserta.alamat || '',
        rt: peserta.rt || '',
        rw: peserta.rw || '',
        kepesertaanBpjs: peserta.kepesertaan_bpjs || false,
        nomorBpjs: peserta.nomor_bpjs || ''
    };
}

export function usePesertaDetail(id: string | undefined) {
    const navigate = useNavigate();

    // State
    const [peserta, setPeserta] = useState<PesertaDetail | null>(null);
    const [lastVisit, setLastVisit] = useState<PemeriksaanListItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal states
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Edit form state
    const [editForm, setEditForm] = useState<PesertaEditForm>(createEmptyEditForm());

    // Use cache context for pemeriksaan
    const { fetchPemeriksaan } = useDataCache();

    // Fetch peserta detail from API
    const fetchData = useCallback(async () => {
        if (!id) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const numericId = parseInt(id, 10);
            if (isNaN(numericId)) {
                setError('ID peserta tidak valid');
                setIsLoading(false);
                return;
            }

            // Fetch Peserta from API and pemeriksaan from cache
            const [pesertaRes, pemeriksaanList] = await Promise.all([
                pesertaApiDataSource.getPesertaById(numericId),
                fetchPemeriksaan() // Uses cache if valid
            ]);
            
            if (pesertaRes.success && pesertaRes.data) {
                setPeserta(pesertaRes.data);
            } else {
                setError(pesertaRes.message || 'Peserta tidak ditemukan');
            }

            // Filter pemeriksaan for this peserta from cached data
            const pesertaPemeriksaan = pemeriksaanList.filter(
                (p: PemeriksaanListItem) => p.peserta_id === numericId
            );
            
            if (pesertaPemeriksaan.length > 0) {
                // Get the most recent visit
                const sortedVisits = [...pesertaPemeriksaan].sort((a, b) => 
                    new Date(b.tanggal_kunjungan).getTime() - new Date(a.tanggal_kunjungan).getTime()
                );
                setLastVisit(sortedVisits[0] as any);
            } else {
                setLastVisit(null);
            }
        } catch (err) {
            console.error('[PesertaDetail] Error fetching:', err);
            setError('Gagal memuat data peserta');
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const config = peserta ? kategoriConfig[peserta.kategori] : null;

    // Open edit modal with peserta data
    const openEditModal = useCallback(() => {
        if (peserta) {
            setEditForm(pesertaDetailToEditForm(peserta));
        }
        setShowEditModal(true);
    }, [peserta]);

    // Close edit modal
    const closeEditModal = useCallback(() => {
        setShowEditModal(false);
    }, []);

    // Handle edit form field change
    const handleEditChange = useCallback((field: string, value: string | boolean) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    }, []);

    // Save edit via API
    const handleSaveEdit = useCallback(async () => {
        if (!id || !peserta) return;

        setIsSaving(true);
        try {
            const numericId = parseInt(id, 10);
            
            // Build update request
            const updateData = {
                nama: editForm.nama,
                tanggal_lahir: editForm.tanggalLahir,
                telepon: editForm.telepon,
                rt: editForm.rt,
                rw: editForm.rw,
                kepesertaan_bpjs: editForm.kepesertaanBpjs,
                nomor_bpjs: editForm.nomorBpjs,
            };

            const response = await pesertaApiDataSource.updatePeserta(numericId, updateData);
            
            if (response.success) {
                toast.success('Data peserta berhasil diperbarui');
                setShowEditModal(false);
                // Refresh data
                await fetchData();
            } else {
                toast.error(response.message || 'Gagal memperbarui data');
            }
        } catch (err) {
            console.error('[PesertaDetail] Update error:', err);
            toast.error('Gagal memperbarui data peserta');
        } finally {
            setIsSaving(false);
        }
    }, [id, peserta, editForm, fetchData]);

    // Open delete confirmation
    const openDeleteConfirm = useCallback(() => {
        setShowDeleteConfirm(true);
    }, []);

    // Close delete confirmation
    const closeDeleteConfirm = useCallback(() => {
        setShowDeleteConfirm(false);
    }, []);

    // Handle delete via API
    const handleDelete = useCallback(async () => {
        if (!id || !peserta) return;

        setIsDeleting(true);
        try {
            const numericId = parseInt(id, 10);
            const response = await pesertaApiDataSource.deletePeserta(numericId);
            
            if (response.success) {
                toast.success(`${peserta.nama} berhasil dihapus`);
                navigate('/dashboard/participants');
            } else {
                toast.error(response.message || 'Gagal menghapus peserta');
            }
        } catch (err) {
            console.error('[PesertaDetail] Delete error:', err);
            toast.error('Gagal menghapus data peserta');
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    }, [id, peserta, navigate]);

    // Navigate to new visit with pre-selected peserta
    const handleNewVisit = useCallback(() => {
        if (peserta) {
            const slug = kategoriConfig[peserta.kategori].urlSlug;
            navigate(`/dashboard/examinations/${slug}/${peserta.id}`);
        } else {
            navigate('/dashboard/examinations');
        }
    }, [navigate, peserta]);

    // Navigate back to list
    const handleBack = useCallback(() => {
        navigate('/dashboard/participants');
    }, [navigate]);

    return {
        // Data
        peserta,
        config,
        editForm,
        lastVisit,
        isLoading,
        error,

        // Calculated
        age: peserta ? calculateAge(peserta.tanggal_lahir) : 0,

        // Modal states
        showDeleteConfirm,
        showEditModal,
        isSaving,
        isDeleting,

        // Actions
        openEditModal,
        closeEditModal,
        handleEditChange,
        handleSaveEdit,
        openDeleteConfirm,
        closeDeleteConfirm,
        handleDelete,
        handleNewVisit,
        handleBack,
        refresh: fetchData,
    };
}
