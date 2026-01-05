/**
 * Peserta Repository Implementation
 * Implements PesertaRepository using PesertaApiDataSource
 */

import { pesertaApiDataSource } from '../datasources/PesertaApiDataSource';
import type { PesertaRepository } from '../../domain/repositories/PesertaRepository';
import type { 
    ApiResponse, 
    CreatePesertaRequest, 
    PesertaDetail, 
    PesertaListResponse,
    GetPesertaParams 
} from '../models/PesertaApiTypes';

export class PesertaRepositoryImpl implements PesertaRepository {
    async getPeserta(params?: GetPesertaParams): Promise<ApiResponse<PesertaListResponse>> {
        return pesertaApiDataSource.getPeserta(params);
    }

    async getPesertaById(id: number): Promise<ApiResponse<PesertaDetail>> {
        return pesertaApiDataSource.getPesertaById(id);
    }

    async createPeserta(data: CreatePesertaRequest): Promise<ApiResponse<PesertaDetail>> {
        return pesertaApiDataSource.createPeserta(data);
    }

    async updatePeserta(id: number, data: Partial<CreatePesertaRequest>): Promise<ApiResponse<PesertaDetail>> {
        return pesertaApiDataSource.updatePeserta(id, data);
    }

    async deletePeserta(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
        return pesertaApiDataSource.deletePeserta(id);
    }
}

// Singleton instance
export const pesertaRepository = new PesertaRepositoryImpl();
