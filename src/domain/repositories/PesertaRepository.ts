/**
 * Peserta Repository Interface
 * Contract for participant data operations
 */

import type { 
    ApiResponse, 
    CreatePesertaRequest, 
    PesertaDetail, 
    PesertaListResponse,
    GetPesertaParams 
} from '../../data/models/PesertaApiTypes';

export interface PesertaRepository {
    /**
     * Get list of peserta with optional filters
     */
    getPeserta(params?: GetPesertaParams): Promise<ApiResponse<PesertaListResponse>>;

    /**
     * Get peserta detail by ID
     */
    getPesertaById(id: number): Promise<ApiResponse<PesertaDetail>>;

    /**
     * Create new peserta
     */
    createPeserta(data: CreatePesertaRequest): Promise<ApiResponse<PesertaDetail>>;

    /**
     * Update peserta
     */
    updatePeserta(id: number, data: Partial<CreatePesertaRequest>): Promise<ApiResponse<PesertaDetail>>;

    /**
     * Delete peserta
     */
    deletePeserta(id: number): Promise<ApiResponse<{ success: boolean; message: string }>>;
}
