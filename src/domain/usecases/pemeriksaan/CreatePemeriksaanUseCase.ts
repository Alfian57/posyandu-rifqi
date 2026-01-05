/**
 * CreatePemeriksaan UseCase
 * Creates a new examination record
 */

import { pemeriksaanRepository } from '../../../data/repositories/PemeriksaanRepositoryImpl';
import type { CreatePemeriksaanRequest, PemeriksaanDetail } from '../../../data/models/PemeriksaanApiTypes';

export class CreatePemeriksaanUseCase {
    async execute(data: CreatePemeriksaanRequest): Promise<PemeriksaanDetail> {
        const response = await pemeriksaanRepository.createPemeriksaan(data);
        
        if (!response.success) {
            if (response.errors) {
                const firstError = Object.values(response.errors)[0];
                throw new Error(firstError?.[0] || response.message || 'Gagal menyimpan data pemeriksaan');
            }
            throw new Error(response.message || 'Gagal menyimpan data pemeriksaan');
        }

        if (!response.data) {
            throw new Error('Data pemeriksaan tidak ditemukan');
        }

        return response.data;
    }
}

export const createPemeriksaanUseCase = new CreatePemeriksaanUseCase();
