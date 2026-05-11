import { Search, Plus, Filter, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const users = [
  { id: 1, email: "john@example.com", role: "Warehouse Manager", status: "Active", lastLogin: "2024-05-08 09:15" },
  { id: 2, email: "sarah@example.com", role: "IT Admin", status: "Active", lastLogin: "2024-05-08 08:30" },
  { id: 3, email: "mike@example.com", role: "Operator", status: "Offline", lastLogin: "2024-05-07 16:45" },
  { id: 4, email: "emily@example.com", role: "Operator", status: "Active", lastLogin: "2024-05-08 10:00" },
  { id: 5, email: "david@example.com", role: "Supervisor", status: "Active", lastLogin: "2024-05-08 07:15" },
  { id: 6, email: "lisa@example.com", role: "Operator", status: "Active", lastLogin: "2024-05-08 11:20" },
  { id: 7, email: "alex@example.com", role: "IT Admin", status: "Inactive", lastLogin: "2024-05-01 14:00" },
  { id: 8, email: "nina@example.com", role: "Operator", status: "Active", lastLogin: "2024-05-08 09:50" },
  { id: 9, email: "tom@example.com", role: "Operator", status: "Offline", lastLogin: "2024-05-07 18:30" },
  { id: 10, email: "anna@example.com", role: "Supervisor", status: "Active", lastLogin: "2024-05-08 10:45" },
];

export default function Users() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-sm text-slate-500">Manage and monitor application access</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2 h-10 px-4 rounded-xl shadow-lg shadow-primary/20" id="create-user-btn">
          <Plus className="w-4 h-4" />
          Add new member
        </Button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="relative lg:col-span-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search users..." className="pl-10 h-10 border-slate-100 bg-slate-50/50 focus:bg-white rounded-xl transition-all" id="user-search" />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 lg:col-span-8 lg:justify-end">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[160px] h-10 border-slate-100 bg-slate-50/50 rounded-xl">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">IT Admin</SelectItem>
              <SelectItem value="manager">Warehouse Manager</SelectItem>
              <SelectItem value="operator">Operator</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="name">
            <SelectTrigger className="w-full sm:w-[160px] h-10 border-slate-100 bg-slate-50/50 rounded-xl">
              <SelectValue placeholder="Sort: Name" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
              <SelectItem value="name">Sort: Name</SelectItem>
              <SelectItem value="login">Sort: Last Login</SelectItem>
              <SelectItem value="role">Sort: Role</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" className="h-10 text-slate-500 border border-slate-100 bg-slate-50/50 hover:bg-white rounded-xl gap-2 px-4 transition-all" id="more-filters-btn">
            <Filter className="w-4 h-4" />
            Advanced
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px] lg:min-w-full">
            <TableHeader className="bg-slate-50/50 border-b border-slate-100">
              <TableRow className="hover:bg-transparent border-0">
                <TableHead className="font-bold py-4 pl-6 text-xs uppercase tracking-wider text-slate-500">Member</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Position</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Last Active</TableHead>
                <TableHead className="text-right font-bold pr-6 text-xs uppercase tracking-wider text-slate-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-slate-50/30 transition-colors border-b border-slate-100 last:border-0 group">
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 group-hover:bg-white border border-transparent group-hover:border-slate-200 transition-all">
                        {user.email.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-900">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 font-medium">{user.role}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-0",
                        user.status === "Active" ? "bg-emerald-50 text-emerald-700" : 
                        user.status === "Offline" ? "bg-slate-100 text-slate-600" :
                        "bg-rose-50 text-rose-700"
                      )}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm font-mono">{user.lastLogin}</TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 rounded-lg" id={`edit-user-${user.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 text-slate-400 rounded-lg")}>
                          <MoreHorizontal className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                          <DropdownMenuItem className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 gap-2 font-medium">
                            <Trash2 className="w-4 h-4" />
                            Remove access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Page 1 of 5</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="border-slate-200 rounded-lg h-8 text-xs font-bold uppercase tracking-tighter">Prev</Button>
            <div className="flex gap-1">
              {[1, 2, 3].map(p => (
                <Button 
                  key={p} 
                  variant={p === 1 ? 'default' : 'outline'} 
                  size="sm" 
                  className={cn(
                    "h-8 w-8 rounded-lg text-xs font-bold",
                    p === 1 ? "bg-primary border-primary shadow-lg shadow-primary/20" : "border-slate-200"
                  )}
                >
                  {p}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="border-slate-200 rounded-lg h-8 text-xs font-bold uppercase tracking-tighter">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
