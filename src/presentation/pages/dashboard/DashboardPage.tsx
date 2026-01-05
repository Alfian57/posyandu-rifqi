/**
 * DashboardPage - Main dashboard content (index route)
 * Displays overview, stats, quick actions, and widgets
 */

import { HeroOverview } from '../../components/dashboard/HeroOverview';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { VisitChart } from '../../components/dashboard/VisitChart';
import { SystemFlow } from '../../components/dashboard/SystemFlow';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';


export function DashboardPage() {
    useDocumentTitle('Dashboard');
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Hero Overview */}
            <section>
                <HeroOverview />
            </section>

            {/* Quick Actions + Chart Row */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <QuickActions />
                <div className="lg:col-span-2 h-full">
                    <VisitChart />
                </div>
            </section>

            {/* System Workflow Section */}
            <section>
                <SystemFlow />
            </section>
        </div>
    );
}

