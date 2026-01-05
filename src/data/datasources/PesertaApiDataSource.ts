/**
 * Peserta API Datasource
 * Handles all API calls related to peserta (participants)
 */

import api from '../core/api';
import type { 
    ApiResponse, 
    CreatePesertaRequest, 
    PesertaDetail, 
    PesertaListResponse,
    GetPesertaParams 
} from '../models/PesertaApiTypes';

export class PesertaApiDataSource {
    /**
     * Get list of peserta with optional filters
     * GET /api/peserta
     */
    async getPeserta(params?: GetPesertaParams): Promise<ApiResponse<PesertaListResponse>> {
        const response = await api.get<ApiResponse<PesertaListResponse>>('/peserta', { params });
        return response.data;
    }

    /**
     * Get peserta detail by ID
     * GET /api/peserta/{id}
     */
    async getPesertaById(id: number): Promise<ApiResponse<PesertaDetail>> {
        const response = await api.get<ApiResponse<PesertaDetail>>(`/peserta/${id}`);
        return response.data;
    }

    /**
     * Create new peserta
     * POST /api/peserta
     */
    async createPeserta(data: CreatePesertaRequest): Promise<ApiResponse<PesertaDetail>> {
        const response = await api.post<ApiResponse<PesertaDetail>>('/peserta', data);
        return response.data;
    }

    /**
     * Update peserta
     * PUT /api/peserta/{id}
     */
    async updatePeserta(id: number, data: Partial<CreatePesertaRequest>): Promise<ApiResponse<PesertaDetail>> {
        const response = await api.put<ApiResponse<PesertaDetail>>(`/peserta/${id}`, data);
        return response.data;
    }

    /**
     * Delete peserta
     * DELETE /api/peserta/{id}
     */
    async deletePeserta(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
        const response = await api.delete<ApiResponse<{ success: boolean; message: string }>>(`/peserta/${id}`);
        return response.data;
    }
}

// Singleton instance
export const pesertaApiDataSource = new PesertaApiDataSource();
