import { useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import { BeatLoader } from 'react-spinners';

// Month names in Indonesian
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/**
 * VisitChart - Line chart showing total pemeriksaan per month for 2026
 * Displays all categories combined
 */
export function VisitChart() {
    const { chartData, isLoading } = useDashboard();

    // Filter and format data for 2026 only
    const formattedChartData = useMemo(() => {
        // Create 12 months for 2026
        const months2026 = MONTH_NAMES.map((month, index) => ({
            label: month,
            month: index + 1,
            total: 0
        }));

        // Fill in actual data from API
        chartData.forEach(item => {
            // Parse label to extract month (e.g., "Jan 2026" -> 1)
            const parts = item.label.split(' ');
            const monthStr = parts[0];
            const year = parts[1] ? parseInt(parts[1]) : new Date().getFullYear();
            
            // Only include 2026 data
            if (year === 2026) {
                const monthIndex = MONTH_NAMES.findIndex(m => m === monthStr || item.label.includes(m));
                if (monthIndex !== -1) {
                    months2026[monthIndex].total = item.total;
                }
            }
        });

        return months2026;
    }, [chartData]);

    const totalVisits = formattedChartData.reduce((sum, item) => sum + item.total, 0);
    
    // Calculate growth (last month with data vs first month with data)
    const growth = useMemo(() => {
        const monthsWithData = formattedChartData.filter(m => m.total > 0);
        if (monthsWithData.length < 2) return totalVisits > 0 ? '100' : '0';
        const first = monthsWithData[0].total;
        const last = monthsWithData[monthsWithData.length - 1].total;
        if (first === 0) return last > 0 ? '100' : '0';
        return (((last - first) / first) * 100).toFixed(0);
    }, [formattedChartData, totalVisits]);

    const hasData = totalVisits > 0;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Pemeriksaan per Bulan</h3>
                </div>

                {/* Right side - Year indicator */}
                <div className="text-[10px] text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-full">
                    Tahun 2026
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                {/* Info summary */}
                <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span>Total pemeriksaan semua kategori per bulan</span>
                </div>

                {/* Chart Container */}
                <div className="flex-1 min-h-[180px] relative">
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 transition-all">
                            <div className="text-center">
                                <BeatLoader color="#3B82F6" size={10} margin={3} />
                                <p className="text-xs text-gray-500 mt-2">Memuat data pemeriksaan...</p>
                            </div>
                        </div>
                    ) : !hasData && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="text-sm text-gray-400 font-medium whitespace-pre-wrap text-center px-6">
                                Belum ada data pemeriksaan di tahun 2026
                            </p>
                        </div>
                    )}

                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={formattedChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                                allowDecimals={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #f1f5f9',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                    padding: '12px'
                                }}
                                itemStyle={{ fontSize: '11px', padding: '1px 0' }}
                                labelStyle={{ fontWeight: 700, marginBottom: 8, color: '#1e293b' }}
                                formatter={(value) => [`${value ?? 0} pemeriksaan`, 'Total']}
                                labelFormatter={(label) => `${label} 2026`}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fill="url(#colorTotal)"
                                name="Total Pemeriksaan"
                                dot={{ fill: '#3b82f6', strokeWidth: 0, r: 3 }}
                                activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
                                connectNulls
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5 whitespace-nowrap">Total Pemeriksaan 2026</p>
                    <p className="text-xl font-black text-gray-900">{totalVisits.toLocaleString()}</p>
                </div>
                <div className={`flex flex-col items-end`}>
                    <div className={`flex items-center gap-1 text-sm font-bold ${Number(growth) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        <TrendingUp className={`w-4 h-4 ${Number(growth) >= 0 ? '' : 'rotate-180'}`} />
                        <span>{growth}%</span>
                    </div>
                    <p className="text-[10px] text-gray-500 whitespace-nowrap">Pertumbuhan</p>
                </div>
            </div>
        </div>
    );
}
