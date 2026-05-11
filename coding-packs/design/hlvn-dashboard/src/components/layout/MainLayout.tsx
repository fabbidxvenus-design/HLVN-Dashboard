import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MainLayout({ children, activeTab, setActiveTab }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const titles: Record<string, string> = {
    dashboard: "Dashboard",
    users: "Users",
    history: "Scan History",
    analytics: "Analytics",
    settings: "Settings",
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-indigo-50/50 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          title={titles[activeTab] || "HLVN Dashboard"} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
