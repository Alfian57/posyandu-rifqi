/**
 * UpdatePeserta UseCase
 * Updates an existing participant
 */

import { pesertaRepository } from '../../../data/repositories/PesertaRepositoryImpl';
import type { CreatePesertaRequest, PesertaDetail } from '../../../data/models/PesertaApiTypes';

export class UpdatePesertaUseCase {
    async execute(id: number, data: Partial<CreatePesertaRequest>): Promise<PesertaDetail> {
        const response = await pesertaRepository.updatePeserta(id, data);
        
        if (!response.success) {
            if (response.errors) {
                const firstError = Object.values(response.errors)[0];
                throw new Error(firstError?.[0] || response.message || 'Gagal memperbarui data peserta');
            }
            throw new Error(response.message || 'Gagal memperbarui data peserta');
        }

        if (!response.data) {
            throw new Error('Data peserta tidak ditemukan');
        }

        return response.data;
    }
}

export const updatePesertaUseCase = new UpdatePesertaUseCase();
