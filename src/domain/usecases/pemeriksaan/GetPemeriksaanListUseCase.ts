/**
 * GetPemeriksaanList UseCase
 * Retrieves list of examinations with optional filtering
 */

import { pemeriksaanRepository } from '../../../data/repositories/PemeriksaanRepositoryImpl';
import type { GetPemeriksaanParams, PemeriksaanListItem } from '../../../data/models/PemeriksaanApiTypes';

export interface GetPemeriksaanListResult {
    data: PemeriksaanListItem[];
    total: number;
}

export class GetPemeriksaanListUseCase {
    async execute(params?: GetPemeriksaanParams): Promise<GetPemeriksaanListResult> {
        const response = await pemeriksaanRepository.getPemeriksaan(params);
        
        if (!response.success) {
            throw new Error(response.message || 'Gagal memuat data pemeriksaan');
        }

        const data = Array.isArray(response.data) 
            ? response.data 
            : response.data?.data || [];
        
        const total = Array.isArray(response.data) 
            ? response.data.length 
            : response.data?.total || 0;

        return { data, total };
    }
}

export const getPemeriksaanListUseCase = new GetPemeriksaanListUseCase();
