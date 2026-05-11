/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import History from "./pages/History";
import Analytics from "./pages/Analytics";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <Users />;
      case "history":
        return <History />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </MainLayout>
  );
}
