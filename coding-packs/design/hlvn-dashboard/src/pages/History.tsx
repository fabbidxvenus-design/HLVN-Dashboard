import { Search, Download, Eye, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const scans = [
  { id: 1, product: "Premium Cotton T-Shirt", user: "john@example.com", time: "2024-05-08 11:24", status: "Success", thumb: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop" },
  { id: 2, product: "Wireless Bluetooth Headphones", user: "sarah@example.com", time: "2024-05-08 11:20", status: "Success", thumb: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" },
  { id: 3, product: "Stainless Steel Water Bottle", user: "mike@example.com", time: "2024-05-08 11:15", status: "Failed", thumb: "https://images.unsplash.com/photo-1602143399827-705204436255?w=100&h=100&fit=crop" },
  { id: 4, product: "Organic Dark Chocolate", user: "emily@example.com", time: "2024-05-08 10:55", status: "Success", thumb: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&h=100&fit=crop" },
  { id: 5, product: "USB-C To Lightning Cable", user: "david@example.com", time: "2024-05-08 10:42", status: "Success", thumb: "https://images.unsplash.com/photo-1589939705384-5185138a04b9?w=100&h=100&fit=crop" },
  { id: 6, product: "Running Shoes (Men's Size 10)", user: "lisa@example.com", time: "2024-05-08 10:30", status: "Success", thumb: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop" },
  { id: 7, product: "Adjustable Desk Chair", user: "alex@example.com", time: "2024-05-08 10:15", status: "Success", thumb: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=100&h=100&fit=crop" },
  { id: 8, product: "Smart LED Bulb (RGB)", user: "nina@example.com", time: "2024-05-08 09:45", status: "Success", thumb: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=100&h=100&fit=crop" },
  { id: 9, product: "Hardcover Blank Journal", user: "tom@example.com", time: "2024-05-08 09:20", status: "Failed", thumb: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=100&h=100&fit=crop" },
  { id: 10, product: "Ceramic Coffee Mug (Matte)", user: "anna@example.com", time: "2024-05-08 08:55", status: "Success", thumb: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop" },
];

export default function History() {
  return (
    <div className="space-y-6 text-slate-900 pb-12">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Scan Repository</h1>
          <p className="text-sm text-slate-500">Historical log of all OCR scan operations</p>
        </div>
        <Button variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 gap-2 h-10 px-4 rounded-xl shadow-sm transition-all" id="export-excel-btn">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="relative flex-1 lg:max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search within scan results..." className="pl-10 h-10 border-slate-100 bg-slate-50/50 focus:bg-white rounded-xl transition-all" id="history-search" />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] h-10 border-slate-100 bg-slate-50/50 rounded-xl">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="john">john@example.com</SelectItem>
              <SelectItem value="sarah">sarah@example.com</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="7d">
            <SelectTrigger className="w-full sm:w-[180px] h-10 border-slate-100 bg-slate-50/50 rounded-xl">
              <SelectValue placeholder="Range: 7 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[900px] lg:min-w-full">
            <TableHeader className="bg-slate-50/50 border-b border-slate-100">
              <TableRow className="hover:bg-transparent border-0">
                <TableHead className="font-bold py-4 pl-6 text-xs uppercase tracking-wider text-slate-500">Asset</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Classification</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Requester</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Timestamp</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Result</TableHead>
                <TableHead className="text-right font-bold pr-6 text-xs uppercase tracking-wider text-slate-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.map((scan) => (
                <TableRow key={scan.id} className="hover:bg-slate-50/30 transition-colors border-b border-slate-100 last:border-0 group">
                  <TableCell className="py-3 pl-6">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {scan.thumb ? (
                        <img src={scan.thumb} alt="Product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">{scan.product}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{scan.user}</TableCell>
                  <TableCell className="text-slate-400 font-mono text-xs">{scan.time}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-0",
                        scan.status === "Success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                      )}
                    >
                      {scan.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-400 hover:text-black hover:bg-slate-100 rounded-lg gap-2 h-8 transition-all" 
                      id={`view-scan-${scan.id}`}
                    >
                      <Eye className="w-4 h-4" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30 font-medium">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total: 1,234 Records</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="border-slate-200 rounded-lg h-8 text-xs font-bold uppercase tracking-tighter">Prev</Button>
            <div className="flex items-center gap-1">
              <Button size="sm" className="h-8 min-w-[32px] bg-slate-900 border-slate-900 rounded-lg text-xs font-bold">1</Button>
              <span className="text-slate-400 px-1">...</span>
              <Button variant="outline" size="sm" className="h-8 min-w-[32px] border-slate-200 rounded-lg text-xs font-bold">124</Button>
            </div>
            <Button variant="outline" size="sm" className="border-slate-200 rounded-lg h-8 text-xs font-bold uppercase tracking-tighter">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
