/**
 * Pemeriksaan API Datasource
 * Handles all API calls related to examinations/visits
 */

import api from '../core/api';
import type { 
    PemeriksaanListResponse, 
    CreatePemeriksaanRequest, 
    PemeriksaanDetail,
    GetPemeriksaanParams 
} from '../models/PemeriksaanApiTypes';
import type { ApiResponse } from '../models/PesertaApiTypes';

export const pemeriksaanApiDataSource = {
    /**
     * Get list of examinations with optional filtering
     */
    getPemeriksaan: async (params?: GetPemeriksaanParams): Promise<ApiResponse<PemeriksaanListResponse>> => {
        const response = await api.get('/kunjungan', { params });
        return response.data;
    },

    /**
     * Get detail for a specific examination
     */
    getPemeriksaanDetail: async (id: number | string): Promise<ApiResponse<PemeriksaanDetail>> => {
        const response = await api.get(`/kunjungan/${id}`);
        return response.data;
    },

    /**
     * Create a new examination record
     */
    createPemeriksaan: async (request: CreatePemeriksaanRequest): Promise<ApiResponse<PemeriksaanDetail>> => {
        const response = await api.post('/kunjungan', request);
        return response.data;
    },

    /**
     * Delete an examination record
     */
    deletePemeriksaan: async (id: number | string): Promise<ApiResponse<void>> => {
        const response = await api.delete(`/kunjungan/${id}`);
        return response.data;
    }
};

// Backward compatibility alias
export const kunjunganApiDataSource = pemeriksaanApiDataSource;
