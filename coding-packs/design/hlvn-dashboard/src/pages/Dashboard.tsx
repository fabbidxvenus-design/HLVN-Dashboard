import { BarChart3, Users, DollarSign, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { name: "Mon", scans: 400, cost: 4 },
  { name: "Tue", scans: 300, cost: 3 },
  { name: "Wed", scans: 600, cost: 6 },
  { name: "Thu", scans: 800, cost: 8 },
  { name: "Fri", scans: 500, cost: 5 },
  { name: "Sat", scans: 900, cost: 9 },
  { name: "Sun", scans: 1234, cost: 12.5 },
];

const KpiCard = ({ title, value, icon: Icon, trend, delay }: { title: string; value: string; icon: any; trend?: string; delay: number }) => (
  <div>
    <Card className="border-[#e4e4e7] bg-white hover:border-black/10 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {trend && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      </CardContent>
    </Card>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Scans" value="1,234" icon={BarChart3} trend="+12.5%" delay={0.1} />
        <KpiCard title="Active Users" value="45" icon={Users} trend="+3.2%" delay={0.2} />
        <KpiCard title="API Cost Today" value="$12.50" icon={DollarSign} trend="-2.4%" delay={0.3} />
        <KpiCard title="Success Rate" value="98.2%" icon={CheckCircle2} trend="+0.5%" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="xl:col-span-2">
          <Card className="border-[#e4e4e7] h-full shadow-sm bg-white overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">Scan Volume Analytics</CardTitle>
                <p className="text-sm text-slate-500">Real-time scan data for the current week</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 italic">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Scans
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-[320px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: '1px solid #e4e4e7', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        padding: '12px'
                      }}
                      itemStyle={{ fontWeight: 600, color: '#18181b' }}
                      labelStyle={{ marginBottom: '8px', color: '#64748b', fontSize: '12px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="scans" 
                      stroke="var(--color-primary)" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#colorScans)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products side column */}
        <div>
          <Card className="border-[#e4e4e7] h-full shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[
                  { name: "Coffee Beans (Dark Roast)", count: 450, color: "bg-blue-500" },
                  { name: "Organic Whole Milk", count: 320, color: "bg-emerald-500" },
                  { name: "Premium Frozen Pizza", count: 210, color: "bg-amber-500" },
                  { name: "Laundry Detergent (2L)", count: 180, color: "bg-indigo-500" },
                  { name: "Greek Yogurt (Vanilla)", count: 150, color: "bg-rose-500" },
                ].map((item, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">{item.name}</span>
                      <span className="text-xs font-bold font-mono text-slate-500">{item.count}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full opacity-80 group-hover:opacity-100 transition-opacity", item.color)}
                        style={{ width: `${(item.count / 450) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lists Section */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card className="border-[#e4e4e7] shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-base font-semibold">Live Activity Stream</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {[
                { user: "John Doe", action: "scanned a product label", time: "2 mins ago", initial: "JD" },
                { user: "Sarah Smith", action: "joined the platform", time: "15 mins ago", initial: "SS" },
                { user: "Mike Johnson", action: "updated his profile", time: "1 hour ago", initial: "MJ" },
                { user: "Emily Brown", action: "exported history data", time: "3 hours ago", initial: "EB" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    {item.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {item.user}
                      <span className="font-normal text-slate-500 ml-1">{item.action}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-50 text-center">
              <button className="text-xs font-bold text-slate-400 hover:text-black transition-colors uppercase tracking-widest">
                View all activity
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e4e4e7] shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-base font-semibold">User Performance Score</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {[
                { name: "Alexander Graham", score: 98, role: "Warehouse Manager", scans: 1420 },
                { name: "Jennifer Lawrence", score: 95, role: "Operations Lead", scans: 1105 },
                { name: "Robert Downey", score: 92, role: "Inventory Specialist", scans: 980 },
                { name: "Chris Evans", score: 88, role: "Technician", scans: 850 },
              ].map((user, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">{user.name}</span>
                    <span className="text-xs text-slate-500">{user.role}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{user.score}</span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{user.scans} scans</span>
                    </div>
                    <div className="w-1.5 h-8 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="w-full bg-primary/20 rounded-full mt-auto" 
                        style={{ height: `${user.score}%`, backgroundColor: user.score > 95 ? '#10b981' : 'var(--color-primary)' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-50 text-center">
              <button className="text-xs font-bold text-slate-400 hover:text-black transition-colors uppercase tracking-widest">
                Full leaderboard
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
