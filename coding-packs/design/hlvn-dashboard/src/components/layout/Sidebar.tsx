import { LayoutDashboard, Users, History, BarChart3, Settings, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "history", label: "History", icon: History },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab, isOpen, onClose }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-30 w-[240px] bg-white border-r border-[#e4e4e7] flex flex-col h-screen transition-all duration-500 ease-[0.23,1,0.32,1] transform lg:translate-x-0 lg:static lg:inset-auto shrink-0",
      isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full shadow-none"
    )}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">HLVN</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-slate-400 hover:bg-slate-100 rounded-xl" 
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group relative",
              activeTab === item.id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
            )}
            id={`nav-${item.id}`}
          >
            <item.icon className={cn(
              "w-4 h-4 transition-colors",
              activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-slate-900"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-medium"
          id="logout-button"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
