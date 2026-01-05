/**
 * Pemeriksaan Repository Implementation
 * Implements PemeriksaanRepository using PemeriksaanApiDataSource
 */

import { pemeriksaanApiDataSource } from '../datasources/PemeriksaanApiDataSource';
import type { PemeriksaanRepository } from '../../domain/repositories/PemeriksaanRepository';
import type { ApiResponse } from '../models/PesertaApiTypes';
import type { 
    PemeriksaanListResponse, 
    CreatePemeriksaanRequest, 
    PemeriksaanDetail,
    GetPemeriksaanParams 
} from '../models/PemeriksaanApiTypes';

export class PemeriksaanRepositoryImpl implements PemeriksaanRepository {
    async getPemeriksaan(params?: GetPemeriksaanParams): Promise<ApiResponse<PemeriksaanListResponse>> {
        return pemeriksaanApiDataSource.getPemeriksaan(params);
    }

    async getPemeriksaanById(id: number): Promise<ApiResponse<PemeriksaanDetail>> {
        return pemeriksaanApiDataSource.getPemeriksaanDetail(id);
    }

    async createPemeriksaan(data: CreatePemeriksaanRequest): Promise<ApiResponse<PemeriksaanDetail>> {
        return pemeriksaanApiDataSource.createPemeriksaan(data);
    }

    async deletePemeriksaan(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
        return pemeriksaanApiDataSource.deletePemeriksaan(id) as Promise<ApiResponse<{ success: boolean; message: string }>>;
    }
}

// Singleton instance
export const pemeriksaanRepository = new PemeriksaanRepositoryImpl();

// Backward compatibility alias
export const kunjunganRepository = pemeriksaanRepository;
