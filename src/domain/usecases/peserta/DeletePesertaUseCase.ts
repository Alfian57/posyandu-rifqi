/**
 * DeletePeserta UseCase
 * Deletes a participant
 */

import { pesertaRepository } from '../../../data/repositories/PesertaRepositoryImpl';

export class DeletePesertaUseCase {
    async execute(id: number): Promise<void> {
        const response = await pesertaRepository.deletePeserta(id);
        
        if (!response.success) {
            throw new Error(response.message || 'Gagal menghapus peserta');
        }
    }
}

export const deletePesertaUseCase = new DeletePesertaUseCase();
