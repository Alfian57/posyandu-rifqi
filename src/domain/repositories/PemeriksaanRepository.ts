/**
 * Pemeriksaan Repository Interface
 * Contract for examination/visit data operations
 */

import type { ApiResponse } from '../../data/models/PesertaApiTypes';
import type { 
    PemeriksaanListResponse, 
    CreatePemeriksaanRequest, 
    PemeriksaanDetail,
    GetPemeriksaanParams 
} from '../../data/models/PemeriksaanApiTypes';

export interface PemeriksaanRepository {
    /**
     * Get list of pemeriksaan with optional filters
     */
    getPemeriksaan(params?: GetPemeriksaanParams): Promise<ApiResponse<PemeriksaanListResponse>>;

    /**
     * Get pemeriksaan detail by ID
     */
    getPemeriksaanById(id: number): Promise<ApiResponse<PemeriksaanDetail>>;

    /**
     * Create new pemeriksaan
     */
    createPemeriksaan(data: CreatePemeriksaanRequest): Promise<ApiResponse<PemeriksaanDetail>>;

    /**
     * Delete pemeriksaan
     */
    deletePemeriksaan(id: number): Promise<ApiResponse<{ success: boolean; message: string }>>;
}

// Backward compatibility alias
export type KunjunganRepository = PemeriksaanRepository;
