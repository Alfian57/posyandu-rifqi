/**
 * CreatePeserta UseCase
 * Creates a new participant
 */

import { pesertaRepository } from '../../../data/repositories/PesertaRepositoryImpl';
import type { CreatePesertaRequest, PesertaDetail } from '../../../data/models/PesertaApiTypes';

export class CreatePesertaUseCase {
    async execute(data: CreatePesertaRequest): Promise<PesertaDetail> {
        const response = await pesertaRepository.createPeserta(data);
        
        if (!response.success) {
            // Throw error with validation details if available
            if (response.errors) {
                const firstError = Object.values(response.errors)[0];
                throw new Error(firstError?.[0] || response.message || 'Gagal mendaftarkan peserta');
            }
            throw new Error(response.message || 'Gagal mendaftarkan peserta');
        }

        if (!response.data) {
            throw new Error('Data peserta tidak ditemukan');
        }

        return response.data;
    }
}

export const createPesertaUseCase = new CreatePesertaUseCase();
