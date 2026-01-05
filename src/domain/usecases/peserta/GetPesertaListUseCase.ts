/**
 * GetPesertaList UseCase
 * Retrieves list of participants with optional filtering
 */

import { pesertaRepository } from '../../../data/repositories/PesertaRepositoryImpl';
import type { GetPesertaParams, PesertaListItem } from '../../../data/models/PesertaApiTypes';

export interface GetPesertaListResult {
    data: PesertaListItem[];
    total: number;
}

export class GetPesertaListUseCase {
    async execute(params?: GetPesertaParams): Promise<GetPesertaListResult> {
        const response = await pesertaRepository.getPeserta(params);
        
        if (!response.success) {
            throw new Error(response.message || 'Gagal memuat data peserta');
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

export const getPesertaListUseCase = new GetPesertaListUseCase();
