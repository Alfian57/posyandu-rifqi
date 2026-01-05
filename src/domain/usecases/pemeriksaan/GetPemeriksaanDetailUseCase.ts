/**
 * GetPemeriksaanDetail UseCase
 * Retrieves a single examination by ID
 */

import { pemeriksaanRepository } from '../../../data/repositories/PemeriksaanRepositoryImpl';
import type { PemeriksaanDetail } from '../../../data/models/PemeriksaanApiTypes';

export class GetPemeriksaanDetailUseCase {
    async execute(id: number): Promise<PemeriksaanDetail> {
        const response = await pemeriksaanRepository.getPemeriksaanById(id);
        
        if (!response.success) {
            throw new Error(response.message || 'Gagal memuat detail pemeriksaan');
        }

        if (!response.data) {
            throw new Error('Data pemeriksaan tidak ditemukan');
        }

        return response.data;
    }
}

export const getPemeriksaanDetailUseCase = new GetPemeriksaanDetailUseCase();
