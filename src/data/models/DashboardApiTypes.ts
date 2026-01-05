export interface DashboardStats {
    total_peserta: number;
    kunjungan_hari_ini: number;
    kategori: {
        bumil: number;
        balita: number;
        remaja: number;
        produktif: number;
        lansia: number;
    };
}

export interface DashboardChartItem {
    label: string;
    total: number;
}

export interface DashboardStatsResponse {
    success: boolean;
    message: string;
    data: DashboardStats;
}

export interface DashboardChartResponse {
    success: boolean;
    message: string;
    data: DashboardChartItem[];
}
