import api from '../core/api';
import type { DashboardStatsResponse, DashboardChartResponse } from '../models/DashboardApiTypes';

class DashboardApiDataSource {
    async getStats(): Promise<DashboardStatsResponse> {
        const response = await api.get<DashboardStatsResponse>('/dashboard/stats');
        return response.data;
    }

    async getChartData(year?: number): Promise<DashboardChartResponse> {
        const params = year ? { year } : {};
        const response = await api.get<DashboardChartResponse>('/dashboard/chart', { params });
        return response.data;
    }
}

export const dashboardApiDataSource = new DashboardApiDataSource();
