/**
 * GetPesertaDetail UseCase
 * Retrieves a single participant by ID
 */

import { pesertaRepository } from '../../../data/repositories/PesertaRepositoryImpl';
import type { PesertaDetail } from '../../../data/models/PesertaApiTypes';

export class GetPesertaDetailUseCase {
    async execute(id: number): Promise<PesertaDetail> {
        const response = await pesertaRepository.getPesertaById(id);
        
        if (!response.success) {
            throw new Error(response.message || 'Gagal memuat detail peserta');
        }

        if (!response.data) {
            throw new Error('Data peserta tidak ditemukan');
        }

        return response.data;
    }
}

export const getPesertaDetailUseCase = new GetPesertaDetailUseCase();
