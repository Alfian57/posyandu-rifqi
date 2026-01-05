/**
 * Peserta API Types
 * Type definitions for Peserta API requests and responses
 */

import type { KategoriKey } from '../../domain/entities/Peserta';

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Record<string, string[]>;
}

// ============================================
// Create Peserta Request
// ============================================

// Base fields (common for all categories)
export interface CreatePesertaBase {
    nik: string;
    nama: string;
    kategori: KategoriKey;
    tanggal_lahir: string; // YYYY-MM-DD
    jenis_kelamin: 'Laki-Laki' | 'Perempuan';
    alamat?: string;
    rt?: string;
    rw?: string;
    telepon?: string;
    kepesertaan_bpjs?: boolean;
    nomor_bpjs?: string;
}

// Bumil extension (required: nama_suami)
export interface BumilExtension {
    nama_suami: string;
    hamil_anak_ke?: number;
    jarak_anak?: string;
    bb_sebelum_hamil?: number;
    tinggi_badan?: number;
}

// Balita extension (required: nama_ortu)
export interface BalitaExtension {
    nama_ortu: string;
}

// Remaja extension (required: nama_ortu)
export interface RemajaExtension {
    nama_ortu: string;
    riwayat_keluarga?: string[];
    perilaku_berisiko?: string[];
}

// Produktif/Lansia extension (required: pekerjaan)
export interface ProduktifLansiaExtension {
    pekerjaan: string;
    status_perkawinan?: string;
    riwayat_diri?: string[];
    merokok?: boolean;
    konsumsi_gula?: boolean;
    konsumsi_garam?: boolean;
    konsumsi_lemak?: boolean;
}

// Combined request type
export type CreatePesertaRequest = CreatePesertaBase & 
    Partial<BumilExtension> & 
    Partial<BalitaExtension> & 
    Partial<RemajaExtension> & 
    Partial<ProduktifLansiaExtension>;

// ============================================
// Peserta Response Types
// ============================================

export interface PesertaExtension {
    peserta_id: number;
    [key: string]: unknown;
}

export interface PesertaDetail {
    id: number;
    nik: string;
    nama: string;
    kategori: KategoriKey;
    tanggal_lahir: string;
    jenis_kelamin: string;
    alamat?: string;
    rt?: string;
    rw?: string;
    telepon?: string;
    kepesertaan_bpjs?: boolean;
    nomor_bpjs?: string;
    created_at?: string;
    updated_at?: string;
    extension?: PesertaExtension;
}

export interface PesertaListItem {
    id: number;
    nik: string;
    nama: string;
    kategori: KategoriKey;
    tanggal_lahir: string;
    jenis_kelamin: string;
    rt?: string;
    rw?: string;
    last_kunjungan_date?: string; // Date of last visit
}

export interface PesertaListResponse {
    data: PesertaListItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

// ============================================
// Query Parameters
// ============================================

export interface GetPesertaParams {
    search?: string;
    nik?: string;
    kategori?: KategoriKey;
    rt?: string;
    rw?: string;
    limit?: number;
    page?: number;
}
