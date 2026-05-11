import { BarChart3, Users, DollarSign, Activity, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const data = [
  { name: "Week 1", scans: 1200 },
  { name: "Week 2", scans: 1900 },
  { name: "Week 3", scans: 1560 },
  { name: "Week 4", scans: 2450 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

const KpiCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
  <Card className="border-[#E5E7EB] shadow-sm">
    <CardContent className="p-5 flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-[#6B7280] mb-1">{title}</p>
        <p className="text-[30px] font-bold text-[#111827] leading-none">{value}</p>
      </div>
      <div className="p-3 bg-[#DBEAFE]/50 rounded-full">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </CardContent>
  </Card>
);

export default function Analytics() {
  return (
    <div className="space-y-8 text-[#111827]">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <Select defaultValue="30d">
          <SelectTrigger className="w-full sm:w-[200px] bg-white border-[#E5E7EB]">
            <Calendar className="w-4 h-4 mr-2 text-[#6B7280]" />
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="ytd">Year to date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Scans" value="5,678" icon={BarChart3} />
        <KpiCard title="Active Users" value="123" icon={Users} />
        <KpiCard title="Total Cost" value="$45.20" icon={DollarSign} />
        <KpiCard title="Total Tokens" value="12,345" icon={Activity} />
      </div>

      {/* Chart Section */}
      <Card className="border-[#E5E7EB] shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Scan Volume Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#F9FAFB' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Bar 
                  dataKey="scans" 
                  radius={[4, 4, 0, 0]}
                  barSize={60}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-[#E5E7EB] shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", scans: 1250, percent: 85 },
                { name: "Sarah Smith", scans: 950, percent: 65 },
                { name: "Mike Johnson", scans: 820, percent: 55 },
                { name: "Emily Brown", scans: 600, percent: 40 },
                { name: "David Wilson", scans: 450, percent: 30 },
              ].map((user, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-[#6B7280] font-semibold">{user.scans} scans</span>
                  </div>
                  <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${user.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">API Usage by Key</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { key: "PROD_MAIN_01", tokens: "45,230", cost: "$12.50" },
                { key: "DEV_TEST_04", tokens: "12,100", cost: "$4.20" },
                { key: "WHS_SOUTH_02", tokens: "8,450", cost: "$2.90" },
                { key: "WHS_NORTH_05", tokens: "5,300", cost: "$1.85" },
                { key: "SANDBOX_01", tokens: "2,100", cost: "$0.75" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-[#E5E7EB] last:border-0 pb-4 last:pb-0">
                  <div>
                    <p className="font-mono text-sm font-semibold text-[#111827]">{item.key}</p>
                    <p className="text-xs text-[#6B7280]">{item.tokens} tokens</p>
                  </div>
                  <span className="text-sm font-bold text-[#111827]">{item.cost}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
