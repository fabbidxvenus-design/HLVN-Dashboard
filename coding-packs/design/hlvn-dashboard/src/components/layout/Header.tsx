import { Search, User, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-white/70 backdrop-blur-md border-b border-[#e4e4e7] flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 md:gap-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-slate-500 hover:bg-slate-100" 
          onClick={onMenuClick}
          id="mobile-menu-toggle"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <h1 className="text-lg md:text-xl font-bold text-slate-900 truncate select-none tracking-tight">{title}</h1>
        <div className="relative w-[320px] hidden xl:block group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search dashboard..." 
            className="pl-10 h-10 bg-slate-50/50 border-[#e4e4e7] focus:bg-white focus:ring-slate-200 transition-all rounded-xl"
            id="global-search"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-xl" id="notifications-trigger">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 sm:border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">Duy Nguyen</p>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">Administrator</p>
          </div>
          <Avatar className="h-8 w-8 md:h-9 md:w-9 border border-slate-200 ring-2 ring-transparent hover:ring-slate-100 transition-all cursor-pointer" id="user-profile-avatar">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
