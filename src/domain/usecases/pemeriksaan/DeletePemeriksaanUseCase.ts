/**
 * DeletePemeriksaan UseCase
 * Deletes an examination record
 */

import { pemeriksaanRepository } from '../../../data/repositories/PemeriksaanRepositoryImpl';

export class DeletePemeriksaanUseCase {
    async execute(id: number): Promise<void> {
        const response = await pemeriksaanRepository.deletePemeriksaan(id);
        
        if (!response.success) {
            throw new Error(response.message || 'Gagal menghapus data pemeriksaan');
        }
    }
}

export const deletePemeriksaanUseCase = new DeletePemeriksaanUseCase();
