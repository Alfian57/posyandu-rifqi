/**
 * Pemeriksaan API Types
 * Type definitions for examination/visit API requests and responses
 */

import type { KategoriKey } from '../../domain/entities/Peserta';

// ============================================
// API Request Types
// ============================================

export interface CreatePemeriksaanRequest {
    peserta_id: number;
    tanggal_kunjungan: string; // YYYY-MM-DD
    lokasi: 'posyandu' | 'kunjungan_rumah';
    berat_badan: number;
    rujuk: boolean;
    // Optional category-specific fields (snake_case)
    [key: string]: unknown;
}

// ============================================
// API Response Types
// ============================================

export interface PemeriksaanDetail {
    id: number;
    peserta_id: number;
    tanggal_kunjungan: string;
    lokasi: string;
    berat_badan: number;
    rujuk: boolean;
    data_kesehatan?: Record<string, unknown>;
    created_at?: string;
    updated_at?: string;
}

export interface PemeriksaanListItem {
    id: number;
    peserta_id: number;
    peserta_nama?: string;
    peserta_kategori?: KategoriKey;
    tanggal_kunjungan: string;
    lokasi: string;
    berat_badan: number;
    rujuk: boolean;
}

export interface PemeriksaanListResponse {
    data: PemeriksaanListItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

// ============================================
// Query Parameters
// ============================================

export interface GetPemeriksaanParams {
    peserta_id?: number | string;
    tanggal?: string;
    kategori?: KategoriKey;
    limit?: number;
    page?: number;
}

// Re-export with old names for backward compatibility
export type CreateKunjunganRequest = CreatePemeriksaanRequest;
export type KunjunganDetail = PemeriksaanDetail;
export type KunjunganListItem = PemeriksaanListItem;
export type KunjunganListResponse = PemeriksaanListResponse;
export type GetKunjunganParams = GetPemeriksaanParams;
